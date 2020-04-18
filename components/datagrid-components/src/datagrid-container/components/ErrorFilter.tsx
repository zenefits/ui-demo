import React from 'react';
import { includes } from 'lodash';

import { FormCheckboxGroup } from 'z-frontend-forms';
import {
  commonFilterStyleProps,
  updateFilters,
  updateMatchAnyFilters,
  CustomFilter,
  DataFilterCheckboxGroupLabel,
  DataManagerContext,
  DataManagerRenderProps,
  FilterContext,
} from 'z-frontend-data-manager';

import { ColumnRequiredErrorsMap, RequiredErrorsMap } from './EditDataManager';

type ErrorFilterProps = {
  requiredErrorsMap: RequiredErrorsMap;
};

type CellError = {
  key: string;
};

type RowErrors = {
  [systemColumnId: string]: CellError[];
};

const errorFilterOptions = [
  {
    key: 'required',
    label: 'Missing Required Information',
  },
  {
    key: 'other',
    label: 'With Errors',
  },
];

class ErrorFilter extends React.Component<ErrorFilterProps> {
  onCheckboxChange = (
    managerPropsFilterContext: FilterContext<any>,
    option,
    requiredErrorsMap: RequiredErrorsMap,
  ) => e => {
    const { checked } = e.target;
    const optionKey = option.key;

    const customFilter: CustomFilter = {
      key: optionKey,
      function: getErrorFilterFunction(requiredErrorsMap, optionKey === 'required'),
    };

    managerPropsFilterContext.onChange(
      updateFilters(
        managerPropsFilterContext.config,
        'customMatchAny',
        /**
         * "errors": {
            "lastName": [
              {
                "key": "lastName_required"
              }
            ]
          }
         */
        'errors',
        customFilter,
        checked,
      ),
    );
  };

  onSelectAll = (managerPropsFilterContext: FilterContext<any>, requiredErrorsMap: RequiredErrorsMap) => () => {
    const customFilters: CustomFilter[] = errorFilterOptions.map(option => ({
      key: option.key,
      function: getErrorFilterFunction(requiredErrorsMap, option.key === 'required'),
    }));

    managerPropsFilterContext.onChange(
      updateMatchAnyFilters(managerPropsFilterContext.config, 'errors', customFilters, 'customMatchAny'),
    );
  };

  onClear = (managerPropsFilterContext: FilterContext<any>) => () => {
    managerPropsFilterContext.onChange(
      updateMatchAnyFilters(managerPropsFilterContext.config, 'errors', [], 'customMatchAny'),
    );
  };

  render() {
    const { requiredErrorsMap } = this.props;

    return (
      <DataManagerContext.Consumer>
        {(dataManagerProps: DataManagerRenderProps<any>) => {
          const managerPropsFilterContext: FilterContext<any> = dataManagerProps.filtering;

          const selectedErrorFilterOptionKeys = (
            managerPropsFilterContext.config.errors || { customMatchAny: [] }
          ).customMatchAny.map(customMatchAnyItem => customMatchAnyItem.key);

          return (
            <FormCheckboxGroup
              name="error"
              label={
                <DataFilterCheckboxGroupLabel
                  label="Status"
                  selectedOptions={selectedErrorFilterOptionKeys}
                  onSelectAll={this.onSelectAll(managerPropsFilterContext, requiredErrorsMap)}
                  onClear={this.onClear(managerPropsFilterContext)}
                />
              }
              {...commonFilterStyleProps}
            >
              {({ Checkbox }) =>
                errorFilterOptions.map(option => (
                  <Checkbox
                    key={option.key}
                    label={option.label}
                    name={option.key}
                    checked={includes(selectedErrorFilterOptionKeys, option.key)}
                    onChange={this.onCheckboxChange(managerPropsFilterContext, option, requiredErrorsMap)}
                  />
                ))
              }
            </FormCheckboxGroup>
          );
        }}
      </DataManagerContext.Consumer>
    );
  }
}

export default ErrorFilter;

function getErrorFilterFunction(
  requiredErrorsMap: RequiredErrorsMap,
  isForRequiredError: boolean,
): (errors: RowErrors) => boolean {
  return errors => {
    const columnsWithErrors: string[] = Object.keys(errors);

    for (let i = 0; i < columnsWithErrors.length; i += 1) {
      const columnId = columnsWithErrors[i];
      const cellErrors: CellError[] = errors[columnId];
      const columnRequiredErrorsMap: ColumnRequiredErrorsMap = requiredErrorsMap[columnId];

      for (let j = 0; j < cellErrors.length; j += 1) {
        const errorKey = cellErrors[j].key;
        const isRequiredError = columnRequiredErrorsMap[errorKey];

        if (isForRequiredError && isRequiredError) return true;

        if (!isForRequiredError && !isRequiredError) return true;
      }
    }

    return false;
  };
}
