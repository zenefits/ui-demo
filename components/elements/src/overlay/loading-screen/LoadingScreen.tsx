import React from 'react';

import { styled } from 'z-frontend-theme';
import { Flex, FlexProps, TextBlock } from 'zbase';

import { LoadingSpinner } from '../../../index';

type LoadingScreenProps = FlexProps & {
  /** Optional text to show below the loading spinner */
  loadingText?: string;
};

const StyledContainer = styled(Flex)`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

/**
 * A simple component to represent loading page content.
 */
class LoadingScreen extends React.Component<LoadingScreenProps> {
  render() {
    const { loadingText, ...rest } = this.props;

    return (
      <StyledContainer column align="center" {...rest}>
        <LoadingSpinner s="xlarge" />
        {loadingText && <TextBlock mt={3}>{loadingText}</TextBlock>}
      </StyledContainer>
    );
  }
}

export default LoadingScreen;
