import React from 'react';

import { Box } from 'zbase';

import Timeline from './Timeline';

export default () => (
  <Box m={5}>
    <Timeline startDate={new Date('1/1/2018')} endDate={new Date('12/31/2018')} valueDate={new Date('7/2/2018')} />
  </Box>
);
