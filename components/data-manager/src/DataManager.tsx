import React, { Component } from 'react';

import { doFilter, FilterConfig } from './filterUtils';
import { doSort, SortConfig } from './sortUtils';
import { doPage } from './pageUtils';

export interface DataManagerRenderProps<T> {
  displayData: T[];
  filtering: {
    inputData: T[];
    outputData: T[];
    config: FilterConfig;
    onChange: (config: FilterConfig) => void;
  };
  sorting: {
    inputData: T[];
    outputData: T[];
    config: SortConfig;
    onChange: (config: SortConfig) => void;
  };
  paging: {
    inputData: T[];
    outputData: T[];
    pageSize: number;
    currentPage: number;
    onPageChange: (newPage: number) => void;
    onPageSizeChange: (newPageSize: number) => void;
  };
}

interface DataManagerProps<T> {
  sourceData: T[];
  initialFilter?: FilterConfig;
  initialSorter?: SortConfig;
  initialPageSize?: number;
  initialPage?: number;
  render: (managerProps: DataManagerRenderProps<T>) => any;
}

interface DataManagerState {
  filterConfig: FilterConfig;
  sortConfig: SortConfig;
  pageSize: number;
  currentPage: number;
}

const FilterManager = ({ data, config, render }) => render(doFilter(data || [], config || {}));
const SortManager = ({ data, config, render }) => render(doSort(data || [], config || {}));
const PageManager = ({ data, pageSize, currentPage, render }) =>
  render(doPage(data || [], pageSize || Infinity, currentPage || 1));

export default class DataManager<T> extends Component<DataManagerProps<T>, DataManagerState> {
  constructor(props) {
    super(props);
    this.state = {
      filterConfig: props.initialFilter || {},
      sortConfig: props.initialSorter || {},
      pageSize: props.initialPageSize || Infinity,
      currentPage: props.initialPage || 1,
    };
  }

  onFilterChange = (filterConfig: FilterConfig) => {
    this.setState({ filterConfig });
    // reset pagination when filters change
    this.onPageChange(1);
  };

  onSortChange = (sortConfig: SortConfig) => {
    this.setState({ sortConfig });
    // reset pagination after sorting/re-sorting
    this.onPageChange(1);
  };

  onPageChange = (newPage: number) => this.setState({ currentPage: newPage });
  onPageSizeChange = (newPageSize: number) => this.setState({ pageSize: newPageSize });

  render() {
    const sourceData = this.props.sourceData;
    const filterConfig = this.state.filterConfig;
    const sortConfig = this.state.sortConfig;
    const pageSize = this.state.pageSize;
    const currentPage = this.state.currentPage;
    const onFilterChange = this.onFilterChange;
    const onSortChange = this.onSortChange;
    const onPageChange = this.onPageChange;
    const onPageSizeChange = this.onPageSizeChange;

    return (
      <FilterManager
        data={sourceData}
        config={filterConfig}
        render={filteredData => (
          <SortManager
            data={filteredData}
            config={sortConfig}
            render={sortedData => (
              <PageManager
                data={sortedData}
                pageSize={pageSize}
                currentPage={currentPage}
                render={pagedData =>
                  this.props.render({
                    displayData: pagedData,
                    filtering: {
                      config: filterConfig,
                      onChange: onFilterChange,
                      inputData: sourceData,
                      outputData: filteredData,
                    },
                    sorting: {
                      config: sortConfig,
                      onChange: onSortChange,
                      inputData: filteredData,
                      outputData: sortedData,
                    },
                    paging: {
                      pageSize,
                      currentPage,
                      onPageChange,
                      onPageSizeChange,
                      inputData: sortedData,
                      outputData: pagedData,
                    },
                  })
                }
              />
            )}
          />
        )}
      />
    );
  }
}
