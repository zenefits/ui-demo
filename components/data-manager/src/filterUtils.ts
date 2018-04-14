import { cloneDeep, concat, every, filter, includes, without } from 'lodash';

interface FilterConfigPerKey {
  matchAny?: string[];
  stringContains?: string;
}

export interface FilterConfig {
  [propName: string]: FilterConfigPerKey;
}

export const doFilter = <T>(items: T[], filterConfig: FilterConfig): T[] => {
  const filterKeys = Object.keys(filterConfig);
  if (filterKeys.length === 0) {
    return items;
  }

  return filter(items, item => every(filterKeys, key => _passesFilter(filterConfig[key], item[key])));
};

const _passesFilter = (filter: FilterConfigPerKey, value: string): boolean => {
  const matchAny = filter['matchAny'] || [];
  if (matchAny.length && !includes(matchAny, value)) {
    return false;
  }

  const substring = filter['stringContains'];
  if (substring && value && !value.toLocaleLowerCase().includes(substring.toLocaleLowerCase())) {
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
