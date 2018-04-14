import React from 'react';

import { Box, Flex } from '../index';

export default () => (
  <Flex style={{ height: 150 }} direction={['column', null, 'row']} justify="center">
    <Box bg="grayscale.d" p={2}>
      item 1
    </Box>
    <Box bg="grayscale.e" p={2}>
      item 2
    </Box>
    <Box bg="grayscale.f" p={2}>
      item 3
    </Box>
  </Flex>
);
