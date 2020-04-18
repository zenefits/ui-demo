import { sortBy, ListIteratee } from 'lodash';

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

  // Currently only support sorting by one key.
  const { key, isAscending } = sortConfig[0];

  const iteratee: ListIteratee<T> = (item: T) => {
    const value = item[key as keyof T];
    if (typeof value === 'string') {
      // For string, we sort case-insensitively
      return value.toLowerCase();
    } else {
      return value;
    }
  };

  const sortedItems = sortBy(items, iteratee);

  return isAscending ? sortedItems : sortedItems.reverse();
};

// currently not using previous sortConfig, but might be useful in the future
export const updateSorter = (sortConfig: SortConfig, key: string, isAscending: boolean): SortConfig =>
  key ? { '0': { key, isAscending } } : {};
