import React, { Component } from 'react';

import { keyframes, styled } from 'z-frontend-theme';
import { radius } from 'z-frontend-theme/utils';
import { Box, BoxProps } from 'zbase';

const baseColor = '#DDD';
const highlightColor = '#EEE'; // our grayscale is not quite granular enough

const shimmer = keyframes`
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: calc(200px + 100%) 0;
  }
`;

const StyledSkeleton = styled(Box)<SkeletonProps>`
  background-color: ${baseColor};
  background-image: linear-gradient(90deg, ${baseColor}, ${highlightColor}, ${baseColor});
  background-size: 200px 100%;
  background-repeat: no-repeat;
  border-radius: ${props => (props.isCircle ? '50%;' : radius()(props))};
  display: inline-block;
  line-height: inherit;
  animation: ${shimmer} 1.2s ease-in-out infinite;
`;

type SkeletonProps = {
  'aria-label': string;
  isCircle?: boolean;
} & BoxProps;

export default class Skeleton extends Component<SkeletonProps> {
  static defaultProps = {
    width: '100%',
    'aria-label': 'Loading...',
  };

  render() {
    return <StyledSkeleton {...this.props}>&zwnj;</StyledSkeleton>;
  }
}
