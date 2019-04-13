import React, { Component } from 'react';

import { Form } from 'z-frontend-forms';

import { updateFilters } from '../filterUtils';
import { commonFilterStyleProps, DataFilterCommonProps } from './dataFilterUtils';

export default class DataFilterText<T> extends Component<DataFilterCommonProps<T>> {
  render() {
    const { label, dataKey, dataManagerProps } = this.props;
    const { config, onChange } = dataManagerProps.filtering;
    return (
      <Form.TextInput
        label={label}
        name={dataKey}
        onChange={e => onChange(updateFilters(config, 'stringContains', dataKey, e.target.value, true))}
        {...commonFilterStyleProps}
      />
    );
  }
}
