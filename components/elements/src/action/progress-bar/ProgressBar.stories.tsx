import React from 'react';

import { Box, TextBlock } from 'zbase';

import { storiesOf } from '../../../.storybook/storyHelpers';
import ProgressBar from './ProgressBar';

const completed = 6;
const total = 10;

storiesOf('elements|ProgressBar', module)
  .addDecorator((getStory: Function) => (
    <Box p={20} w={[1, 1 / 2]} bg="grayscale.white">
      {getStory()}
    </Box>
  ))
  .add('default', () => <ProgressBar value={50} max={100} />)
  .add('util props', () => <ProgressBar value={50} max={100} color="tertiary.a" bg="tertiary.c" w={300} />)
  .add('with label', () => (
    <Box>
      <ProgressBar value={completed / total} />
      <TextBlock mt={2}>
        {completed} of {total} Completed
      </TextBlock>
    </Box>
  ));
