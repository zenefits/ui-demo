import {
  clearFilters,
  findSelectedOption,
  getDateRangeValues,
  getEnteredText,
  getFiltersFromQueryParams,
  getSelectedFilterOption,
  getSelectedFilterOptions,
  transformFiltersToUrlFormat,
} from './urlFilterUtils';
import { QueryParams } from '../UrlQueryParamsManager';

const locationOptions = [
  {
    id: 1,
    label: 'SF',
  },
  {
    id: 2,
    label: 'YVR',
  },
  {
    id: 3,
    label: 'BLR',
  },
];

test('should add prefix to the filters', () => {
  const filters = {
    locations: [1, 2, 3],
  };

  const transFormedFilter = {
    filter_locations: [1, 2, 3],
  };

  expect(transformFiltersToUrlFormat(filters)).toEqual(transFormedFilter);
});

test('should remove the prefix from filter other than pageSize and currentPage ', () => {
  const filters = {
    locations: [1, 2, 3],
  };

  const transFormedFilter: QueryParams = {
    currentPage: 1,
    pageSize: 25,
    filter_locations: [1, 2, 3],
  };
  expect(getFiltersFromQueryParams(transFormedFilter)).toEqual(filters);
});

describe('getEnteredText', () => {
  it('should return empty string initially for text filter', () => {
    const transFormedFilter: QueryParams = {
      currentPage: 1,
      pageSize: 25,
    };
    expect(getEnteredText(transFormedFilter, 'employee')).toEqual('');
  });

  it('should return the entered string for text filter', () => {
    const transFormedFilter: QueryParams = {
      currentPage: 1,
      pageSize: 25,
      filter_employee: 'todd',
    };
    expect(getEnteredText(transFormedFilter, 'employee')).toEqual('todd');
  });
});

describe('getSelectedFilterOption', () => {
  it('should return null initialy for select filter', () => {
    const transFormedFilter: QueryParams = {
      currentPage: 1,
      pageSize: 25,
    };
    expect(getSelectedFilterOption(transFormedFilter, locationOptions, 'locations')).toEqual(null);
  });

  it('should return selected option from urlParams', () => {
    const transFormedFilter: QueryParams = {
      currentPage: 1,
      pageSize: 25,
      filter_locations: [1],
    };

    expect(getSelectedFilterOption(transFormedFilter, locationOptions, 'locations')).toEqual({
      id: 1,
      label: 'SF',
    });
  });
});

describe('getSelectedFilterOptions', () => {
  it('should return null initialy for multi select filter', () => {
    const transFormedFilter: QueryParams = {
      currentPage: 1,
      pageSize: 25,
    };
    expect(getSelectedFilterOptions(transFormedFilter, locationOptions, 'locations')).toEqual(null);
  });

  it('should return selected options from urlParams', () => {
    const transFormedFilter: QueryParams = {
      currentPage: 1,
      pageSize: 25,
      filter_locations: [1, 2],
    };

    expect(getSelectedFilterOptions(transFormedFilter, locationOptions, 'locations')).toEqual([
      {
        id: 1,
        label: 'SF',
      },
      {
        id: 2,
        label: 'YVR',
      },
    ]);
  });
});

describe('getDateRangeValues', () => {
  it('should return empty string for dates initialy', () => {
    const transFormedFilter: QueryParams = {
      currentPage: 1,
      pageSize: 25,
    };
    expect(getDateRangeValues(transFormedFilter, 'hired')).toEqual({
      afterDate: '',
      beforeDate: '',
    });
  });

  it('should return selected dates of format from urlParams', () => {
    const transFormedFilter: QueryParams = {
      currentPage: 1,
      pageSize: 25,
      filter_hired_after: '1/1/2019',
      filter_hired_before: '1/3/2019',
    };

    expect(getDateRangeValues(transFormedFilter, 'hired')).toEqual({
      afterDate: '1/1/2019',
      beforeDate: '1/3/2019',
    });
  });
});

describe('findSelectedOption', () => {
  it('should find the option from list of options', () => {
    expect(findSelectedOption(1, locationOptions)).toEqual({
      id: 1,
      label: 'SF',
    });
  });
});

describe('clearFilters', () => {
  it('should add [] to filters on reset', () => {
    const transFormedFilter: QueryParams = {
      currentPage: 1,
      pageSize: 25,
      filter_locations: [1],
    };

    expect(clearFilters(transFormedFilter)).toEqual({
      filter_locations: [],
    });
  });
});
