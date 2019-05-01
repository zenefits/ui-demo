import React from 'react';

import { Box } from 'zbase';

import { storiesOf } from '../../../.storybook/storyHelpers';
import DefaultExample from './exampleDefault';
import ValueExample from './exampleValue';
import ValidationExample from './exampleValidation';

storiesOf('forms|Form.Checkbox', module)
  .addDecorator((getStory: Function) => (
    <Box p={20} w={[1, 1 / 2]} bg="grayscale.white">
      {getStory()}
    </Box>
  ))
  .add('basic input', DefaultExample)
  .add('with initial value', ValueExample)
  .add('with validation', ValidationExample);
