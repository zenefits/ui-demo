import React from 'react';

import { Box } from 'zbase';

import { storiesOf } from '../../.storybook/storyHelpers';
import SimpleSelectDisplay from './SimpleSelectDisplay';

storiesOf('forms|SimpleSelectDisplay', module)
  .addDecorator((getStory: Function) => (
    <Box p={20} w={[1, 1 / 2]} bg="grayscale.white">
      {getStory()}
    </Box>
  ))
  .add('with value', () => <SimpleSelectDisplay value="Apple" />);
