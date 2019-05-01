import React from 'react';

import { Box, Flex, TextBlock } from 'zbase';

import Popover from './Popover';

const targetBody = (
  <Box p={10} bg="grayscale.c" color="grayscale.white" w="auto">
    Click to show
  </Box>
);

export default () => (
  <Flex>
    <Box>
      <Popover event="click" showArrow showPopover placement="top" targetBody={targetBody}>
        <TextBlock p={10}>I am a popover... click to hide.</TextBlock>
      </Popover>
    </Box>
  </Flex>
);
