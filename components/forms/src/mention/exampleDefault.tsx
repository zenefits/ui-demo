import React from 'react';

import { TextBlock } from 'zbase';

import Mention from './Mention';

// NOTE: would be nice to reuse these in stories, but sharing props causes issues for react-styleguidist
export default () => (
  <TextBlock>
    Hey <Mention label="Meghan" tooltipText={`Meghan\nmarklesparkle@zenefits.com`} />, can you take a look at this?
  </TextBlock>
);
