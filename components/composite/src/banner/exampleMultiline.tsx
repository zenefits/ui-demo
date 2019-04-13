import React from 'react';

import { Box, TextBlock } from 'zbase';

import Banner from './Banner';

export default () => (
  <Box w={500}>
    <Box m={3}>
      <TextBlock fontStyle="headings.s">Multiline with close:</TextBlock>
      <Banner type="info">
        SLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua.
      </Banner>
    </Box>
  </Box>
);
