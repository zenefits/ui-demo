import React from 'react';

import { Box, Flex } from 'zbase';
import { styled } from 'z-frontend-theme';
import { zIndex } from 'z-frontend-theme/utils';

import { AppContentContainerFlex } from './AppContentContainer';

const AbsoluteNav = styled(Box)`
  position: fixed;
  height: 48px;
  left: 0;
  right: 0;
  top: 64px;
  z-index: ${zIndex('fixed')};
  box-shadow: 0 2px 6px 0 rgba(18, 52, 102, 0.1);
`;

const AbsoluteNavPlaceholder = styled(Box)`
  height: 48px;
`;

export default ({ children }) => (
  <AbsoluteNavPlaceholder>
    <AbsoluteNav bg="grayscale.white">
      <AppContentContainerFlex>
        <Flex mx={-3} p={0}>
          {children}
        </Flex>
      </AppContentContainerFlex>
    </AbsoluteNav>
  </AbsoluteNavPlaceholder>
);
