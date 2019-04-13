import React from 'react';

import { Box } from 'zbase';
import { Link } from 'z-frontend-elements';

import Banner from './Banner';

export default () => (
  <Box>
    <Box m={3}>
      <Banner type="success">
        Success! Great job.&nbsp;<Link>Next task</Link>
      </Banner>
    </Box>
    <Box m={3}>
      <Banner type="info">
        Here's some super useful information.&nbsp;<Link>Learn more</Link>
      </Banner>
    </Box>
    <Box m={3}>
      <Banner type="error">
        Sorry! We weren't able to process your request.&nbsp;<Link>Try again</Link>
      </Banner>
    </Box>
  </Box>
);
