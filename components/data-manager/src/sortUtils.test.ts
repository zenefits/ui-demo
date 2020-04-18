import moment from 'moment';

import { doSort } from './sortUtils';

const items = [
  { name: 'Daniel', hireDate: moment('2011-02-10') },
  { name: 'Bruce', hireDate: moment('1999-01-06') },
  { name: 'ethan', hireDate: moment('1999-01-05') },
  { name: 'alice', hireDate: moment('2020-02-02') },
  { name: 'Frank', hireDate: moment('2007-11-30') },
  { name: 'chris', hireDate: moment('2009-09-22') },
];

describe('sortUtils', () => {
  it('sorts case insensitive', () => {
    const sortConfig = {
      '0': {
        key: 'name',
        isAscending: true,
      },
    };
    const sortedItems = doSort(items, sortConfig);
    expect(sortedItems[0].name).toBe('alice');
    expect(sortedItems[sortedItems.length - 1].name).toBe('Frank');
  });

  it('sorts moments', () => {
    const dateSortConfig = {
      '0': {
        key: 'hireDate',
        isAscending: true,
      },
    };

    const sortedItems = doSort(items, dateSortConfig);
    expect(sortedItems[0].name).toBe('ethan');
    const hireDates = sortedItems.map(item => item.hireDate.format('YYYY-MM-DD'));
    expect(hireDates).toEqual(['1999-01-05', '1999-01-06', '2007-11-30', '2009-09-22', '2011-02-10', '2020-02-02']);
  });

  it('descending order', () => {
    const dateSortConfig = {
      '0': {
        key: 'hireDate',
        isAscending: false,
      },
    };

    const sortedItems = doSort(items, dateSortConfig);
    const hireDates = sortedItems.map(item => item.hireDate.format('YYYY-MM-DD'));
    expect(hireDates).toEqual(['2020-02-02', '2011-02-10', '2009-09-22', '2007-11-30', '1999-01-06', '1999-01-05']);
  });
});
