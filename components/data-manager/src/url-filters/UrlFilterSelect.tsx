import React from 'react';

import { FormFieldProps, FormFieldWrapper, Select, SelectProps } from 'z-frontend-forms';
import { TextBlock } from 'zbase';

import { commonFilterStyleProps } from '../filter/dataFilterUtils';
import { UrlQueryParamsContext } from '../UrlQueryParamsManager';
import { getSelectedFilterOption, transformFiltersToUrlFormat, Filters, FilterOption } from './urlFilterUtils';

type InternalSelectProps = Pick<FormFieldProps, 'label' | 'helpText' | 'format' | 'containerProps'> &
  Omit<SelectProps<FilterOption>, 'name' | 'getOptionText' | 'onChange' | 'children'>;

export type UrlFilterSelectProps = InternalSelectProps & {
  filterName: string;
  /**
   * In the array of options if there is one option that means no filter should be applied,
   * provide the id of that option by this prop.
   */
  emptyFilterId?: string;
  onChange?: (filterName: string, option: FilterOption, newFilters: Filters) => void;
  /**
   * Note that the "id" value in each option is the value that will be put into the URL query params.
   */
  options: FilterOption[];
};

/**
 * A component that renders a select input, whose initial values are from URL, and updates URL query params
 * when input value changes.
 * Example of URL query params when using this filter: "filter_department[]=1".
 */
const UrlFilterSelect: React.FunctionComponent<UrlFilterSelectProps> = ({
  filterName,
  label,
  helpText,
  containerProps = commonFilterStyleProps.containerProps,
  format = commonFilterStyleProps.format,
  onChange,
  emptyFilterId,
  options,
  ...selectProps
}) => {
  const { queryParams, updateQueryParams } = React.useContext(UrlQueryParamsContext);
  const selectedValue = getSelectedFilterOption(queryParams, options, filterName);
  return (
    <FormFieldWrapper
      name={filterName}
      label={label}
      helpText={helpText}
      containerProps={containerProps}
      format={format}
    >
      <Select<FilterOption>
        name={filterName}
        getOptionText={option => (option && option.id !== emptyFilterId ? option.label : '')}
        value={selectedValue}
        {...selectProps}
        onChange={option => {
          const newFilters = {
            [filterName]: option && option.id !== emptyFilterId ? [option.id] : [],
          } as Filters;
          updateQueryParams(transformFiltersToUrlFormat(newFilters));
          onChange && onChange(filterName, option, newFilters);
        }}
      >
        {({ SelectOption, basicOptionFilter }) =>
          basicOptionFilter(options).map(option => (
            <SelectOption key={option.id} option={option}>
              <TextBlock ellipsis>{option.label}</TextBlock>
            </SelectOption>
          ))
        }
      </Select>
    </FormFieldWrapper>
  );
};

export default UrlFilterSelect;
