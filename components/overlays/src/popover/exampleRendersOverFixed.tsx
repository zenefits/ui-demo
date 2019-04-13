import React from 'react';

import { Box, TextBlock } from 'zbase';
import { styled } from 'z-frontend-theme';
import { depth, zIndex } from 'z-frontend-theme/utils';

import Popover from './Popover';

const FixedContainer = styled(Box)`
  position: fixed;
  height: 48px;
  left: 0;
  right: 0;
  z-index: ${zIndex('fixed')};
  box-shadow: ${depth(2)};
`;

const targetBody = (
  <Box p={10} w={150} bg="grayscale.c" textAlign="center" color="grayscale.white">
    Click to show
  </Box>
);

export default () => (
  <Box>
    <>
      <FixedContainer p={1} bg="grayscale.f">
        <TextBlock>Fixed contend</TextBlock>
      </FixedContainer>
      <Box py={75} px={20}>
        <Popover event="click" showPopover placement="top" showArrow targetBody={targetBody}>
          <TextBlock p={10}>Popover content</TextBlock>
        </Popover>
      </Box>
    </>
  </Box>
);
