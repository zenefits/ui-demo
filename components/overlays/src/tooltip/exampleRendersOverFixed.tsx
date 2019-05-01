import React from 'react';

import { Box, Icon, TextBlock } from 'zbase';
import { styled } from 'z-frontend-theme';
import { depth, zIndex } from 'z-frontend-theme/utils';

import Tooltip from './Tooltip';

const FixedContainer = styled(Box)`
  position: fixed;
  height: 48px;
  left: 0;
  right: 0;
  z-index: ${zIndex('fixed')};
  box-shadow: ${depth(2)};
`;

export default () => (
  <Box>
    <>
      <FixedContainer p={1} bg="grayscale.f">
        <TextBlock>Fixed contend</TextBlock>
      </FixedContainer>
      <Box pt={75}>
        <Tooltip event="hover" showPopover placement="top" showArrow targetBody={<Icon iconName="help-outline" />}>
          <TextBlock p={10}>Tooltip content</TextBlock>
        </Tooltip>
      </Box>
    </>
  </Box>
);
