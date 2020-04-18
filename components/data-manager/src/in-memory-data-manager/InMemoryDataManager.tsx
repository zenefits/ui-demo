import React, { useContext, useState } from 'react';
import { union } from 'lodash';

import { throwInDevelopment } from 'z-frontend-app-bootstrap';

import UrlQueryParamsManager, { UrlQueryParamsContext, UrlQueryParamsProps } from '../UrlQueryParamsManager';
import { doFilter, CustomFilter, FilterConfig } from '../filterUtils';
import { doSort, SortConfig } from '../sortUtils';
import { getFiltersFromQueryParams, Filters } from '../url-filters/urlFilterUtils';
import { doPage, PageConfig } from '../pageUtils';
import GenericDataManagerContext, { GenericDataManagerContextType } from '../GenericDataManagerContext';
import { RowSelectionContext } from '../data-selection/RowSelectionContext';
import { getSelectionCount, Selections } from '../data-selection/utils';

type ChildrenFn = (params: GenericDataManagerContextType) => JSX.Element;

type CustomFilters = { [fieldName: string]: CustomFilter[] };

type SelectType = 'select' | 'deselect';

type OperationName = 'add' | 'remove';

type InMemoryDataManagerInnerProps<T> = {
  /**
   * The dataset to be filtered/sorted/paginated.
   * */
  sourceData: T[];
  children: JSX.Element | ChildrenFn;
  /**
   * A map of custom filters that could be used for filtering.
   */
  customFilters?: CustomFilters;
  /**
   * The key to use to map an element in the data set to a value stored in selections.
   * For Example if T is `{id: string; name: string;}`, the selectionKey would be id.
   * The selectionKey *MUST* map to a value which is type string or number. If the selectionKey maps to a complex type
   * such as object, selections will not work.
   */
  selectionKey?: keyof T;
};

export type InMemoryDataManagerProps<T> = InMemoryDataManagerInnerProps<T> & {
  /**
   * Keys and values to be used if those keys are not specified in the URL query params.
   * @default {currentPage:1,pageSize:25}
   */
  urlQueryParamsDefaults?: UrlQueryParamsProps['defaults'];
  /**
   * An array of keys to be treated as numbers when parsing the URL query params.
   * @default ['currentPage','pageSize']
   */
  urlQueryParamsNumberKeys?: UrlQueryParamsProps['numberKeys'];
};

const filterTypePrefixes = {
  custom: 'custom_',
  lessThan: 'lessThan_',
  greaterThan: 'greaterThan_',
};

const noSelectionKeyError = 'Selection may not be used unless a unique selectionKey prop is provided';

const defaultUrlQueryParamsManagerProps: Partial<UrlQueryParamsProps> = {
  defaults: {
    currentPage: 1,
    pageSize: 25,
  },
  numberKeys: ['currentPage', 'pageSize'],
};

/**
 * This is the exposed InMemoryDataManager.
 * It wraps InMemoryDataManagerInner with UrlQueryParamsManager so consumers don't need to do it every time.
 * It also provides default pagination settings which can be overwritten in the URL.
 */
function InMemoryDataManager<T>(props: InMemoryDataManagerProps<T>) {
  const { urlQueryParamsDefaults, urlQueryParamsNumberKeys } = props;

  const inputDefaults = urlQueryParamsDefaults || {};
  const defaults = { ...defaultUrlQueryParamsManagerProps.defaults, ...inputDefaults };

  const inputNumberKeys = urlQueryParamsNumberKeys || [];
  const numberKeys = union(defaultUrlQueryParamsManagerProps.numberKeys, inputNumberKeys);

  return (
    <UrlQueryParamsManager defaults={defaults} numberKeys={numberKeys}>
      <InMemoryDataManagerInner {...props} />
    </UrlQueryParamsManager>
  );
}

/**
 * A component that takes in an array of sourceData, reads URL query params for filtering/sorting/pagination
 * configurations, does filtering/sorting/pagination internally, and presents processed data through
 *  GenericDataManagerContext.
 *
 * This component also maintains a state about data selections. The state and related methods are exposed through
 * RowSelectionContext. Usage of this is inside DataTable and EditableTable.
 *
 * Query params format:
 *
 * 1. filtering
 * 1.1 "field contains string": filter_fieldName=XX
 * 1.2 "match any":             filter_fieldName[]=XX&filter_fieldName[]=YY
 * 1.3 "custom match":          filter_custom_fieldName=1
 * 1.4 "less than":             filter_lessThan_fieldName=987
 * 1.5 "greater than":          filter_greaterThan_fieldName=123
 *
 * 2. sorting (Tastypie style)
 * order_by[]=name
 *
 * 3. pagination
 * currentPage=1&pageSize=25
 */
