import React, { Component } from 'react';

import { Form } from 'z-frontend-forms';

import { commonFilterStyleProps, DataFilterCommonProps } from './dataFilterUtils';
import { updateRangeFilters } from '../filterUtils';

export default class DataFilterDateRange<T> extends Component<DataFilterCommonProps<T>> {
  render() {
    const { label, dataKey, dataManagerProps } = this.props;
    const { config, onChange } = dataManagerProps.filtering;
    // TODO: do we need form validation here?
    const beforeDate = (config[dataKey] || {}).lessThan;
    const afterDate = (config[dataKey] || {}).greaterThan;
    return (
      <>
        <Form.DateInput
          label={`${label} After`}
          name={dataKey + '-after'}
          onChange={newDate => onChange(updateRangeFilters(config, dataKey, beforeDate, newDate))}
          {...commonFilterStyleProps}
        />
        <Form.DateInput
          label={`${label} Before`}
          name={dataKey + '-before'}
          onChange={newDate => onChange(updateRangeFilters(config, dataKey, newDate, afterDate))}
          {...commonFilterStyleProps}
        />
      </>
    );
  }
}
