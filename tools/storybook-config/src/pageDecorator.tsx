import React from 'react';

import { Box } from 'zbase';

export function paddedBox(getStory: Function) {
  return (
    <Box p={3} w={1} bg="grayscale.white">
      {getStory()}
    </Box>
  );
}
