import React from 'react';
import { storiesOf } from '@storybook/react';

import { Box } from 'zbase';

import CoveoSearch from './CoveoSearch';
import CoveoSearchbox from './CoveoSearchbox';

storiesOf('CoveoSearchbox', module).add('default', () => (
  <Box p={10} bg="grayscale.white">
    <CoveoSearchbox
      organizationId="searchuisamples"
      accessToken="xx564559b1-0045-48e1-953c-3addd1ee4457"
      url="search"
      initSearchbox
    />
  </Box>
));

storiesOf('CoveoSearchbox', module).add('external component', () => (
  <Box p={20} bg="grayscale.white">
    <CoveoSearchbox
      organizationId="searchuisamples"
      accessToken="xx564559b1-0045-48e1-953c-3addd1ee4457"
      ref={ref => {
        window['CoveoSearchbox'] = ref;
      }}
    />
    <br />
    <CoveoSearch organizationId="searchuisamples" accessToken="xx564559b1-0045-48e1-953c-3addd1ee4457" />
  </Box>
));
