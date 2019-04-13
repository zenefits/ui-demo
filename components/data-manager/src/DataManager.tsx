import React, { Component } from 'react';

import { doFilter, FilterConfig } from './filterUtils';
import { doSort, SortConfig } from './sortUtils';
import { doPage } from './pageUtils';

export type OnPageChange = (newPage: number) => void;
export type FilterOnChange = (config: FilterConfig) => void;

interface DataContext<T> {
  inputData: T[];
  outputData: T[];
}

export interface FilterContext<T> extends DataContext<T> {
  config: FilterConfig;
  onChange: FilterOnChange;
}

export interface SortContext<T> extends DataContext<T> {
  config: SortConfig;
  onChange: (config: SortConfig) => void;
}

export interface PageContext<T> extends DataContext<T> {
  pageSize: number;
  currentPage: number;
  onPageChange: OnPageChange;
  onPageSizeChange: (newPageSize: number) => void;
}

type Selections = {
  [key: string]: boolean;
};

export interface SelectionContext<T> {
  selections: Selections;
  allDisplayedDataIsSelected: boolean;
  onSelect: (addedSelections: T[]) => void;
  onDeselect: (removedSelections: T[]) => void;
  selectionKey: keyof T;
}

function allDisplayedDataIsSelected<T>({
  data,
  selections,
  selectionKey,
}: {
  data: T[];
  selections: Selections;
  selectionKey: keyof T;
}) {
  if (!selectionKey) {
    return null;
  } else {
    return data.every((datum: T) => selections[datum[selectionKey] as any]);
  }
}

export interface DataManagerRenderProps<T> {
  displayData: T[];
  filtering: FilterContext<T>;
  sorting: SortContext<T>;
  paging: PageContext<T>;
  selectionContext: SelectionContext<T>;
}

interface DataManagerProps<T> {
  sourceData: T[];
  initialFilter?: FilterConfig;
  initialSorter?: SortConfig;
  initialPageSize?: number;
  initialPage?: number;
  selectionKey?: keyof T;
  render: (managerProps: DataManagerRenderProps<T>) => any;
}

interface DataManagerState {
  filterConfig: FilterConfig;
  sortConfig: SortConfig;
  selections: Selections;
  pageSize: number;
  currentPage: number;
}

const FilterManager = ({ data, config, render }: any) => render(doFilter(data || [], config || {}));
const SortManager = ({ data, config, render }: any) => render(doSort(data || [], config || {}));
const PageManager = ({ data, pageSize, currentPage, render }: any) =>
  render(doPage(data || [], pageSize || Infinity, currentPage || 1));

export const DataManagerContext = React.createContext<Partial<DataManagerRenderProps<any>>>({});

export default class DataManager<T> extends Component<DataManagerProps<T>, DataManagerState> {
  constructor(props: DataManagerProps<T>) {
    super(props);
    this.state = {
      filterConfig: props.initialFilter || {},
      sortConfig: props.initialSorter || {},
      pageSize: props.initialPageSize || Infinity,
      currentPage: props.initialPage || 1,
      selections: {},
    };
  }

  onFilterChange = (filterConfig: FilterConfig) => {
    this.setState({ filterConfig, selections: {} });
    // reset pagination when filters change
    this.onPageChange(1);
  };

  onSortChange = (sortConfig: SortConfig) => {
    this.setState({ sortConfig, selections: {} });
    // reset pagination after sorting/re-sorting
    this.onPageChange(1);
  };

  createSelectionsObject = (selections: T[], operation: 'add' | 'remove') =>
    selections.reduce((updatedSelectionKeys: Selections, selection) => {
      updatedSelectionKeys[selection[this.props.selectionKey] as any] = operation === 'add';
      return updatedSelectionKeys;
    }, {});

  onSelect = (addedSelections: T[]) => {
    if (!this.props.selectionKey) {
      throw new Error('Selection may not be used unless a unique selectionKey prop is provided');
    }

    this.setState((state: DataManagerState) => ({
      selections: {
        ...state.selections,
        ...this.createSelectionsObject(addedSelections, 'add'),
      },
    }));
  };

  onDeselect = (removedSelections: T[]) => {
    if (!this.props.selectionKey) {
      throw new Error('Selection may not be used unless a unique selectionKey prop is provided');
    }

    this.setState((state: DataManagerState) => ({
      selections: {
        ...state.selections,
        ...this.createSelectionsObject(removedSelections, 'remove'),
      },
    }));
  };

  onPageChange = (newPage: number) => this.setState({ currentPage: newPage, selections: {} });
  onPageSizeChange = (newPageSize: number) => this.setState({ pageSize: newPageSize, selections: {} });

  render() {
    const { sourceData, selectionKey } = this.props;
    const { filterConfig, selections, sortConfig, pageSize, currentPage } = this.state;
    const onFilterChange = this.onFilterChange;
    const onSortChange = this.onSortChange;
    const onPageChange = this.onPageChange;
    const onPageSizeChange = this.onPageSizeChange;

    return (
      <FilterManager
        data={sourceData}
        config={filterConfig}
        render={(filteredData: T[]) => (
          <SortManager
            data={filteredData}
            config={sortConfig}
            render={(sortedData: T[]) => (
              <PageManager
                data={sortedData}
                pageSize={pageSize}
                currentPage={currentPage}
                render={(pagedData: T[]) => {
                  const renderProps: DataManagerRenderProps<T> = {
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
                    selectionContext: {
                      selections,
                      selectionKey,
                      onSelect: this.onSelect,
                      onDeselect: this.onDeselect,
                      allDisplayedDataIsSelected: allDisplayedDataIsSelected({
                        selections,
                        selectionKey,
                        data: pagedData,
                      }),
                    },
                  };

                  return (
                    <DataManagerContext.Provider value={renderProps}>
                      {this.props.render(renderProps)}
                    </DataManagerContext.Provider>
                  );
                }}
              />
            )}
          />
        )}
      />
    );
  }
}
