import React, { Component, ReactText } from 'react';
import { compact, includes, map, uniq } from 'lodash';

import { FormCheckboxGroup } from 'z-frontend-forms';
import { Flex, TextInline } from 'zbase';
import { LinkButton } from 'z-frontend-elements';

import { commonFilterStyleProps, DataFilterCommonProps } from './dataFilterUtils';
import { updateFilters, updateMatchAnyFilters } from '../filterUtils';
import { DataManagerContext, DataManagerRenderProps } from '../DataManager';

type Options = string[] | number[];

type DataFilterCheckboxGroupLabelProps = {
  label: string;
  selectedOptions: Options;
  onSelectAll: () => void;
  onClear: () => void;
};

class DataFilterCheckboxGroupLabel extends Component<DataFilterCheckboxGroupLabelProps> {
  render() {
    const { selectedOptions = [] } = this.props;
    return (
      <Flex justify="space-between" align="center" minHeight={40} pr={2}>
        <TextInline fontStyle="controls.m">{this.props.label}</TextInline>
        {!selectedOptions.length && (
          <LinkButton fontStyle="paragraphs.s" onClick={this.props.onSelectAll}>
            All
          </LinkButton>
        )}
        {!!selectedOptions.length && (
          <LinkButton fontStyle="paragraphs.s" onClick={this.props.onClear}>
            Clear
          </LinkButton>
        )}
      </Flex>
    );
  }
}

declare type Comparator<T> = (data1: T, data2: T) => number;
type DataFilterCheckboxGroupProps<T> = DataFilterCommonProps<T> & {
  data: T[];
  comparator?: Comparator<T>;
};

export default class DataFilterCheckboxGroup<T> extends Component<DataFilterCheckboxGroupProps<T>> {
  getOptions<T>(comparator?: Comparator<T>): Options {
    const options = uniq(compact(map(this.props.data, this.props.dataKey as string)));
    if (comparator) {
      return options.sort(comparator);
    }
    return options.sort();
  }

  render() {
    const { label, dataKey } = this.props;
    return (
      <DataManagerContext.Consumer>
        {(dataManagerProps: DataManagerRenderProps<T>) => {
          const { config, onChange } = dataManagerProps.filtering;
          const selectedOptions: Options = (config[dataKey] || {}).matchAny;
          const options = this.getOptions(this.props.comparator);
          return (
            <>
              <DataFilterCheckboxGroupLabel
                label={label}
                selectedOptions={selectedOptions}
                onSelectAll={() => onChange(updateMatchAnyFilters(config, dataKey, options))}
                onClear={() => onChange(updateMatchAnyFilters(config, dataKey, []))}
              />
              <FormCheckboxGroup name={dataKey} label="" {...commonFilterStyleProps}>
                {({ Checkbox }) =>
                  // Using `as ReactText[]` because of an issue in call signatures:
                  // https://github.com/microsoft/TypeScript/issues/7294
                  (options as ReactText[]).map((option: ReactText) => (
                    <Checkbox
                      key={`${option}`}
                      label={`${option}`}
                      name={`${option}`}
                      checked={includes(selectedOptions, option)}
                      onChange={(e: any) =>
                        onChange(updateFilters(config, 'matchAny', dataKey, option, e.target.checked))
                      }
                    />
                  ))
                }
              </FormCheckboxGroup>
            </>
          );
        }}
      </DataManagerContext.Consumer>
    );
  }
}

export { DataFilterCheckboxGroupLabel };
