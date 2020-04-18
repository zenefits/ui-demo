import React, { Component } from 'react';

import { throwInDevelopment } from 'z-frontend-app-bootstrap';

import { doFilter, FilterConfig } from './filterUtils';
import { doSort, SortConfig } from './sortUtils';
import { doPage, PageConfig } from './pageUtils';
import DeprecatedUrlStateManager from './DeprecatedUrlStateManager';
import { RowSelectionContext } from './data-selection/RowSelectionContext';
import { getSelectionCount, Selections } from './data-selection/utils';

export type OnPageChange = (newPage: number) => void;
export type OnSectionChange = (newSection: string) => void;
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
  config: PageConfig;
  onPageChange: OnPageChange;
  onPageSizeChange: (newPageSize: number) => void;
}

export interface SectionContext {
  config: SectionConfig;
  onSectionChange: OnSectionChange;
}

export interface DataManagerRenderProps<T> {
  displayData: T[];
  filtering: FilterContext<T>;
  sorting: SortContext<T>;
  paging: PageContext<T>;
  sections: SectionContext;
  sourceData: T[];
}

export type PageSizeString = 'xs' | 's' | 'm' | 'l' | 'xl' | 'unlimited';

interface DataManagerProps<T> {
  /** The dataset to be filtered/sorted */
  sourceData: T[];
  /** The initial state of filters */
  initialFilter?: FilterConfig;
  /** The initial configuration for sorting */
  initialSorter?: SortConfig;
  /**
   * The number of results to include on a single page
   * @default 'm'
   */
  initialPageSize?: PageSizeString;
  /**
   * The initial page number
   * @default 1
   * */
  initialPage?: number;
  /**
   * The initial set of keys to be selected. For example the initial set of keys which represent initially selected rows in DataTable
   */
  initialSelections?: Selections<T>;
  /**
   * Initial section selected where data is split into multiple sections
   */
  initialSection?: string;
  /**
   * The key to use to map an element in the dataSet to value to store in selections. For Example if T is {id: string, name: "string"}, your selectionKey would be id.
   * *Your selectionKey must map to a value which is type string or number*. If your selectionKey maps to a complex type like object selections will not work
   */
  selectionKey?: keyof T;
  /** Render function */
  render: (managerProps: DataManagerRenderProps<T>) => any;
}

type SectionConfig = {
  currentSection: string;
};

interface DataManagerState<T> {
  filterConfig: FilterConfig;
  sortConfig: SortConfig;
  selections: Selections<T>;
  pageConfig: PageConfig;
}

const FilterManager = ({ data, config, render }: any) => render(doFilter(data || [], config || {}));
const SortManager = ({ data, config, render }: any) => render(doSort(data || [], config || {}));
const PageManager = ({ data, config, render }: any) => render(doPage(data || [], config || {}));

export const pageSizeMap: { [key in PageSizeString]: number } = {
  xs: 5,
  s: 10,
  m: 25, // default
  l: 50, // prefer m or xl
  xl: 100,
  unlimited: Infinity, // backwards compatibility only
};

export const DataManagerContext = React.createContext<DataManagerRenderProps<any>>(null);

export default class DataManager<T> extends Component<DataManagerProps<T>, DataManagerState<T>> {
  static defaultProps = {
    initialPageSize: 'm',
  };

  constructor(props: DataManagerProps<T>) {
    super(props);
    this.state = {
      filterConfig: props.initialFilter || {},
      sortConfig: props.initialSorter || {},
      pageConfig: {
        pageSize: pageSizeMap[props.initialPageSize],
        currentPage: props.initialPage || 1,
      },
      selections: props.initialSelections || new Set(),
    };
  }

  onFilterChange = (filterConfig: FilterConfig) => {
    this.setState({ filterConfig, selections: new Set() });
    // reset pagination when filters change
    this.onPageChange(1);
  };

  onSortChange = (sortConfig: SortConfig) => {
    this.setState({ sortConfig, selections: new Set() });
    // reset pagination after sorting/re-sorting
    this.onPageChange(1);
  };

  createSelectionsSet = (selections: T[], operation: 'add' | 'remove'): Selections<T> =>
    selections.reduce((updatedSelectionSet: Selections<T>, selection) => {
      if (!['number', 'string'].includes(typeof selection[this.props.selectionKey])) {
        throwInDevelopment('selectionKey must map to a value of type number of string');
      }

      if (operation === 'add') {
        return updatedSelectionSet.add(selection[this.props.selectionKey]);
      } else {
        updatedSelectionSet.delete(selection[this.props.selectionKey]);
        return updatedSelectionSet;
      }
    }, new Set(this.state.selections)) as any;

  onSelect = (addedSelections: T[]) => {
    if (!this.props.selectionKey) {
      throw new Error('Selection may not be used unless a unique selectionKey prop is provided');
    }

    this.setState((state: DataManagerState<T>) => ({
      selections: this.createSelectionsSet(addedSelections, 'add'),
    }));
  };

  onDeselect = (removedSelections: T[]) => {
    if (!this.props.selectionKey) {
      throw new Error('Selection may not be used unless a unique selectionKey prop is provided');
    }

    this.setState((state: DataManagerState<T>) => ({
      selections: this.createSelectionsSet(removedSelections, 'remove'),
    }));
  };

  onPageChange = (newPage: number) =>
    this.setState(state => ({
      pageConfig: {
        ...state.pageConfig,
        currentPage: newPage,
      },
      selections: new Set(),
    }));

  onPageSizeChange = (newPageSize: number) =>
    this.setState(state => ({
      pageConfig: {
        ...state.pageConfig,
        pageSize: newPageSize,
      },
      selections: new Set(),
    }));

  render() {
    const { sourceData, selectionKey, initialSection } = this.props;
    const { filterConfig, selections, sortConfig, pageConfig } = this.state;
    const { onFilterChange } = this;
    const { onSortChange } = this;
    const { onPageChange } = this;
    const { onPageSizeChange } = this;

    return (
      <DeprecatedUrlStateManager prefix="" section={initialSection}>
        {configManager => (
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
                    config={pageConfig}
                    render={(pagedData: T[]) => {
                      // TODO: use configManager for all config? (like DeprecatedGenericDataManager)
                      const onSectionChange = (section: string) => {
                        this.onPageChange(1);
                        configManager.setConfigs({
                          ...configManager.configs,
                          currentSection: section,
                        });
                      };

                      const renderProps: DataManagerRenderProps<T> = {
                        sourceData,
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
                          onPageChange,
                          onPageSizeChange,
                          config: pageConfig,
                          inputData: sortedData,
                          outputData: pagedData,
                        },
                        sections: {
                          onSectionChange,
                          config: { currentSection: configManager.configs.currentSection },
                        },
                      };

                      const selectionCount = getSelectionCount({
                        selections,
                        selectionKey,
                        data: pagedData,
                      });
                      const selectionContext = {
                        selections,
                        selectionKey,
                        selectionCount,
                        onSelect: this.onSelect,
                        onDeselect: this.onDeselect,
                        allDisplayedDataIsSelected: pagedData.length > 0 && selectionCount === pagedData.length,
                        anyDisplayedDataIsSelected: selectionCount > 0,
                      };

                      return (
                        <DataManagerContext.Provider value={renderProps}>
                          <RowSelectionContext.Provider value={selectionContext}>
                            {this.props.render(renderProps)}
                          </RowSelectionContext.Provider>
                        </DataManagerContext.Provider>
                      );
                    }}
                  />
                )}
              />
            )}
          />
        )}
      </DeprecatedUrlStateManager>
    );
  }
}
