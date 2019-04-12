import React from 'react';
import { storiesOf } from '@storybook/react';

import { Box } from 'zbase';

import CoveoSearch from './CoveoSearch';

storiesOf('CoveoSearch', module).add('default', () => (
  <Box p={20} bg="grayscale.white">
    <CoveoSearch />
  </Box>
));
