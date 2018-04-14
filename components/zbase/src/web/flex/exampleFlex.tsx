import React from 'react';

import { Box, Flex } from '../index';

export default () => (
  <Flex>
    <Box bg="grayscale.d" p={2} flex="2">
      grows (2)
    </Box>
    <Box bg="grayscale.e" p={2} flex="none">
      static
    </Box>
    <Box bg="grayscale.f" p={2} flex="1 1 0%">
      grows (1)
    </Box>
  </Flex>
);
