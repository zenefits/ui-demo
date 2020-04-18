import { ReactText } from 'react';
import { mapKeys } from 'lodash';

import { QueryParams } from '../UrlQueryParamsManager';

type FilterValue = ReactText | string[] | number[];

export type Filters = {
  [key: string]: FilterValue;
};

type DateRange = {
  beforeDate: string;
  afterDate: string;
};

export type FilterOption = {
  id: number | string;
  label: string;
};

export const FILTER_PREFIX = 'filter_';

// filter keys in url will be formatted as "filter_someVariable"
// e.g. { departments: [1,2,3] } => { filter_departments: [1,2,3] }
export const transformFiltersToUrlFormat = (filters: Filters) =>
  filters ? mapKeys(filters, (value, key: string) => `${FILTER_PREFIX}${key}`) : {};

// construct object of filters with prefix removed
// from { filter_someVariable: ["foo"], currentPage: "1" } => { someVariable: ["foo"] }
export const getFiltersFromQueryParams = (queryParams: QueryParams) =>
  Object.keys(queryParams).reduce((filters, queryParamKey) => {
    if (queryParamKey.startsWith(FILTER_PREFIX)) {
      filters[queryParamKey.slice(FILTER_PREFIX.length)] = queryParams[queryParamKey] as FilterValue;
    }
    return filters;
  }, {} as Filters);

export const findSelectedOption = (selectedOptionId: string | number, options: FilterOption[]): FilterOption => {
  if (isNaN(Number(selectedOptionId))) {
    return options.find(attribute => attribute.id === selectedOptionId);
  } else {
    return options.find(attribute => Number(attribute.id) === Number(selectedOptionId));
  }
};

// Selected Value for UrlFilterSelect
export const getSelectedFilterOption = (
  queryParams: QueryParams,
  options: FilterOption[],
  filterName: string,
): FilterOption => {
  const filters = getFiltersFromQueryParams(queryParams);
  const selectedFilter = filters[filterName];
  if (selectedFilter) {
    const selectedOptionId = Array.isArray(selectedFilter) ? selectedFilter[0] : selectedFilter;
    return findSelectedOption(selectedOptionId, options);
  }

  return null;
};

// Entered value in the UrlFilterText
export const getEnteredText = (queryParams: QueryParams, filterName: string): string => {
  const filters = getFiltersFromQueryParams(queryParams);
  const selectedFilter = filters[filterName];
  return (selectedFilter as string) || '';
};

export const getDateRangeValues = (queryParams: QueryParams, filterName: string): DateRange => {
  const dateRange: any = {};
  const filters = getFiltersFromQueryParams(queryParams);
  dateRange.afterDate = filters[`${filterName}_after`] || '';
  dateRange.beforeDate = filters[`${filterName}_before`] || '';
  return dateRange;
};

// selected Value for UrlFilterMultiSelect
export const getSelectedFilterOptions = (
  queryParams: QueryParams,
  options: FilterOption[],
  filterName: string,
): FilterOption[] => {
  const filters = getFiltersFromQueryParams(queryParams);
  const selectedFilter = filters[filterName];
  if (selectedFilter && Array.isArray(selectedFilter)) {
    const selectedFilters: FilterOption[] = [];
    selectedFilter.forEach((selectedOptionId: string | number) => {
      selectedFilters.push(findSelectedOption(selectedOptionId, options));
    });
    return selectedFilters;
  }

  return null;
};

// clear filters on reset
export const clearFilters = (queryParams: QueryParams) => {
  const clearFilters = Object.keys(queryParams).reduce((newParams, queryParamKey) => {
    if (queryParamKey.startsWith(FILTER_PREFIX)) {
      newParams[queryParamKey] = [];
    }
    return newParams;
  }, {} as QueryParams);

  return clearFilters;
};

/**
 * Given a query params object and a fieldKey, return a value for query param "order_by" to be updated to.
 *
 * Example usage is for a button or a table header to toggle sorting for a certain field.
 */
export function getNewOrderBy({ order_by }: QueryParams, fieldKey: string): string[] {
  let newOrderBy: string[];

  if (order_by && (order_by as string[]).includes(fieldKey)) {
    newOrderBy = [`-${fieldKey}`];
  } else {
    newOrderBy = [fieldKey];
  }

  return newOrderBy;
}

export type FieldSortedStatus = { sorted: boolean; direction?: 'asc' | 'desc' };

/**
 * Given a query params object and a fieldKey, return an object describing whether the field is sorted and if so,
 * whether it is sorted ascending or descending.
 */
export function getFieldSortedStatus(queryParams: QueryParams, fieldKey: string): FieldSortedStatus {
  const order_by = queryParams.order_by as string[];
  let fieldSortedStatus: FieldSortedStatus = { sorted: false };

  if (order_by) {
    for (let i = 0; i < order_by.length; i += 1) {
      const orderBy = order_by[i];
      if (orderBy === fieldKey || orderBy.slice(1) === fieldKey) {
        fieldSortedStatus = { sorted: true, direction: orderBy.startsWith('-') ? 'desc' : 'asc' };
        break;
      }
    }
  }

  return fieldSortedStatus;
}
