import React, { Component, ReactText } from 'react';
import { compact, map, uniq } from 'lodash';

import { FormMultiSelect } from 'z-frontend-forms';

import { updateMatchAnyFilters } from '../filterUtils';
import { commonFilterStyleProps, DataFilterCommonProps } from './dataFilterUtils';
import { DataManagerContext, DataManagerRenderProps } from '../DataManager';

export default class DataFilterMultiSelect<T> extends Component<DataFilterCommonProps<T>> {
  getOptions(data: T[]): string[] {
    return uniq(compact(map(data, this.props.dataKey as string)));
  }

  render() {
    const { label, dataKey } = this.props;
    return (
      <DataManagerContext.Consumer>
        {(dataManagerProps: DataManagerRenderProps<T>) => {
          const { config, onChange } = dataManagerProps.filtering;
          const optionsList = this.getOptions(dataManagerProps.sourceData);
          const filterConfigPerKey = config[dataKey] || {};
          const matchAnyValue = filterConfigPerKey.matchAny || [];
          // Using `as ReactText[]` because of an issue in call signatures:
          // https://github.com/microsoft/TypeScript/issues/7294
          const values = (matchAnyValue as ReactText[]).map((value: ReactText) => `${value}`);
          return (
            <FormMultiSelect<string>
              label={label}
              name={dataKey}
              value={values}
              getOptionText={o => o}
              onChange={(values: string[]) => {
                onChange(updateMatchAnyFilters(config, dataKey, values));
              }}
              {...commonFilterStyleProps}
            >
              {({ SelectOption, multiOptionFilter }) =>
                multiOptionFilter(optionsList).map(option => <SelectOption key={option} option={option} />)
              }
            </FormMultiSelect>
          );
        }}
      </DataManagerContext.Consumer>
    );
  }
}
