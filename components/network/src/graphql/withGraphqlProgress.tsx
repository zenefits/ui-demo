import React, { Component, ComponentClass, ReactNode, StatelessComponent } from 'react';
import { withRouter } from 'react-router-dom';
import { ApolloError } from 'apollo-client';

import { Flex } from 'zbase';
import { styled } from 'z-frontend-theme';
import { LoadingScreen, LoadingSpinner } from 'z-frontend-elements';

import GraphqlErrorDisplay from './GraphqlErrorDisplay';

const StyledContainer = styled(Flex)`
  align-items: center;
  justify-content: center;
  flex-direction: column;
  flex: 1;
`;

export interface Params {
  /**
   * Whether to show an inline loading spinner instead of one centered on the window
   * @default false
   */
  showInlineLoading?: boolean;
  /**
   * Specify custom JSX to be rendered during loading state
   * If the function returns a falsy value, it will still fall back to LoadingScreen or inline loading spinner.
   */
  renderLoading?: (originalProps?: any) => React.ReactNode;
  /**
   * Specify custom JSX to be rendered during error state
   */
  renderError?: (error: any, originalProps?: any) => React.ReactNode;
}

interface LoadingDataProps {
  // This prop object structure matches that provided by the Apollo HOC

  // Note that the data property provided to Apollo Query component's render function
  // is actually a sibling of the loading and error properties, not its parent
  data: { loading: boolean; error?: ApolloError };
}

type AllProps = LoadingDataProps & {
  children: () => ReactNode;
  params?: Params;
};

class GraphqlProgressBase extends Component<AllProps> {
  render() {
    const {
      data: { loading, error },
      params = {},
    } = this.props;

    if (loading) {
      if (params.renderLoading) {
        const customLoadingScreen = params.renderLoading(this.props);
        if (customLoadingScreen) {
          return customLoadingScreen;
        }
      }
      return params.showInlineLoading ? (
        <StyledContainer>
          <LoadingSpinner s="large" />
        </StyledContainer>
      ) : (
        <LoadingScreen />
      );
    } else if (error) {
      return <GraphqlErrorDisplay error={error} renderError={params.renderError} originalProps={this.props} />;
    }
    return this.props.children();
  }
}

export const GraphqlProgress = withRouter(GraphqlProgressBase);

/** @deprecated Use <Query> instead */
const withGraphqlProgress = (params: Params = {}) => {
  return function withGraphqlProgress<WrappedComponentProps>(WrappedComponent: ComponentClass | StatelessComponent) {
    type OwnProps = WrappedComponentProps & LoadingDataProps;

    class LoadingWrapper extends Component<OwnProps> {
      static displayName = `GraphqlProgress(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

      render() {
        return (
          <GraphqlProgress {...this.props} params={params}>
            {() => <WrappedComponent {...this.props} />}
          </GraphqlProgress>
        );
      }
    }

    return LoadingWrapper;
  };
};

export default withGraphqlProgress;
