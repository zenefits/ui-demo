import React from 'react';
import { storiesOf } from '@storybook/react';

import { Box } from 'zbase';

import CoveoDeflection from './CoveoDeflection';
import CoveoDeflectionForm from './CoveoDeflectionForm';

const rowStyle = {
  display: 'flex',
};
const columnStyle = {
  flex: '50%',
};

storiesOf('CoveoDeflection', module).add('default', () => (
  <Box p={20} bg="grayscale.white">
    <div>
      <div style={rowStyle}>
        <div style={columnStyle}>
          <CoveoDeflectionForm />
        </div>
        <div style={columnStyle}>
          <CoveoDeflection organizationId="searchuisamples" accessToken="xx564559b1-0045-48e1-953c-3addd1ee4457" />
        </div>
      </div>
    </div>
  </Box>
));
