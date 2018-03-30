import React from 'react';
import { FilterConfig } from './filterUtils';
import { SortConfig } from './sortUtils';

// A generic data manager has to have a render prop, and a config manager.
// The config manager needs to have the configs and a setter for the configs.
// The configs state needs to be an object with four fields:
//   filterConfig, sortConfig, pageSize, and currentPage.

export interface DataManagerFilterRenderProps {
  config: FilterConfig;
  onChange: (config: FilterConfig) => void;
}
export interface DataManagerSortRenderProps {
  config: SortConfig;
  onChange: (config: SortConfig) => void;
}
export interface DataManagerPageRenderProps {
  pageSize: number;
  currentPage: number;
  onPageChange: (newPage: number) => void;
  onPageSizeChange: (newPageSize: number) => void;
}

export interface GenericManagerRenderProps {
  filtering: DataManagerFilterRenderProps;
  sorting: DataManagerSortRenderProps;
  paging: DataManagerPageRenderProps;
}

export interface Configs {
  filterConfig: FilterConfig;
  sortConfig: SortConfig;
  currentPage: number;
  pageSize: number;
}

export interface ConfigManagerProps {
  configs: Configs;
  setConfigs: (newConfigs: Configs) => void;
}

interface GenericDataManagerProps {
  configManager: ConfigManagerProps;
  children: (managerProps: GenericManagerRenderProps) => React.ReactNode;
}

export default class GenericDataManager extends React.Component<GenericDataManagerProps, {}> {
  // set new filters and also reset pagination when filters change
  onFilterChange = (newFilterConfig: FilterConfig) =>
    this.props.configManager.setConfigs({
      ...this.props.configManager.configs,
      filterConfig: newFilterConfig,
      currentPage: 1,
    });

  // set new sorters and also reset pagination when sort changes
  onSortChange = (newSortConfig: SortConfig) =>
    this.props.configManager.setConfigs({
      ...this.props.configManager.configs,
      sortConfig: newSortConfig,
      currentPage: 1,
    });

  onPageChange = (newPage: number) =>
    this.props.configManager.setConfigs({
      ...this.props.configManager.configs,
      currentPage: newPage,
    });

  onPageSizeChange = (newPageSize: number) =>
    this.props.configManager.setConfigs({
      ...this.props.configManager.configs,
      pageSize: newPageSize,
    });

  render() {
    const configs = this.props.configManager.configs;
    const filtering = {
      config: configs.filterConfig,
      onChange: this.onFilterChange,
    };
    const sorting = {
      config: configs.sortConfig,
      onChange: this.onSortChange,
    };
    const paging = {
      currentPage: configs.currentPage,
      pageSize: configs.pageSize,
      onPageChange: this.onPageChange,
      onPageSizeChange: this.onPageSizeChange,
    };

    return this.props.children({ filtering, sorting, paging });
  }
}
