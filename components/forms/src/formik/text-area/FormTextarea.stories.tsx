import React from 'react';

import { Box } from 'zbase';

import { storiesOf } from '../../../.storybook/storyHelpers';
import DefaultExample from './exampleDefault';
import LabelExample from './exampleLabel';
import ValueExample from './exampleValue';
import ValidationExample from './exampleValidation';

storiesOf('forms|Form.Textarea', module)
  .addDecorator((getStory: Function) => (
    <Box p={20} w={[1, 1 / 2]} bg="grayscale.white">
      {getStory()}
    </Box>
  ))
  .add('basic textarea', DefaultExample)
  .add('with label', LabelExample)
  .add('with initial value', ValueExample)
  .add('with validation', ValidationExample);
