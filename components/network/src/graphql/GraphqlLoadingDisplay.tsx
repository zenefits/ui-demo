import React, { Component } from 'react';

import { Flex } from 'zbase';
import { styled } from 'z-frontend-theme';
import { LoadingScreen, LoadingSpinner } from 'z-frontend-elements';

const StyledContainer = styled(Flex)`
  align-items: center;
  justify-content: center;
  flex-direction: column;
  flex: 1;
`;

type GraphqlLoadingDisplayProps = {
  /** Custom JSX to be rendered during loading state (instead of default spinner) */
  renderLoading?: (originalProps?: any) => React.ReactNode;

  /**
   * Whether to show a inline loading spinner instead of a loading spinner centered on the window
   * @default false
   */
  showInlineLoading?: boolean;

  originalProps: any;
};

export default class GraphqlLoadingDisplay extends Component<GraphqlLoadingDisplayProps> {
  render() {
    const { showInlineLoading, renderLoading, originalProps } = this.props;
    if (renderLoading) {
      const customLoadingScreen = renderLoading(originalProps);
      if (customLoadingScreen) {
        return customLoadingScreen;
      }
    }
    return showInlineLoading ? (
      <StyledContainer>
        <LoadingSpinner s="large" />
      </StyledContainer>
    ) : (
      <LoadingScreen data-testid="GraphqlLoadingDisplay" />
    );
  }
}
