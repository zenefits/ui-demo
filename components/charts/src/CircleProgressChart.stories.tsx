import React from 'react';
import { storiesOf } from '@storybook/react';
import CircleProgressChart from './CircleProgressChart';
import { Box } from 'rebass';

storiesOf('Circle Progress', module).add('default', () => (
  <Box p={3}>
    <CircleProgressChart percentage={0} />
    <CircleProgressChart percentage={1} />
    <CircleProgressChart percentage={25} />
    <CircleProgressChart percentage={99} />
    <CircleProgressChart percentage={100} />
  </Box>
));
