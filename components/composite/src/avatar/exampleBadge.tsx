import React from 'react';

import { Box, Flex } from 'zbase';

import Avatar from './Avatar';

export default () => (
  <Flex align="flex-end" justify="space-between" w={150}>
    <Box>
      <Avatar firstName="Ronald" lastName="McDonald" s="xsmall" badge="contingent" />
    </Box>
    <Box>
      <Avatar firstName="Ronald" lastName="McDonald" s="small" badge="contingent" />
    </Box>
    <Box>
      <Avatar firstName="Ronald" lastName="McDonald" s="medium" badge="contingent" />
    </Box>
    <Box>
      <Avatar firstName="Ronald" lastName="McDonald" s="large" badge="contingent" />
    </Box>
    <Box>
      <Avatar firstName="Ronald" lastName="McDonald" s="xlarge" badge="contingent" />
    </Box>
    <Box>
      <Avatar firstName="Ronald" lastName="McDonald" s="xxlarge" badge="contingent" />
    </Box>
    <Box>
      <Avatar firstName="Ronald" lastName="McDonald" s="xxxlarge" badge="contingent" />
    </Box>
  </Flex>
);
