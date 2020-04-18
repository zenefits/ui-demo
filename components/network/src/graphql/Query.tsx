import React, { Component } from 'react';
// eslint-disable-next-line zenefits-custom-rules/import-filter
import { OperationVariables, Query, QueryComponentOptions as ApolloQueryProps } from 'react-apollo';
import { ApolloError } from 'apollo-client';

import GraphqlErrorDisplay from './GraphqlErrorDisplay';
import GraphqlLoadingDisplay from './GraphqlLoadingDisplay';

export type QueryProps<TData, TVariables = OperationVariables> = ApolloQueryProps<TData, TVariables> & {
  /** Can this query be made in the background? (not necessary for page load) */
  isBackgroundQuery?: boolean;

  /**
   * Show spinner while query is loading
   * @default true
   */
  handleLoading?: boolean;
  /** Custom JSX to be rendered during loading state (instead of default spinner) */
  renderLoading?: (originalProps?: any) => React.ReactNode;
  /**
   * Whether to show an inline loading spinner instead of one centered on the window
   * @default false
   */
  showInlineLoading?: boolean;

  /**
   * Show error message if query results in an error
   * @default true
   */
  handleError?: boolean;
  /** Custom JSX to be rendered during error state */
  renderError?: (error: ApolloError, originalProps?: any) => React.ReactNode;
};

export default class QueryWithProgress<TData, TVariables = OperationVariables> extends Component<
  QueryProps<TData, TVariables>
> {
  static defaultProps = {
    isBackgroundQuery: false,
    handleLoading: true,
    handleError: true,
  };

  render() {
    const {
      handleLoading,
      renderLoading,
      showInlineLoading,
      handleError,
      renderError,
      children,
      skip,
      isBackgroundQuery,
      ...queryProps
    } = this.props;

    const context = isBackgroundQuery ? { headers: { 'IS-BACKGROUND-QUERY': true } } : {};
    return (
      <Query<TData, TVariables>
        skip={skip}
        context={context}
        {...(queryProps as JSX.LibraryManagedAttributes<typeof Query, typeof queryProps>)}
      >
        {props => {
          if (skip) {
            return children(props);
          }
          if (handleLoading && props.loading) {
            return (
              <GraphqlLoadingDisplay
                showInlineLoading={showInlineLoading}
                renderLoading={renderLoading}
                originalProps={{
                  data: props,
                }}
              />
            );
          }
          if (handleError && props.error) {
            return (
              <GraphqlErrorDisplay
                error={props.error}
                renderError={renderError}
                originalProps={{
                  data: props,
                }}
              />
            );
          }

          return children(props);
        }}
      </Query>
    );
  }
}
