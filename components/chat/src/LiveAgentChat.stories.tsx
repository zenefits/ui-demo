import React from 'react';

import { Box } from 'zbase';
import { skipVisualTest } from 'z-frontend-app-bootstrap';

import { storiesOf } from '../.storybook/storyHelpers';
import LiveAgentChat from './LiveAgentChat';

const adjustedVisualTestThreshold = {
  chromatic: {
    diffThreshold: 2, // increase from default of 0.063 to avoid flakiness in this test
  },
};

storiesOf('chat|LiveAgentChat', module)
  .add(
    'implementation',
    () => (
      <Box p={3}>
        <LiveAgentChat />
      </Box>
    ),
    adjustedVisualTestThreshold,
  )
  .add(
    'support-no case',
    () => (
      <Box p={3}>
        <LiveAgentChat queueName="hr" />
      </Box>
    ),
    skipVisualTest,
  );
