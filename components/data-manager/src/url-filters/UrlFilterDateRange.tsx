import React from 'react';
// @ts-ignore
import { formatDate } from 'react-day-picker/moment';

import {
  getAriaInputProps,
  DateInput,
  DateInputProps,
  FormFieldFormat,
  FormFieldProps,
  FormFieldWrapper,
} from 'z-frontend-forms';

import { commonFilterStyleProps } from '../filter/dataFilterUtils';
import { UrlQueryParamsContext } from '../UrlQueryParamsManager';
import { getDateRangeValues, transformFiltersToUrlFormat, Filters } from './urlFilterUtils';

export type UrlFilterDateRangeOwnProps = {
  filterName: string;
  label: string;
  formFieldFormat?: FormFieldFormat;
};

type UrlFilterDateRangeProps = UrlFilterDateRangeOwnProps &
  DateInputProps &
  Pick<FormFieldProps, 'label' | 'helpText' | 'format' | 'containerProps'>;

/**
 * A component that renders two date inputs, whose initially values are from URL, and updates URL query params
 * when input values change.
 * Example of URL query params when using this filter: "filter_hired_after=03/01/2020&filter_hired_before=03/31/2020"
 * where "hired" is the filterName.
 */
const UrlFilterDateRange: React.FunctionComponent<UrlFilterDateRangeProps> = ({
  filterName,
  label,
  format,
  locale,
  helpText,
  formFieldFormat = commonFilterStyleProps.format,
  containerProps = commonFilterStyleProps.containerProps,
  'aria-label': ariaLabel,
  ...rest
}) => {
  const { queryParams, updateQueryParams } = React.useContext(UrlQueryParamsContext);
  const { afterDate, beforeDate } = getDateRangeValues(queryParams, filterName);
  return (
    <>
      <FormFieldWrapper
        name={`${filterName}_after`}
        label={`${label} After`}
        format={formFieldFormat}
        helpText={helpText}
        containerProps={containerProps}
      >
        <DateInput
          id={`${filterName}_after`}
          value={afterDate}
          onChange={newDate => {
            const newFilters = {
              [`${filterName}_after`]: newDate ? formatDate(newDate, format, locale) : null,
            } as Filters;
            updateQueryParams(transformFiltersToUrlFormat(newFilters));
          }}
          {...getAriaInputProps(`${filterName}_after`, null, ariaLabel)}
          {...rest}
        />
      </FormFieldWrapper>
      <FormFieldWrapper
        name={`${filterName}_before`}
        label={`${label} Before`}
        format={formFieldFormat}
        helpText={helpText}
        containerProps={containerProps}
      >
        <DateInput
          id={`${filterName}_before`}
          value={beforeDate}
          onChange={newDate => {
            const newFilters = {
              [`${filterName}_before`]: newDate ? formatDate(newDate, format, locale) : null,
            } as Filters;
            updateQueryParams(transformFiltersToUrlFormat(newFilters));
          }}
          {...getAriaInputProps(`${filterName}_before`, null, ariaLabel)}
          {...rest}
        />
      </FormFieldWrapper>
    </>
  );
};

export default UrlFilterDateRange;
