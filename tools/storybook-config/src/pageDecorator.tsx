import React from 'react';

import { Box } from 'zbase';

export function paddedBox(getStory: Function) {
  return paddedSizedBox(1)(getStory);
}

export function paddedSizedBox(width: number | number[], height?: number) {
  return (getStory: Function) => (
    <Box p={3} w={width} height={height} bg="grayscale.white">
      {getStory()}
    </Box>
  );
}
