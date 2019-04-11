import React from 'react';
import { storiesOf } from '@storybook/react';

import { Box } from 'zbase';

import CoveoSearch from './CoveoSearch';

storiesOf('CoveoSearch', module).add('default', () => (
  <Box p={20} bg="grayscale.white">
    <CoveoSearch organizationId="searchuisamples" accessToken="xx564559b1-0045-48e1-953c-3addd1ee4457" />
  </Box>
));
