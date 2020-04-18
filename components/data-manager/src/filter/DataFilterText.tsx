import React, { Component } from 'react';

import { FormTextInput } from 'z-frontend-forms';

import { updateFilters } from '../filterUtils';
import { commonFilterStyleProps, DataFilterCommonProps } from './dataFilterUtils';
import { DataManagerContext, DataManagerRenderProps } from '../DataManager';

export default class DataFilterText<T> extends Component<DataFilterCommonProps<T>> {
  render() {
    const { label, dataKey } = this.props;
    return (
      <DataManagerContext.Consumer>
        {(dataManagerProps: DataManagerRenderProps<T>) => {
          const { config, onChange } = dataManagerProps.filtering;
          const value = (config[dataKey] || {}).stringContains || '';
          return (
            <FormTextInput
              label={label}
              name={dataKey}
              value={value}
              onChange={e => onChange(updateFilters(config, 'stringContains', dataKey, e.target.value, true))}
              {...commonFilterStyleProps}
            />
          );
        }}
      </DataManagerContext.Consumer>
    );
  }
}
