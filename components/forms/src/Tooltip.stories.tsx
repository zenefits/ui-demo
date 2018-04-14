import React from 'react';
import { storiesOf } from '@storybook/react';

import { Box, Flex, Icon, P } from 'zbase';

import Tooltip from './Tooltip';

function makeTooltip(label) {
  return <P p={10}>{label}</P>;
}

function makeTargetBody() {
  return <Icon iconName="help-outline" />;
}

storiesOf('Tooltip', module).add('default', () => (
  <Flex>
    <P my={10}> Hover the Icon to see the tooltip </P>

    <Box m={80}>
      <Tooltip event="hover" placement="top" showArrow targetBody={makeTargetBody()}>
        {makeTooltip('top')}
      </Tooltip>
    </Box>
    <Box m={80}>
      <Tooltip event="hover" placement="left" showArrow targetBody={makeTargetBody()}>
        {makeTooltip('left')}
      </Tooltip>
    </Box>
    <Box m={80}>
      <Tooltip event="hover" placement="right" showArrow targetBody={makeTargetBody()}>
        {makeTooltip('right')}
      </Tooltip>
    </Box>
    <Box m={80}>
      <Tooltip event="hover" placement="bottom" showArrow targetBody={makeTargetBody()}>
        {makeTooltip('bottom')}
      </Tooltip>
    </Box>
  </Flex>
));
