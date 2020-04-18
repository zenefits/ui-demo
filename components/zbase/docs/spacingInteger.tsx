import React from 'react';

import { Box } from '../index';

const { theme } = require('z-frontend-theme');

export default () => (
  <Box p={3} bg="secondary.b">
    Padding on all sides using step 3 of the spacing scale (ie, {theme.space[3]}px)
  </Box>
);
