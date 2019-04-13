import React from 'react';

import { Box, Flex } from 'zbase';

import Avatar from './Avatar';

const logoUrl = 'https://secure.zenefits.com/static/img/rebranding/zenefits-logo-header-pink.svg';
export default () => (
  <Flex align="flex-end" justify="space-between" w={150}>
    <Box>
      <Avatar photoUrl={logoUrl} firstName="Zenefits" lastName=" " s="small" isSquare imageFit="contain" />
    </Box>
    <Box>
      <Avatar photoUrl={logoUrl} firstName="Zenefits" lastName=" " s="medium" isSquare imageFit="contain" />
    </Box>
    <Box>
      <Avatar photoUrl={logoUrl} firstName="Zenefits" lastName=" " s="large" isSquare imageFit="contain" />
    </Box>
  </Flex>
);
