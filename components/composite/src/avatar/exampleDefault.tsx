import React from 'react';

import { Box, Flex } from 'zbase';

import Avatar from './Avatar';

export default () => (
  <Flex align="flex-end" justify="space-between">
    <Box>
      <Avatar firstName="Ronald" lastName="McDonald" s="xsmall" />
    </Box>
    <Box>
      <Avatar firstName="Ronald" lastName="McDonald" s="small" />
    </Box>
    <Box>
      <Avatar firstName="Ronald" lastName="McDonald" s="medium" />
    </Box>
    <Box>
      <Avatar firstName="Ronald" lastName="McDonald" s="large" />
    </Box>
    <Box>
      <Avatar firstName="Ronald" lastName="McDonald" s="xlarge" />
    </Box>
    <Box>
      <Avatar firstName="Ronald" lastName="McDonald" s="xxlarge" />
    </Box>
    <Box>
      <Avatar firstName="Ronald" lastName="McDonald" s="xxxlarge" />
    </Box>
  </Flex>
);
