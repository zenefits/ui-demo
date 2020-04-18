import React, { ReactNode } from 'react';

import { Box, Flex, FlexProps } from 'zbase';
import { styled } from 'z-frontend-theme';
import { color, px, zIndex } from 'z-frontend-theme/utils';

import { AppContentContainerFlex } from '../../AppContentContainer';

type TopNavContainerProps = {
  hasShadow?: boolean;
  isFullWidth?: boolean;
  leftColumn: ReactNode;
  rightColumn?: ReactNode;
  hasBannerAbove?: boolean;
};

export const AbsoluteNavPlaceholder = styled(Box)`
  height: ${props => px(props.theme.topNavHeightInPx)};
`;

export const AbsoluteNav = styled(Flex)<FlexProps & { hasShadow?: boolean; hasBannerAbove?: boolean }>`
  position: fixed;
  height: ${props => px(props.theme.topNavHeightInPx)};
  left: 0;
  right: 0;
  top: ${props => (props.hasBannerAbove ? px(props.theme.topNavHeightInPx) : 0)};
  /* top padding, to match ember top nav vertical alignment */
  border-top: 2px solid ${color('grayscale.white')};
  z-index: ${props => 1 + zIndex('sticky')(props)};
  background-color: ${color('grayscale.white')};
  color: ${color('secondary.a')};
  box-shadow: ${props => (props.hasShadow ? '0 2px 6px 0 rgba(18, 52, 102, 0.1)' : '')};
`;

const TopNavBarContainer: React.FunctionComponent<TopNavContainerProps> = ({
  hasShadow,
  isFullWidth,
  leftColumn,
  rightColumn,
  hasBannerAbove,
}) => {
  return (
    <AbsoluteNavPlaceholder>
      <AbsoluteNav hasShadow={hasShadow} hasBannerAbove={hasBannerAbove}>
        <AppContentContainerFlex
          w={1}
          align="center"
          justify="space-between"
          isFullWidth={isFullWidth}
          data-testid="TopNavBar"
        >
          {leftColumn}
          {rightColumn}
        </AppContentContainerFlex>
      </AbsoluteNav>
    </AbsoluteNavPlaceholder>
  );
};

export default TopNavBarContainer;
