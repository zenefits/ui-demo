import React from 'react';

import { Box, Flex, P } from '../index';

export default () => (
  <Flex wrap mx={-2}>
    <Box px={2} py={2} width={1 / 2}>
      <P p={1} color="grayscale.white" bg="primary.a">
        1/2
      </P>
    </Box>
    <Box px={2} py={2} width={1 / 2}>
      <P p={1} color="grayscale.white" bg="primary.a">
        1/2
      </P>
    </Box>
    <Box px={2} py={2} width={1 / 3}>
      <P p={1} color="grayscale.white" bg="secondary.a">
        1/3
      </P>
    </Box>
    <Box px={2} py={2} width={1 / 3}>
      <P p={1} color="grayscale.white" bg="secondary.a">
        1/3
      </P>
    </Box>
    <Box px={2} py={2} width={1 / 3}>
      <P p={1} color="grayscale.white" bg="secondary.a">
        1/3
      </P>
    </Box>
    <Box px={2} py={2} width={1 / 4}>
      <P p={1} color="grayscale.white" bg="tertiary.a">
        1/4
      </P>
    </Box>
    <Box px={2} py={2} width={1 / 4}>
      <P p={1} color="grayscale.white" bg="tertiary.a">
        1/4
      </P>
    </Box>
    <Box px={2} py={2} width={1 / 4}>
      <P p={1} color="grayscale.white" bg="tertiary.a">
        1/4
      </P>
    </Box>
    <Box px={2} py={2} width={1 / 4}>
      <P p={1} color="grayscale.white" bg="tertiary.a">
        1/4
      </P>
    </Box>
  </Flex>
);
