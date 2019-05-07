import React from 'react';
import { storiesOf } from '../.storybook/storyHelpers';

import { Box } from 'zbase';

import CoveoDeflection from './CoveoDeflection';

storiesOf('forms|CoveoDeflection', module)
  .addDecorator((getStory: Function) => (
    <Box p={20} w={[1, 1/2]} bg="grayscale.white">
      {getStory()}
    </Box>
  ))
  .add('default', () => <CoveoDeflection />);