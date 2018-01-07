import React from 'react';
import { storiesOf } from '@storybook/react';
import Popover from './Popover';
import { Box, Flex, Text } from 'rebass';

function makeTarget(label) {
  return (
    <Box p={10} bg="lightblue" w="auto">
      {label}
    </Box>
  );
}

function makePopper(action) {
  return <Text p={10}>I am a popover... {action} to hide.</Text>;
}

storiesOf('Popover', module)
  .add('default', () => (
    <Flex>
      <Box m={50}>
        <Popover event="click" showArrow placement="bottom" targetBody={makeTarget('Click me (bottom)')}>
          {makePopper('click')}
        </Popover>
      </Box>
      <Box m={50}>
        <Popover
          event="hover"
          showArrow
          placement="right"
          flip={['right', 'top', 'bottom']}
          targetBody={makeTarget('Hover me')}
        >
          {makePopper('hover away')}
        </Popover>
      </Box>
      <Box mx={50} my={300}>
        <Popover event="click" showArrow placement="top" targetBody={makeTarget('Click me (top)')}>
          {makePopper('click')}
        </Popover>
      </Box>
      <Box mx={50} my={100}>
        <Popover event="click" showArrow placement="left" targetBody={makeTarget('Click me (left)')}>
          {makePopper('click')}
        </Popover>
      </Box>
    </Flex>
  ))
  .add('open by default', () => (
    <Box m={50} w={1 / 5}>
      <Popover event="click" showArrow showPopover placement="bottom" targetBody={makeTarget('Click me')}>
        {makePopper('click')}
      </Popover>
    </Box>
  ));
