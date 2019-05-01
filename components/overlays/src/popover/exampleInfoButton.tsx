import React from 'react';

import { Box, TextBlock } from 'zbase';
import { InfoButton } from 'z-frontend-elements';

import InformationPopover from './InformationPopover';

export default () => (
  <Box mx={50} my={75}>
    <InformationPopover
      title="Peers (10)"
      event="click"
      showArrow
      placement="right"
      targetBody={<InfoButton>Peers</InfoButton>}
    >
      <TextBlock>[More info about peers.]</TextBlock>
    </InformationPopover>
  </Box>
);
