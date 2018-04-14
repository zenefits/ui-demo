import React from 'react';
import { graphql, ChildProps } from 'react-apollo';

import GenericDataManager, { ConfigManagerProps, GenericManagerRenderProps } from './GenericDataManager';
import UrlStateManager, { UrlStateManagerInputProps } from './UrlStateManager';

export declare type DataManagerWithDataProps<T> = GenericManagerRenderProps & ChildProps<{}, T>;

export interface GraphqlDataManagerProps {
  query: any;
  variables?: any;
  children: (gqlManagerProps: DataManagerWithDataProps<any>) => React.ReactNode;
}

// Generic render prop component - Used below to convert an hoc to a render prop
// Ref: https://reactrocket.com/post/turn-your-hocs-into-render-prop-components/
const RenderProp = ({ children, ...props }) => children(props);

// This wrapper generator is a stop-gap till Apollo 2.1 gets integrated into our codebase.
// After that we can just use the Query component and get rid of this function.
const graphqlWrapper = (query, variables, managerProps) => {
  const currentPage = managerProps.paging.currentPage;
  const pageSize = managerProps.paging.pageSize;
  variables.offset = (currentPage - 1) * pageSize;
  variables.first = pageSize;
  const options = () => ({ variables, fetchPolicy: 'cache-and-network' });
  return graphql(query, { options })(RenderProp);
};

export class GraphqlDataManager extends React.Component<
  GraphqlDataManagerProps & { configManager: ConfigManagerProps }
> {
  render() {
    return (
      <GenericDataManager configManager={this.props.configManager}>
        {managerProps => {
          const GqlWrapper = graphqlWrapper(this.props.query, this.props.variables || {}, managerProps);
          return <GqlWrapper>{({ data }) => this.props.children({ ...managerProps, data })}</GqlWrapper>;
        }}
      </GenericDataManager>
    );
  }
}

export declare type GraphqlDataManagerWithUrlProps = GraphqlDataManagerProps & UrlStateManagerInputProps;

export class GraphqlDataManagerWithUrl extends React.Component<GraphqlDataManagerWithUrlProps> {
  render() {
    return (
      <UrlStateManager pageSize={this.props.pageSize}>
        {configManager => (
          <GraphqlDataManager configManager={configManager} {...this.props}>
            {this.props.children}
          </GraphqlDataManager>
        )}
      </UrlStateManager>
    );
  }
}
