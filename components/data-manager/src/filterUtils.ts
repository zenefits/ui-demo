import { cloneDeep, concat, every, filter, includes, without } from 'lodash';

interface FilterConfigPerKey {
  matchAny?: string[];
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

  const substring = filter['stringContains'];
  if (substring && value && !value.toLocaleLowerCase().includes(substring.toLocaleLowerCase())) {
    return false;
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
  type: 'matchAny' | 'stringContains',
  key: string,
  value: string,
  addFilter: boolean,
): FilterConfig => {
  const filters = cloneDeep(filterConfig);
  if (!(key in filters)) {
    filters[key] = {};
  }

  if (type === 'matchAny') {
    const matchAny = filters[key]['matchAny'] || [];
    if (addFilter && !includes(matchAny, value)) {
      filters[key]['matchAny'] = concat(matchAny, value);
    }

    if (!addFilter && includes(matchAny, value)) {
      filters[key]['matchAny'] = without(matchAny, value);
    }
  }

  if (type === 'stringContains') {
    filters[key]['stringContains'] = value;
  }

  return filters;
};

export const updateMatchAnyFilters = (filterConfig: FilterConfig, key: string, values: string[]) => {
  const filters = cloneDeep(filterConfig);
  if (!(key in filters)) {
    filters[key] = {};
  }

  filters[key]['matchAny'] = values;

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
