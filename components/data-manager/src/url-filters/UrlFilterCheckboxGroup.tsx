import React from 'react';
import { includes } from 'lodash';

import { Checkbox, CheckboxProps, FormFieldProps, FormFieldWrapper } from 'z-frontend-forms';
import { Box } from 'zbase';

import { commonFilterStyleProps } from '../filter/dataFilterUtils';
import { DataFilterCheckboxGroupLabel as UrlFilterCheckboxGroupLabel } from '../filter/DataFilterCheckboxGroup';
import { getSelectedFilterOptions, transformFiltersToUrlFormat, Filters, FilterOption } from './urlFilterUtils';
import { UrlQueryParamsContext } from '../UrlQueryParamsManager';

type InternalCheckBoxProps = Pick<FormFieldProps, 'label' | 'helpText' | 'format' | 'containerProps'> &
  Omit<CheckboxProps, 'name' | 'onChange' | 'children'>;

export type UrlFilterCheckboxGroupProps = InternalCheckBoxProps & {
  filterName: string;
  options?: FilterOption[];
  label: string;
};

const getLabelId = (name: string) => {
  return `zf-${name}-label`;
};

/**
 * Similar to UrlFilterMultiSelect, but in a checkbox group format.
 */
const UrlFilterCheckboxGroup: React.FC<UrlFilterCheckboxGroupProps> = ({
  filterName,
  options,
  label,
  helpText,
  containerProps = commonFilterStyleProps.containerProps,
  format = commonFilterStyleProps.format,
}) => {
  const { queryParams, updateQueryParams } = React.useContext(UrlQueryParamsContext);
  const optionsFromQueryParams = getSelectedFilterOptions(queryParams, options, filterName) || [];
  const selectedOptions = optionsFromQueryParams.map(option => option.label);

  return (
    <>
      <UrlFilterCheckboxGroupLabel
        label={label}
        selectedOptions={selectedOptions}
        onSelectAll={() => {
          const newFilters = {
            [filterName]: options.length > 0 ? options.map(option => option.id) : [],
          } as Filters;
          updateQueryParams(transformFiltersToUrlFormat(newFilters));
        }}
        onClear={() => {
          const newFilters = {
            [filterName]: [],
          } as Filters;
          updateQueryParams(transformFiltersToUrlFormat(newFilters));
        }}
      />

      <FormFieldWrapper
        name={name}
        helpText={helpText}
        format={format}
        containerProps={containerProps}
        fieldType="checkboxGroup"
      >
        <Box role="group" aria-labelledby={getLabelId(name)}>
          {options.map(option => (
            <Checkbox
              key={option.id}
              label={option.label}
              name={option.label}
              aria-labelledby={`${getLabelId(name)} ${getLabelId(option.label)}`}
              checked={includes(selectedOptions, option.label)}
              onChange={(e: any) => {
                const existingOptions = optionsFromQueryParams.map(option => option.id);
                const newOptions = e.target.checked
                  ? [...existingOptions, option.id]
                  : existingOptions.filter(currOption => currOption !== option.id);
                const newFilters = {
                  [filterName]: newOptions,
                } as Filters;
                updateQueryParams(transformFiltersToUrlFormat(newFilters));
              }}
            />
          ))}
        </Box>
      </FormFieldWrapper>
    </>
  );
};

export default UrlFilterCheckboxGroup;
