import React from 'react';

import { Box } from 'zbase';

import Banner from './Banner';

export default () => (
  <Box>
    <Box m={3}>
      <Banner type="success">Success! Great job.</Banner>
    </Box>
    <Box m={3}>
      <Banner type="info">Here's some super useful information.</Banner>
    </Box>
    <Box m={3}>
      <Banner type="error">Something went wrong.</Banner>
    </Box>
  </Box>
);
