import React, { Component } from 'react';

import { FormDateInput } from 'z-frontend-forms';

import { commonFilterStyleProps, DataFilterCommonProps } from './dataFilterUtils';
import { updateRangeFilters } from '../filterUtils';
import { DataManagerContext, DataManagerRenderProps } from '../DataManager';

export default class DataFilterDateRange<T> extends Component<DataFilterCommonProps<T>> {
  render() {
    const { label, dataKey } = this.props;
    return (
      <DataManagerContext.Consumer>
        {(dataManagerProps: DataManagerRenderProps<T>) => {
          const { config, onChange } = dataManagerProps.filtering;
          // TODO: do we need form validation here?
          const beforeDate = (config[dataKey] || {}).lessThan;
          const afterDate = (config[dataKey] || {}).greaterThan;
          return (
            <>
              <FormDateInput
                label={`${label} After`}
                value={afterDate}
                name={`${dataKey}-after`}
                onChange={newDate => onChange(updateRangeFilters(config, dataKey, beforeDate, newDate))}
                {...commonFilterStyleProps}
              />
              <FormDateInput
                label={`${label} Before`}
                value={beforeDate}
                name={`${dataKey}-before`}
                onChange={newDate => onChange(updateRangeFilters(config, dataKey, newDate, afterDate))}
                {...commonFilterStyleProps}
              />
            </>
          );
        }}
      </DataManagerContext.Consumer>
    );
  }
}
