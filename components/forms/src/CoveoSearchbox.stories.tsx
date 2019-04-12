import React from 'react';
import { storiesOf } from '@storybook/react';

import { Box } from 'zbase';

import CoveoSearch from './CoveoSearch';
import CoveoSearchbox from './CoveoSearchbox';

storiesOf('CoveoSearchbox', module).add('default', () => (
  <Box p={10} bg="grayscale.white">
    <CoveoSearchbox url="search" initSearchbox />
  </Box>
));

storiesOf('CoveoSearchbox', module).add('external component', () => (
  <Box p={20} bg="grayscale.white">
    <CoveoSearchbox
      ref={ref => {
        window['CoveoSearchbox'] = ref;
      }}
    />
    <br />
    <CoveoSearch />
  </Box>
));
