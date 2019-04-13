import React from 'react';

import { Box } from 'zbase';

import Ellipsis from './Ellipsis';

export default () => (
  <Box w={200} border p={2}>
    <Ellipsis mb={2}>The quick brown fox.</Ellipsis>
    <Ellipsis>The quick brown fox jumped over the lazy dog.</Ellipsis>
  </Box>
);
