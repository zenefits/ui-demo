import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { ConfigManagerProps, Configs } from './GenericDataManager';

// The config manager needs to have a getter and a setter for the configs.
// The configs state needs to be an object with four fields:
//   filterConfig, sortConfig, pageSize, and currentPage.

// Right now it only stores and modifies pageNumber in the url. So you could
// think of this as a "render props" version of the withPagination HOC.

const DEFAULT_PAGE_SIZE = 10;

export interface UrlStateManagerInputProps {
  pageSize?: number;
}

export interface UrlStateManagerChildrenProp {
  children: (cmProps: ConfigManagerProps) => React.ReactNode;
}

export declare type UrlStateManagerProps = UrlStateManagerInputProps & UrlStateManagerChildrenProp;

class WrappedUrlStateManager extends React.Component<RouteComponentProps<any> & UrlStateManagerProps> {
  setConfigs = (newConfig: Configs) => {
    const page = Number(newConfig.currentPage) || 1;
    const params = new URLSearchParams(this.props.location.search);
    if (page > 1) {
      params.set('page', page.toString());
    } else {
      params.delete('page');
    }
    this.props.history.push(`${this.props.location.pathname}?${params.toString()}`);
  };

  render() {
    const params = new URLSearchParams(this.props.location.search);
    const currentPage = Number(params.get('page')) || 1;
    const configs = {
      currentPage,
      filterConfig: {},
      sortConfig: {},
      pageSize: this.props.pageSize || DEFAULT_PAGE_SIZE,
    };
    const setConfigs = this.setConfigs;

    return this.props.children({ configs, setConfigs });
  }
}

export default withRouter<UrlStateManagerProps>(WrappedUrlStateManager);
