import React from 'react';

import { Box, TextBlock } from 'zbase';

import Banner from './Banner';

export default () => (
  <Box>
    <Box m={3}>
      <TextBlock fontStyle="headings.s">Success:</TextBlock>
      <Banner type="success">Success! Great job.</Banner>
    </Box>
    <Box m={3}>
      <TextBlock fontStyle="headings.s">Info:</TextBlock>
      <Banner type="info">Here's some super useful information.</Banner>
    </Box>
    <Box m={3}>
      <TextBlock fontStyle="headings.s">Error:</TextBlock>
      <Banner type="error">Something went wrong.</Banner>
    </Box>
  </Box>
);
