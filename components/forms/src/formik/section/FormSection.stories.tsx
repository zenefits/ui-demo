import React from 'react';

import { Box } from 'zbase';

import { storiesOf } from '../../../.storybook/storyHelpers';
import DefaultExample from './exampleDefault';
import CardExample from './exampleCard';
import HiddenExample from './exampleHidden';

storiesOf('forms|Form.Section', module)
  .addDecorator((getStory: Function) => (
    <Box p={20} w={[1, 1 / 2]} bg="grayscale.white">
      {getStory()}
    </Box>
  ))
  .add('basic', DefaultExample)
  .add('visually hidden heading', HiddenExample)
  .add('in card', CardExample);
