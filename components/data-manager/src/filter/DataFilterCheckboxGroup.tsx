import React, { Component } from 'react';
import { includes, map, uniq } from 'lodash';

import { Form } from 'z-frontend-forms';

import { commonFilterStyleProps, DataFilterCommonProps } from './dataFilterUtils';
import { updateFilters } from '../filterUtils';

type DataFilterCheckboxGroupProps<T> = DataFilterCommonProps<T> & {
  data: T[];
};

export default class DataFilterCheckboxGroup<T> extends Component<DataFilterCheckboxGroupProps<T>> {
  render() {
    const { label, dataKey, data, dataManagerProps } = this.props;
    const { config, onChange } = dataManagerProps.filtering;
    const options: string[] = uniq(map(data, dataKey as string));
    const selectedData = (config[dataKey] || {}).matchAny;
    return (
      <Form.CheckboxGroup name={dataKey} label={label} {...commonFilterStyleProps}>
        {({ Checkbox }) =>
          options.map(option => (
            <Checkbox
              key={option}
              label={option}
              name={option}
              checked={includes(selectedData, option)}
              onChange={(e: any) => onChange(updateFilters(config, 'matchAny', dataKey, option, e.target.checked))}
            />
          ))
        }
      </Form.CheckboxGroup>
    );
  }
}
