import React from 'react';
import qs from 'qs';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { Configs, ConfigManagerProps } from './DeprecatedGenericDataManager';
import { AsyncFilterConfig as FilterConfig } from './filterUtils';
import { updateSorter, SortConfig } from './sortUtils';

// The config manager needs to have a getter and a setter for the configs.
// The configs state needs to be an object with four fields:
//   filterConfig, sortConfig, pageSize, and currentPage.

// Right now it only stores and modifies pageNumber in the url. So you could
// think of this as a "render props" version of the withPagination HOC.

const DEFAULT_PAGE_SIZE = 10;
export const ASC_INDICATOR = '';
export const DESC_INDICATOR = '-';

export interface DeprecatedUrlStateManagerInputProps {
  pageSize?: number;
  prefix: string;
  section?: string;
}

export interface DeprecatedUrlStateManagerChildrenProp {
  children: (cmProps: ConfigManagerProps) => React.ReactNode;
}

export type DeprecatedUrlStateManagerProps = DeprecatedUrlStateManagerInputProps &
  DeprecatedUrlStateManagerChildrenProp;

const setFilterInUrl = (filterConfig: FilterConfig, params: URLSearchParams, filterKey: string) => {
  // Delete all the old filter params
  params.forEach((v, k) => {
    if (k.startsWith(filterKey)) {
      params.delete(k);
    }
  });

  for (const key of Object.keys(filterConfig)) {
    params.set(`${filterKey}[${key}]`, filterConfig[key].toString());
  }
};

const getFilterFromUrl = (params: URLSearchParams, filterKey: string): FilterConfig => {
  const filterConfig = {} as FilterConfig;
  const filtersInUrl = qs.parse(params.toString())[filterKey] || {};
  for (const k of Object.keys(filtersInUrl)) {
    filterConfig[k] = (filtersInUrl[k] || '').split(',');
  }

  return filterConfig;
};

const setSortInUrl = (sortConfig: SortConfig, params: URLSearchParams, sortKey: string) => {
  if (!sortConfig[0]) {
    params.delete(sortKey);
    return;
  }

  const { key, isAscending } = sortConfig[0];
  params.set(sortKey, `${isAscending ? ASC_INDICATOR : DESC_INDICATOR}${key}`);
};

const getSortFromUrl = (params: URLSearchParams, sortKey: string): SortConfig => {
  const sortStr = params.get(sortKey) || '';
  if (!sortStr) {
    return {};
  }

  const isAscending = sortStr.charAt(0) !== DESC_INDICATOR;
  return updateSorter({}, isAscending ? sortStr : sortStr.slice(1), isAscending);
};

const setPageInUrl = (page: number, params: URLSearchParams, pageKey: string) =>
  page > 1 ? params.set(pageKey, page.toString()) : params.delete(pageKey);

const getPageFromUrl = (params: URLSearchParams, pageKey: string): number => Number(params.get(pageKey)) || 1;

const setSectionInUrl = (section: string, params: URLSearchParams, sectionKey: string) =>
  section ? params.set(sectionKey, section) : params.delete(sectionKey);

const getSectionFromUrl = (params: URLSearchParams, pageKey: string): string => params.get(pageKey);

class WrappedDeprecatedUrlStateManager extends React.Component<
  RouteComponentProps<any> & DeprecatedUrlStateManagerProps
> {
  setConfigs = (newConfig: Configs) => {
    const params = new URLSearchParams(this.props.location.search);
    const { prefix } = this.props;

    setFilterInUrl(newConfig.filterConfig || {}, params, `${prefix}filter`);
    setSortInUrl(newConfig.sortConfig || {}, params, `${prefix}sort`);
    setPageInUrl(Number(newConfig.currentPage) || 1, params, `${prefix}page`);
    setSectionInUrl(newConfig.currentSection, params, `${prefix}section`);

    this.props.history.push(`${this.props.location.pathname}?${params.toString()}`);
  };

  render() {
    const params = new URLSearchParams(this.props.location.search);
    const { prefix } = this.props;

    const filterConfig = getFilterFromUrl(params, `${prefix}filter`);
    const sortConfig = getSortFromUrl(params, `${prefix}sort`);
    const currentPage = getPageFromUrl(params, `${prefix}page`);
    const pageSize = this.props.pageSize || DEFAULT_PAGE_SIZE;
    const currentSection = getSectionFromUrl(params, `${prefix}section`) || this.props.section;

    const configs = {
      filterConfig,
      sortConfig,
      currentPage,
      pageSize,
      currentSection,
    };
    const { setConfigs } = this;

    return this.props.children({ configs, setConfigs });
  }
}

export default withRouter<DeprecatedUrlStateManagerProps>(WrappedDeprecatedUrlStateManager);
