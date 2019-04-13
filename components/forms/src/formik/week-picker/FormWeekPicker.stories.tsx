import React from 'react';

import { Box } from 'zbase';

import { storiesOf } from '../../../.storybook/storyHelpers';
import DefaultExample from './DefaultExample';
import OptionalLabelExample from './exampleOptionalLabel';

storiesOf('forms|Form.WeekPicker', module)
  .addDecorator((getStory: Function) => (
    <Box p={20} w={[1, 2 / 3]} bg="grayscale.white">
      {getStory()}
    </Box>
  ))
  .add('basic week picker', DefaultExample)
  .add('optional label', OptionalLabelExample);
