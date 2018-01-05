import _ from 'lodash';

export interface SortConfig {
  [propName: string]: {
    key: string;
    isAscending: boolean;
  };
}

export const doSort = <T>(items: T[], sortConfig: SortConfig): T[] => {
  if (!sortConfig[0]) {
    return items;
  }

  const sortedItems = _.sortBy(items, sortConfig[0].key);
  return sortConfig[0].isAscending ? sortedItems : sortedItems.reverse();
};

// currently not using previous sortConfig, but might be useful in the future
export const updateSorter = (sortConfig: SortConfig, key: string, isAscending: boolean): SortConfig =>
  key ? { '0': { key, isAscending } } : {};
