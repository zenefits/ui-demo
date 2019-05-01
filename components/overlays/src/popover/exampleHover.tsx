import React from 'react';

import { Box, Flex, TextBlock } from 'zbase';

import Popover from './Popover';

const targetBody = (
  <Box p={10} bg="grayscale.c" color="grayscale.white" w="auto">
    Hover to show
  </Box>
);

export default () => (
  <Flex>
    <Box>
      <Popover event="hover" showArrow placement="top" flip={['right', 'top', 'bottom']} targetBody={targetBody}>
        <TextBlock p={10}>I am a popover... hover away to hide.</TextBlock>
      </Popover>
    </Box>
  </Flex>
);
