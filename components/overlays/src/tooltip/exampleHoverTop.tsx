import React from 'react';

import { Box, Icon, TextBlock } from 'zbase';

import Tooltip from './Tooltip';

export default () => (
  <Box>
    <Tooltip event="hover" placement="top" showArrow targetBody={<Icon iconName="help-outline" />}>
      <TextBlock p={10}>Tooltip content</TextBlock>
    </Tooltip>
  </Box>
);
