import React, { Component } from 'react';
import { ApolloError } from 'apollo-client';

import { Box, TextBlock } from 'zbase';

type GraphqlErrorDisplayProps = {
  /** Graphql error to be handled */
  error: ApolloError;
  /** Custom JSX to be rendered during error state */
  renderError?: (error: ApolloError, originalProps?: any) => React.ReactNode;

  originalProps: any;
};

export default class GraphqlErrorDisplay extends Component<GraphqlErrorDisplayProps> {
  render() {
    const { error, renderError, originalProps } = this.props;
    if (renderError) {
      const customErrorScreen = renderError(error, originalProps);
      if (customErrorScreen !== undefined) {
        return customErrorScreen;
      }
    }

    console.error('GraphqlProgressBase:', error);
    return (
      <Box>
        <TextBlock color="text.default" className="js-walkme-graphql-error-message">
          Sorry, something went wrong. Please try again later.
        </TextBlock>
      </Box>
    );
  }
}