function InMemoryDataManagerInner<T>(props: InMemoryDataManagerInnerProps<T>) {
  const { children, customFilters, selectionKey, sourceData } = props;
  const [selectionsInState, setSelectionsInState] = useState(new Set());
  const {
    queryParams: { currentPage, pageSize, order_by, ...rest },
  } = useContext(UrlQueryParamsContext);

  const filters: Filters = getFiltersFromQueryParams(rest);
  const filterConfig: FilterConfig = getFilterConfig(filters, customFilters);
  const sortConfig: SortConfig = getSortConfig(order_by as string[]);
  const pageConfig: PageConfig = { currentPage, pageSize };

  // Filtering should be done first, then sorting, then pagination.
  const filteredData: T[] = doFilter(sourceData, filterConfig);
  const sortedData: T[] = doSort(filteredData, sortConfig);
  const pagedData: T[] = doPage(sortedData, pageConfig);
  const contextValue: GenericDataManagerContextType = {
    data: pagedData,
    loading: false,
    totalItemsCount: filteredData.length,
  };

  const createSelectionsSet = (selections: T[], operation: OperationName): Selections<T> =>
    selections.reduce((updatedSelectionSet: Selections<T>, selection) => {
      const selectionValue = selection[selectionKey];
      if (!['number', 'string'].includes(typeof selectionValue)) {
        throwInDevelopment('selectionKey must map to a value of type number of string');
      }

      if (operation === 'add') {
        return updatedSelectionSet.add(selectionValue);
      } else {
        updatedSelectionSet.delete(selectionValue);
        return updatedSelectionSet;
      }
    }, new Set(selectionsInState) as Selections<T>);

  const getSelectOrDeselectHandler = (selectType: SelectType) => (changedSelections: T[]) => {
    if (!selectionKey) {
      throw new Error(noSelectionKeyError);
    }

    const operationName: OperationName = selectType === 'select' ? 'add' : 'remove';
    setSelectionsInState(createSelectionsSet(changedSelections, operationName));
  };

  const selectionCount = getSelectionCount({
    selectionKey,
    selections: selectionsInState as Selections<T>,
    data: pagedData,
  });

  const selectionContext = {
    selectionKey,
    selectionCount,
    onSelect: getSelectOrDeselectHandler('select'),
    onDeselect: getSelectOrDeselectHandler('deselect'),
    selections: selectionsInState,
    allDisplayedDataIsSelected: pagedData.length > 0 && selectionCount === pagedData.length,
    anyDisplayedDataIsSelected: selectionCount > 0,
  };

  return (
    <GenericDataManagerContext.Provider value={contextValue}>
      <RowSelectionContext.Provider value={selectionContext}>
        {typeof children === 'function' ? children(contextValue) : children}
      </RowSelectionContext.Provider>
    </GenericDataManagerContext.Provider>
  );
}

export default InMemoryDataManager;

/**
 * Example of filters:
 * {
 *  name: 'alex',
 *  department: [1, 2],
 *  custom_error: '1',
 *  lessThan_hireDate: 1585608790888,
 *  greaterThan_startDate: 1586611790888,
 * }
 */
function getFilterConfig(filters: Filters, customFilters: CustomFilters = {}): FilterConfig {
  const filterConfig: FilterConfig = {};
  const presetField = (fieldName: string) => (filterConfig[fieldName] = filterConfig[fieldName] || {});

  for (const filterName in filters) {
    if (filterName.startsWith(filterTypePrefixes.custom)) {
      const fieldName: string = filterName.slice(filterTypePrefixes.custom.length);
      const filterValue = filters[filterName];

      if (filterValue) {
        presetField(fieldName);
        filterConfig[fieldName].customMatchAny = customFilters[fieldName];
      }
    } else if (filterName.startsWith(filterTypePrefixes.lessThan)) {
      const fieldName: string = filterName.slice(filterTypePrefixes.lessThan.length);
      const filterValue = filters[filterName];

      if (filterValue || filterValue === 0) {
        presetField(fieldName);
        filterConfig[fieldName].lessThan = filterValue;
      }
    } else if (filterName.startsWith(filterTypePrefixes.greaterThan)) {
      const fieldName: string = filterName.slice(filterTypePrefixes.greaterThan.length);
      const filterValue = filters[filterName];

      if (filterValue || filterValue === 0) {
        presetField(fieldName);
        filterConfig[fieldName].greaterThan = filterValue;
      }
    } else if (Array.isArray(filters[filterName])) {
      const fieldName = filterName;
      const filterValue = filters[filterName] as string[] | number[];

      if (filterValue.length) {
        presetField(fieldName);
        filterConfig[fieldName].matchAny = filterValue;
      }
    } else {
      const fieldName = filterName;
      const filterValue = filters[filterName] as string;

      if (filterValue) {
        presetField(fieldName);
        filterConfig[fieldName].stringContains = filterValue;
      }
    }
  }

  return filterConfig;
}

// Currently only support sorting by one field.
function getSortConfig(order_by: string[]): SortConfig {
  if (!order_by || !order_by.length) {
    return {};
  }

  const sortValue = order_by[0];
  const isAscending = !sortValue.startsWith('-');
  const fieldName = isAscending ? sortValue : sortValue.slice(1);

  return { '0': { isAscending, key: fieldName } };
}
