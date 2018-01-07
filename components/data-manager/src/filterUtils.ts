import _ from 'lodash';

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

  return _.filter(items, item => _.every(filterKeys, key => _passesFilter(filterConfig[key], item[key])));
};

const _passesFilter = (filter: FilterConfigPerKey, value: string): boolean => {
  const matchAnySet = new Set(filter['matchAny']);
  if (matchAnySet.size && !matchAnySet.has(value)) {
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
  const filters = _.cloneDeep(filterConfig);
  if (!(key in filters)) {
    filters[key] = {};
  }

  if (type === 'matchAny') {
    const matchSet = new Set(filters[key]['matchAny']);
    matchSet[addFilter ? 'add' : 'delete'](value);
    filters[key]['matchAny'] = [...matchSet];
  }

  if (type === 'stringContains') {
    filters[key]['stringContains'] = value;
  }

  return filters;
};
