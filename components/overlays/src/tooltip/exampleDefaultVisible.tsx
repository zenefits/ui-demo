import React from 'react';

import { Box, Icon, TextBlock } from 'zbase';

import Tooltip from './Tooltip';

export default () => (
  <Box>
    <Tooltip event="click" showPopover placement="top" showArrow targetBody={<Icon iconName="help-outline" />}>
      <TextBlock p={10}>Tooltip content</TextBlock>
    </Tooltip>
  </Box>
);
