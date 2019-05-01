import React from 'react';

import { Box } from 'zbase';

import { storiesOf } from '../../../.storybook/storyHelpers';
import DefaultExample from './exampleDeprecatedDefault';
import LabelExample from './exampleDeprecatedLabel';
import ValueExample from './exampleDeprecatedValue';
import MultiExample from './exampleDeprecatedMulti';
import ValidationExample from './exampleDeprecatedValidation';

storiesOf('forms|Form.SelectDeprecated', module)
  .addDecorator((getStory: Function) => (
    <Box p={20} w={[1, 1 / 2]} bg="grayscale.white">
      {getStory()}
    </Box>
  ))
  .add('basic select', DefaultExample)
  .add('with label', LabelExample)
  .add('with initial value', ValueExample)
  .add('multi', MultiExample)
  .add('with validation', ValidationExample);
