import React from 'react';

import { Box, Flex } from '../index';

export default () => (
  <Flex>
    <Box width={1 / 2} p={1} color="grayscale.white" bg="primary.a">
      1/2
    </Box>
    <Box width={1 / 2} p={1} color="grayscale.white" bg="secondary.a">
      1/2
    </Box>
  </Flex>
);
