import React from 'react';

import { Box, Flex, TextBlock } from '../index';

export default () => (
  <Flex wrap mx={-2}>
    <Box px={2} py={2} width={1 / 2}>
      <TextBlock p={1} color="grayscale.white" bg="primary.a">
        1/2
      </TextBlock>
    </Box>
    <Box px={2} py={2} width={1 / 2}>
      <TextBlock p={1} color="grayscale.white" bg="primary.a">
        1/2
      </TextBlock>
    </Box>
    <Box px={2} py={2} width={1 / 3}>
      <TextBlock p={1} color="grayscale.white" bg="secondary.a">
        1/3
      </TextBlock>
    </Box>
    <Box px={2} py={2} width={1 / 3}>
      <TextBlock p={1} color="grayscale.white" bg="secondary.a">
        1/3
      </TextBlock>
    </Box>
    <Box px={2} py={2} width={1 / 3}>
      <TextBlock p={1} color="grayscale.white" bg="secondary.a">
        1/3
      </TextBlock>
    </Box>
    <Box px={2} py={2} width={1 / 4}>
      <TextBlock p={1} color="grayscale.white" bg="tertiary.a">
        1/4
      </TextBlock>
    </Box>
    <Box px={2} py={2} width={1 / 4}>
      <TextBlock p={1} color="grayscale.white" bg="tertiary.a">
        1/4
      </TextBlock>
    </Box>
    <Box px={2} py={2} width={1 / 4}>
      <TextBlock p={1} color="grayscale.white" bg="tertiary.a">
        1/4
      </TextBlock>
    </Box>
    <Box px={2} py={2} width={1 / 4}>
      <TextBlock p={1} color="grayscale.white" bg="tertiary.a">
        1/4
      </TextBlock>
    </Box>
  </Flex>
);
