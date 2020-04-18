import React from 'react';
import { pickBy } from 'lodash';
import { QueryResult } from 'react-apollo';

import { Query, QueryProps } from 'z-frontend-network';

import { QueryParams, UrlQueryParamsContext } from './UrlQueryParamsManager';
import GenericDataManagerContext from './GenericDataManagerContext';
import { getFiltersFromQueryParams } from './url-filters/urlFilterUtils';

const getGraphqlVariablesFromQueryParams = ({ currentPage, pageSize, order_by, ...rest }: QueryParams) =>
  pickBy(
    {
      order_by,
      limit: pageSize,
      offset: (currentPage - 1) * pageSize,
      filter: getFiltersFromQueryParams(rest),
    },
    x => x || x === 0,
  );

type ProcessDataType<T> = {
  processedData: T;
  totalItemsCount?: number;
};

type GqlManagerRenderProps<Data> = {
  // The Data in the render prop of GraphqlDataManager will be either QueryData | ProcessDataType
  data: Data;
  totalItemsCount?: number;
};

type ChildrenFn<QueryData, QueryVariables, Data> = (
  renderProps: GqlManagerRenderProps<Data> & Omit<QueryResult<QueryData, QueryVariables>, 'data'>,
) => JSX.Element;

type GraphqlDataManagerProps<QueryData, QueryVariables, Data> = {
  /**
   * // TODO: if we want to keep URL as source of truth, shall we change this so that data from URL always take
   * // priority?
   * This prop can be used to overwrite query variables calculated from URL query params.
   *
   * For pagination, we use "limit" and "offset".
   *
   * For sorting, we use "order_by" as the key. "-" means descending.
   *
   * e.g.
   * {
   *  limit: 25,
   *  offset: 0,
   *  order_by: ['-name'],
   * }
   */
  queryVariables?: Partial<QueryVariables>;
  query: QueryProps<QueryData, QueryVariables>['query'];
  queryOptions: Partial<QueryProps<QueryData, QueryVariables>>;
  children: JSX.Element | ChildrenFn<QueryData, QueryVariables, Data>;
  /**
   * Optional function to process the data from GraphQL before passing down to context provider and render prop.
   * If possible, put totalItemsCount in the returned object. It can be used to show total number of results.
   *
   * When GraphqlDataManager is used with DataTable, **MUST** use processData to format data into an array of rows,
   * i.e. data: Row[];
   */
  processData?: (data: QueryResult<QueryData, QueryVariables>['data']) => ProcessDataType<Data>;
};

function GraphqlDataManager<QueryData, QueryVariables, Data = QueryData>(
  props: GraphqlDataManagerProps<QueryData, QueryVariables, Data>,
) {
  const { children, query, queryOptions, queryVariables: queryVariablesProp, processData } = props;
  const { queryParams } = React.useContext(UrlQueryParamsContext);
  const queryVariables = ({
    // TODO: pagination default variables could be implemented here instead of inside UrlQueryParamsContext
    // ...defaultPaginationVariables
    ...getGraphqlVariablesFromQueryParams(queryParams),
    ...queryVariablesProp,
  } as any) as QueryVariables;

  return (
    <Query<QueryData, QueryVariables> query={query} variables={queryVariables} {...queryOptions}>
      {params => {
        let contextValue = {} as { data: any; totalItemsCount?: number };
        if (processData) {
          const { processedData, totalItemsCount } = !params.loading && processData(params.data);
          contextValue = {
            totalItemsCount,
            data: processedData,
          };
        } else {
          contextValue = {
            data: params.data,
          };
        }

        const renderProps = {
          ...params,
          data: contextValue.data,
          totalItemsCount: contextValue.totalItemsCount ?? null,
        };

        return (
          <GenericDataManagerContext.Provider value={{ ...contextValue, loading: params.loading }}>
            {/* Supporting render props pattern for backwards components, but data manager context is recommended */}
            {typeof children === 'function' ? children(renderProps) : children}
          </GenericDataManagerContext.Provider>
        );
      }}
    </Query>
  );
}

export default GraphqlDataManager;
