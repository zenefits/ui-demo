import React from 'react';

import { Box } from 'zbase';

import Button from './Button';

export default () => (
  <Box>
    <Button disabled mr={3}>
      Click me - disabled
    </Button>
    <Button inProgress>Click me - inProgress</Button>
  </Box>
);
