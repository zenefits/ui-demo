import React, { Component } from 'react';
// @ts-ignore
import { withViewport } from '@storybook/addon-viewport';

import { Box, Flex, TextBlock } from 'zbase';
import { addScreenshotDelay, setViewports } from 'z-frontend-app-bootstrap';

import { storiesOf } from '../../.storybook/storyHelpers';
import ExampleClickTop from './exampleClickTop';
import ExampleClickRight from './exampleClickRight';
import ExampleOpenByDefault from './exampleOpenByDefault';
import ExampleRendersOverFixed from './exampleRendersOverFixed';
import Popover from './Popover';
import Tooltip from '../tooltip/Tooltip';

const targetBody = (
  <Box p={10} bg="grayscale.c" color="grayscale.white" w="auto">
    Click to show
  </Box>
);

storiesOf('overlays|Popover', module)
  .addDecorator(withViewport())
  .add('click top', () => (
    <Box mx={50} my={75}>
      {ExampleClickTop()}
    </Box>
  ))
  .add('click right', () => <Box m={50}>{ExampleClickRight()}</Box>)
  .add('open by default', () => (
    <Box mx={50} my={75}>
      {ExampleOpenByDefault()}
    </Box>
  ))
  .add(
    'full screen mobile',
    () => (
      <Flex>
        <Box>
          <Popover event="click" showArrow showPopover placement="top" targetBody={targetBody}>
            <TextBlock p={10}>I am a popover... click to hide.</TextBlock>
          </Popover>
        </Box>
      </Flex>
    ),
    setViewports([0]),
  )
  .add('renders over other positioned elements', ExampleRendersOverFixed, addScreenshotDelay)
  .add('popover containing a tooltip (not recommended)', () => <PopoverPlusTooltipExample />, addScreenshotDelay);

class PopoverPlusTooltipExample extends Component {
  render() {
    return (
      <Box p={100} w={500}>
        <Popover event="click" showArrow showPopover placement="bottom" targetBody={targetBody}>
          <Box p={20}>
            <TextBlock>This is a popover.</TextBlock>
            <Tooltip
              event="hover"
              showArrow
              showPopover
              placement="left"
              targetBody={<TextBlock>Jan 12-28, 2019</TextBlock>}
            >
              <TextBlock p={10}>In Progress</TextBlock>
            </Tooltip>
            <Tooltip
              event="hover"
              showArrow
              showPopover
              placement="right"
              targetBody={<TextBlock>Jan 29-30, 2019</TextBlock>}
            >
              <TextBlock p={10}>Future</TextBlock>
            </Tooltip>
          </Box>
        </Popover>
      </Box>
    );
  }
}
