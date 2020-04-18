import { ReactText } from 'react';
import { cloneDeep, concat, every, filter, includes, without } from 'lodash';

export type CustomFilter = {
  /**
   * key is needed for removing a custom filter from an array
   */
  key: string;
  /**
   * A filter function to check if a value pass or not
   */
  function: (value: any) => boolean;
};

type MatchAnyValue = string[] | number[];

interface FilterConfigPerKey {
  matchAny?: MatchAnyValue;
  customMatchAny?: CustomFilter[];
  stringContains?: string;
  lessThan?: any;
  greaterThan?: any;
}

export interface FilterConfig {
  [propName: string]: FilterConfigPerKey;
}

export interface AsyncFilterConfig {
  [propName: string]: string[];
}

export const doFilter = <T>(items: T[], filterConfig: FilterConfig): T[] => {
  const filterKeys = Object.keys(filterConfig);
  if (filterKeys.length === 0) {
    return items;
  }

  return filter(items, item => every(filterKeys, key => _passesFilter(filterConfig[key], (item as any)[key])));
};

const _passesFilter = (filter: FilterConfigPerKey, value: any): boolean => {
  const matchAny = filter['matchAny'] || [];
  if (matchAny.length && !includes(matchAny, value)) {
    return false;
  }

  const customMatchAny = filter['customMatchAny'] || [];
  if (customMatchAny.length && !doesCustomMatchAny(customMatchAny, value)) {
    return false;
  }

  const substring = filter['stringContains'];
  if (substring) {
    if (!value) {
      return false; // never match a falsey value
    }
    if (!value.toLocaleLowerCase().includes(substring.toLocaleLowerCase())) {
      return false;
    }
  }

  const ltValue = filter['lessThan'];
  if (ltValue && value >= ltValue) {
    return false;
  }

  const gtValue = filter['greaterThan'];
  if (gtValue && value <= gtValue) {
    return false;
  }

  return true;
};

export const updateFilters = (
  filterConfig: FilterConfig,
  type: 'matchAny' | 'customMatchAny' | 'stringContains',
  key: string,
  value: ReactText | CustomFilter,
  addFilter: boolean,
): FilterConfig => {
  const filters = cloneDeep(filterConfig);
  if (!(key in filters)) {
    filters[key] = {};
  }

  if (type === 'matchAny') {
    const matchAny = filters[key]['matchAny'] || [];
    if (addFilter && !includes(matchAny, value)) {
      filters[key]['matchAny'] = concat(matchAny, value) as MatchAnyValue;
    }

    if (!addFilter && includes(matchAny, value)) {
      filters[key]['matchAny'] = without(matchAny, value) as MatchAnyValue;
    }
  }

  if (type === 'customMatchAny') {
    const customMatchAny = filters[key]['customMatchAny'] || [];
    if (addFilter && !includesCustomFilter(customMatchAny, value as CustomFilter)) {
      filters[key]['customMatchAny'] = concat(customMatchAny, value as CustomFilter);
    }

    if (!addFilter && includesCustomFilter(customMatchAny, value as CustomFilter)) {
      filters[key]['customMatchAny'] = removeCustomFilter(customMatchAny, value as CustomFilter);
    }
  }

  if (type === 'stringContains') {
    filters[key]['stringContains'] = value as string;
  }

  return filters;
};

/**
 * This can update both matchAny and customMatchAny filters
 */
export const updateMatchAnyFilters = (
  filterConfig: FilterConfig,
  key: string,
  values: string[] | number[] | CustomFilter[],
  filterType: 'matchAny' | 'customMatchAny' = 'matchAny',
) => {
  const filters = cloneDeep(filterConfig);
  if (!(key in filters)) {
    filters[key] = {};
  }

  if (filterType === 'matchAny') {
    filters[key][filterType] = values as string[];
  } else {
    filters[key][filterType] = values as CustomFilter[];
  }

  return filters;
};

export const updateRangeFilters = (filterConfig: FilterConfig, key: string, ltValue: any, gtValue: any) => {
  const filters = cloneDeep(filterConfig);
  if (!(key in filters)) {
    filters[key] = {};
  }

  filters[key]['lessThan'] = ltValue;
  filters[key]['greaterThan'] = gtValue;

  return filters;
};

function includesCustomFilter(array: CustomFilter[], value: CustomFilter): boolean {
  return array.some(item => item.key === value.key);
}

function removeCustomFilter(array: CustomFilter[], value: CustomFilter): CustomFilter[] {
  return filter(array, item => (item as CustomFilter).key !== value.key);
}

function doesCustomMatchAny(customMatchAny: CustomFilter[], value: any): boolean {
  return customMatchAny.some(item => item.function && item.function(value));
}
