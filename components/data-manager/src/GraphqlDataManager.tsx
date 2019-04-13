import React from 'react';
import { QueryResult } from 'react-apollo';
import { ObjectOmit } from 'typelevel-ts';

import { Query, QueryProps } from 'z-frontend-layout';

import { AsyncFilterConfig } from './filterUtils';
import GenericDataManager, { GenericManagerRenderProps } from './GenericDataManager';
import UrlStateManager, { ASC_INDICATOR, DESC_INDICATOR, UrlStateManagerInputProps } from './UrlStateManager';

export type GraphqlDataManagerQueryVariables = {
  filter?: AsyncFilterConfig;
  sort?: string;
  offset?: number;
  first?: number;
};

type GraphqlDataManagerOwnProps<TData, TVariables> = {
  queryVariables?: any;
  children: (managerProps: GenericManagerRenderProps & QueryResult<TData, TVariables>) => React.ReactNode;
};

export type GraphqlDataManagerProps<TData, TVariables> = ObjectOmit<
  QueryProps<TData, TVariables>,
  keyof GraphqlDataManagerOwnProps<TData, TVariables>
> &
  GraphqlDataManagerOwnProps<TData, TVariables>;

const getDataManagerQueryVariables = (managerProps: GenericManagerRenderProps): GraphqlDataManagerQueryVariables => {
  const variables: GraphqlDataManagerQueryVariables = {};

  // filtering prop
  if (managerProps.filtering.config) {
    variables.filter = managerProps.filtering.config;
  }

  // sorting prop
  if (managerProps.sorting.config[0]) {
    const { key, isAscending } = managerProps.sorting.config[0];
    variables.sort = `${isAscending ? ASC_INDICATOR : DESC_INDICATOR}${key}`;
  }

  // paging props
  const currentPage = managerProps.paging.currentPage;
  const pageSize = managerProps.paging.pageSize;
  variables.offset = (currentPage - 1) * pageSize;
  variables.first = pageSize;

  return variables;
};

export class GraphqlDataManager<TData, TVariables> extends React.Component<
  GraphqlDataManagerProps<TData, TVariables> & UrlStateManagerInputProps
> {
  render() {
    const { queryVariables = {}, children, pageSize, prefix, ...queryProps } = this.props;
    return (
      <UrlStateManager pageSize={pageSize} prefix={prefix}>
        {configManager => (
          <GenericDataManager configManager={configManager}>
            {managerProps => (
              <Query<TData, TVariables>
                variables={{ ...queryVariables, ...getDataManagerQueryVariables(managerProps) }}
                {...queryProps}
              >
                {props => children({ ...managerProps, ...props })}
              </Query>
            )}
          </GenericDataManager>
        )}
      </UrlStateManager>
    );
  }
}
