import React from 'react';

import { Box, Flex } from 'zbase';

import Avatar from './Avatar';

export default () => (
  <Flex align="flex-end" justify="space-between" w={150}>
    <Box>
      <Avatar photoUrl="https://robohash.org/ronald" firstName="Ronald" lastName="McDonald" s="small" />
    </Box>
    <Box>
      <Avatar photoUrl="https://robohash.org/ronald" firstName="Ronald" lastName="McDonald" s="medium" />
    </Box>
    <Box>
      <Avatar photoUrl="https://robohash.org/ronald" firstName="Ronald" lastName="McDonald" s="large" />
    </Box>
  </Flex>
);
