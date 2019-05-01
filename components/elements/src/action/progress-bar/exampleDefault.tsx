import React from 'react';

import { Box, TextBlock } from 'zbase';

import ProgressBar from './ProgressBar';

const completed = 20;
const total = 100;
export default () => (
  <Box>
    <ProgressBar value={completed} max={total} />
    <TextBlock mt={1} fontStyle="paragraphs.s" color="text.light">
      {completed} of {total} Completed
    </TextBlock>
  </Box>
);
