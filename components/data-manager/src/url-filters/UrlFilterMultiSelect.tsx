import React from 'react';

import { FormFieldProps, FormFieldWrapper, MultiSelect, MultiSelectProps } from 'z-frontend-forms';

import { UrlQueryParamsContext } from '../UrlQueryParamsManager';
import { getSelectedFilterOptions, transformFiltersToUrlFormat, Filters, FilterOption } from './urlFilterUtils';

import { commonFilterStyleProps } from '../filter/dataFilterUtils';

type InternalMultiSelectProps = Pick<FormFieldProps, 'label' | 'helpText' | 'format' | 'containerProps'> &
  Omit<MultiSelectProps<FilterOption>, 'name' | 'getOptionText' | 'onChange' | 'children'>;

export type UrlFilterMultiSelectProps = InternalMultiSelectProps & {
  /**
   * The filter name used in URL.
   * e.g. If we have "filter_department[]=1&filter_department[]=2" in URL, "department" is the filter name.
   * "filter_" is the filter prefix.
   */
  filterName: string;
  /**
   * onChange handler to be called after query params are updated.
   */
  onChange?: (filterName: string, option: FilterOption[], newFilters: Filters) => void;
  /**
   * Note that the "id" value in each option is the value that will be put into the URL query params.
   */
  options: FilterOption[];
};

/**
 * A component that renders a multi select input, whose initial values are from URL, and updates URL query params
 * when input value changes.
 * Example of URL query params when using this filter: "filter_department[]=1&filter_department[]=2".
 */
const UrlFilterMultiSelect: React.FunctionComponent<UrlFilterMultiSelectProps> = ({
  filterName,
  onChange,
  helpText,
  containerProps = commonFilterStyleProps.containerProps,
  format = commonFilterStyleProps.format,
  options,
  label,
  ...rest
}) => {
  const { queryParams, updateQueryParams } = React.useContext(UrlQueryParamsContext);
  const selectedValue = getSelectedFilterOptions(queryParams, options, filterName);
  return (
    <FormFieldWrapper
      name={filterName}
      label={label}
      helpText={helpText}
      containerProps={containerProps}
      format={format}
    >
      <MultiSelect<FilterOption>
        name={filterName}
        value={selectedValue}
        getOptionText={o => o.label}
        onChange={options => {
          const newFilters = {
            [filterName]: options.length > 0 ? options.map(option => option.id) : [],
          } as Filters;
          updateQueryParams(transformFiltersToUrlFormat(newFilters));
          onChange && onChange(filterName, options, newFilters);
        }}
        label={label}
        {...rest}
      >
        {({ SelectOption, multiOptionFilter }) =>
          multiOptionFilter(options).map(option => <SelectOption key={option.id} option={option} />)
        }
      </MultiSelect>
    </FormFieldWrapper>
  );
};

export default UrlFilterMultiSelect;
