import React, { Component } from 'react';
/* tslint:disable:import-filter */
import { OperationVariables, Query, QueryProps as ApolloQueryProps } from 'react-apollo';

import { GraphqlProgress, Params as GraphqlProgressParams } from './withGraphqlProgress';

export type QueryProps<TData, TVariables = OperationVariables> = ApolloQueryProps<TData, TVariables> & {
  handleGraphqlProgress?: boolean;
  graphqlProgressParams?: GraphqlProgressParams;
};

export default class QueryWithProgress<TData, TVariables = OperationVariables> extends Component<
  QueryProps<TData, TVariables>
> {
  static defaultProps = {
    handleGraphqlProgress: true,
  };

  render() {
    const { handleGraphqlProgress, graphqlProgressParams, children, skip, ...queryProps } = this.props;
    return (
      <Query<TData, TVariables> {...queryProps}>
        {props =>
          handleGraphqlProgress && !skip ? (
            <GraphqlProgress data={props} params={graphqlProgressParams}>
              {() => children(props)}
            </GraphqlProgress>
          ) : (
            children(props)
          )
        }
      </Query>
    );
  }
}
