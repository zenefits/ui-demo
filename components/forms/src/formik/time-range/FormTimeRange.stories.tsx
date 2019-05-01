import React from 'react';

import { Box } from 'zbase';

import { storiesOf } from '../../../.storybook/storyHelpers';
import DefaultExample from './exampleDefault';
import OptionalLabelExample from './exampleOptionalLabel';

storiesOf('forms|Form.TimeRange', module)
  .addDecorator((getStory: Function) => (
    <Box p={20} w={[1, 1 / 2]} bg="grayscale.white">
      {getStory()}
    </Box>
  ))
  .add('basic input', DefaultExample)
  .add('optional label', OptionalLabelExample);
