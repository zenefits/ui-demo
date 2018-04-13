import React from 'react';

import { Box } from '../index';

export default () => (
  <Box
    p={[
      0, // no padding at smallest breakpoint
      2, // small padding (spacing step 2) at next breakpoint
      4, // medium padding (spacing step 4) at next breakpoint
      6, // large padding (spacing step 6) at final breakpoint
    ]}
    bg="secondary.b"
  >
    Padding depends on viewport size (resize to see in action)
  </Box>
);
