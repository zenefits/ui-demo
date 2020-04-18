import React from 'react';

import { Box } from 'zbase';

import { storiesOf } from '../../../.storybook/storyHelpers';
import DefaultExample from './exampleDefault';
import OptionalLabelExample from './exampleOptionalLabel';

storiesOf('forms|FormTimeRange', module)
  .addDecorator((getStory: Function) => (
    <Box p={20} w={[1, 1 / 2]} bg="grayscale.white">
      {getStory()}
    </Box>
  ))
  .add('default', DefaultExample)
  .add('optional label', OptionalLabelExample);
