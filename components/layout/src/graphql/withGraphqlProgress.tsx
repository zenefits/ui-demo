import React, { Component, ComponentClass, ReactNode, StatelessComponent } from 'react';
import { withRouter } from 'react-router-dom';

import { Box, Flex, FlexProps, TextBlock } from 'zbase';
import { styled } from 'z-frontend-theme';
import { LoadingSpinner } from 'z-frontend-elements';

import LoadingScreen from '../loading-screen/LoadingScreen';

const StyledContainer = styled<FlexProps>(Flex)`
  align-items: center;
  justify-content: center;
  flex-direction: column;
  flex: 1;
`;

export interface Params {
  /**
   * Whether to show a inline loading spinner or a loading spinner centered on the window
   */
  showInlineLoading?: boolean;
  /**
   * Specify custom JSX to be rendered during loading state
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
  data: { loading: boolean; error?: any };
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
      if (params.renderError) {
        const customErrorScreen = params.renderError(error, this.props);
        if (customErrorScreen) {
          return customErrorScreen;
        }
      }
      return (
        <Box>
          <TextBlock color="text.default">{error.message}</TextBlock>
        </Box>
      );
    }
    return this.props.children();
  }
}

export const GraphqlProgress = withRouter(GraphqlProgressBase);

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
