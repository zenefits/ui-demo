import React from 'react';
import { storiesOf } from '../.storybook/storyHelpers';

import { Box } from 'zbase';

import CoveoFullSearch from './CoveoFullSearch';

storiesOf('forms|CoveoFullSearch', module)
  .addDecorator((getStory: Function) => (
    <Box p={20} w={[1, 1]} bg="grayscale.white">
      {getStory()}
    </Box>
  ))
  .add('default', () => <CoveoFullSearch />);
