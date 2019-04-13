import React from 'react';

import { Box, Flex, TextBlock } from 'zbase';

import InformationPopover from './InformationPopover';

const targetBody = (
  <Box p={10} bg="grayscale.c" color="grayscale.white" w="auto">
    Click to show
  </Box>
);

export default () => (
  <Box mx={50} my={75}>
    <Flex>
      <Box py={100}>
        <InformationPopover event="click" title="Popover" showArrow placement="top" targetBody={targetBody}>
          <TextBlock>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua.
          </TextBlock>
        </InformationPopover>
      </Box>
    </Flex>
  </Box>
);
