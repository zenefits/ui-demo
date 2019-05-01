import React from 'react';

import { Box } from 'zbase';

import { storiesOf } from '../../../.storybook/storyHelpers';
import ExampleOneButton from './exampleOneButton';
import ExampleTwoButtons from './exampleTwoButtons';
import ExampleThreeButtons from './exampleThreeButtons';
import ExampleButtonsWithLinks from './exampleButtonsWithLinks';
import ExampleUtilProps from './exampleUtilProps';

storiesOf('elements|ButtonGroup', module)
  .addDecorator((getStory: Function) => (
    <Box p={20} w={[1, 2 / 3]} bg="grayscale.white">
      {getStory()}
    </Box>
  ))
  .add('default', ExampleOneButton)
  .add('two buttons', ExampleTwoButtons)
  .add('three buttons', ExampleThreeButtons)
  .add('button.link', ExampleButtonsWithLinks)
  .add('util props', ExampleUtilProps);
