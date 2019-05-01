import React from 'react';

import { Box } from 'zbase';

import { storiesOf } from '../.storybook/storyHelpers';
import LiveAgentChat from './LiveAgentChat';

storiesOf('chat|LiveAgentChat', module)
  .add('implementation', () => (
    <Box p={3}>
      <LiveAgentChat />
    </Box>
  ))
  .add('support-no case', () => (
    <Box p={3}>
      <LiveAgentChat queueName="hr" />
    </Box>
  ));
