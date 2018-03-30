import React, { Component, ComponentClass, StatelessComponent } from 'react';
import { Box, Flex, FlexProps, P } from 'zbase';
import { styled } from 'z-frontend-theme';
import LoadingScreen from './LoadingScreen';
import LoadingSpinner from './LoadingSpinner';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

export const onGraphqlErrorAction = 'GRAPHQL_PROGRESS_LOADING_ERROR';

const StyledContainer = styled<FlexProps>(Flex)`
  align-items: center;
  justify-content: center;
  flex-direction: column;
  flex: 1;
`;

interface ConnectProps {
  onGraphqlError: (error: any) => any;
}

interface Params {
  /**
   * Whether to show a inline loading spinner or a loading spinner centered on the window
   */
  showInlineLoading?: boolean;
  renderError?: (error: any) => React.ReactNode;
}

const withGraphqlProgress = (params: Params = {}) => {
  const showInlineLoading = params.showInlineLoading;
  return function withGraphqlProgress<WrappedComponentProps>(WrappedComponent: ComponentClass | StatelessComponent) {
    type OwnProps = WrappedComponentProps & { data: { loading: boolean; error?: any } };

    class LoadingWrapper extends Component<OwnProps & ConnectProps> {
      static displayName = `GraphqlProgress(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

      componentWillReceiveProps(nextProps) {
        if (!this.props.data.error && nextProps.data.error) {
          this.props.onGraphqlError(nextProps.data.error);
        }
      }

      render() {
        const { loading, error } = this.props.data;
        if (loading) {
          return showInlineLoading ? (
            <StyledContainer>
              <LoadingSpinner s="large" />
            </StyledContainer>
          ) : (
            <LoadingScreen />
          );
        } else if (error) {
          if (params.renderError) {
            const customErrorScreen = params.renderError(error);
            if (customErrorScreen) {
              return customErrorScreen;
            }
          }
          return (
            <Box>
              <P color="grayscale.a">{error.message}</P>
            </Box>
          );
        }
        return <WrappedComponent {...this.props} />;
      }
    }

    /**
     * There is an issue with apollo when apollo-link-error stops catching errors for a query if the query errored once,
     * so all following requests errors for that query are not getting into the apollo-link-error handler,
     * and not getting into our ApolloClientOptions.onGraphqlError hook
     *
     * This is a temporary workaround to catch all GraphQL errors from apollo until they fix the issue
     * related JIRA ticket https://jira.inside-zen.com/browse/TLNT-460
     * related apollo issue https://github.com/apollographql/apollo-client/issues/3000
     */
    return withRouter(
      connect<{}, ConnectProps, OwnProps>(null, dispatch => ({
        onGraphqlError(error) {
          dispatch({
            type: onGraphqlErrorAction,
            payload: error,
          });
        },
      }))(LoadingWrapper),
    );
  };
};

export default withGraphqlProgress;
