import React from 'react';

import { Box } from 'zbase';

import { storiesOf } from '../../../.storybook/storyHelpers';
import ExampleEIN from './exampleEIN';
import ExampleZIP from './exampleZIP';
import OptionalLabelExample from './exampleOptionalLabel';

storiesOf('forms|Form.MaskedInput', module)
  .addDecorator((getStory: Function) => (
    <Box p={20} w={[1, 1 / 2]} bg="grayscale.white">
      {getStory()}
    </Box>
  ))
  .add('EIN input', ExampleEIN)
  .add('ZIP', ExampleZIP)
  .add('optional label', OptionalLabelExample);
