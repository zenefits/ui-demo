import React from 'react';
import { QueryResult } from 'react-apollo';

import { Query, QueryProps } from 'z-frontend-network';

import { AsyncFilterConfig } from './filterUtils';
import DeprecatedGenericDataManager, { GenericManagerRenderProps } from './DeprecatedGenericDataManager';
import DeprecatedUrlStateManager, {
  ASC_INDICATOR,
  DeprecatedUrlStateManagerInputProps,
  DESC_INDICATOR,
} from './DeprecatedUrlStateManager';

export type DeprecatedGraphqlDataManagerQueryVariables = {
  filter?: AsyncFilterConfig;
  sort?: string;
  offset?: number;
  first?: number;
};

type DeprecatedGraphqlDataManagerOwnProps<TData, TVariables> = {
  queryVariables?: any;
  children: (managerProps: GenericManagerRenderProps & QueryResult<TData, TVariables>) => React.ReactElement;
};

export type DeprecatedGraphqlDataManagerProps<TData, TVariables> = Omit<
  QueryProps<TData, TVariables>,
  keyof DeprecatedGraphqlDataManagerOwnProps<TData, TVariables>
> &
  DeprecatedGraphqlDataManagerOwnProps<TData, TVariables>;

const getDataManagerQueryVariables = (
  managerProps: GenericManagerRenderProps,
): DeprecatedGraphqlDataManagerQueryVariables => {
  const variables: DeprecatedGraphqlDataManagerQueryVariables = {};

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
  const { currentPage } = managerProps.paging;
  const { pageSize } = managerProps.paging;
  variables.offset = (currentPage - 1) * pageSize;
  variables.first = pageSize;

  return variables;
};

export class DeprecatedGraphqlDataManager<TData, TVariables> extends React.Component<
  DeprecatedGraphqlDataManagerProps<TData, TVariables> & DeprecatedUrlStateManagerInputProps
> {
  render() {
    const { queryVariables = {}, children, pageSize, prefix, ...queryProps } = this.props;
    return (
      <DeprecatedUrlStateManager pageSize={pageSize} prefix={prefix}>
        {configManager => (
          <DeprecatedGenericDataManager configManager={configManager}>
            {managerProps => (
              <Query<TData, TVariables>
                variables={{ ...queryVariables, ...getDataManagerQueryVariables(managerProps) }}
                {...queryProps}
              >
                {props => children({ ...managerProps, ...props })}
              </Query>
            )}
          </DeprecatedGenericDataManager>
        )}
      </DeprecatedUrlStateManager>
    );
  }
}
