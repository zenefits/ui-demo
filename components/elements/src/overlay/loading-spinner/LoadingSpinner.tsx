import React from 'react';

import { Box, BoxProps } from 'zbase';
import { color, heights } from 'z-frontend-theme/utils';
import { keyframes, styled } from 'z-frontend-theme';

export type LoadingSpinnerSize = 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge' | 'xxlarge'; // TODO: make common

export type LoadingSpinnerProps = BoxProps & {
  /** the size of the button; omit for 100% */
  s?: LoadingSpinnerSize;
};

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
`;

const StyledBox = styled<LoadingSpinnerProps>(Box)`
  display: inline-block;
  height: ${props => (props.s ? heights(props.s) : '100%')};
  width: ${props => (props.s ? heights(props.s) : '100%')};
  border: 2px solid ${color('secondary.a')};
  border-top-color: ${color('secondary.a', 0.15)};
  border-left-color: ${color('secondary.a', 0.15)};
  border-radius: 50%;
  animation: ${spin} 1s infinite linear;
`;

class LoadingSpinner extends React.Component<LoadingSpinnerProps> {
  render() {
    return <StyledBox {...this.props} />;
  }
}

export default LoadingSpinner;
