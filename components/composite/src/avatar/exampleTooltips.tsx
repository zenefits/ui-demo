import React from 'react';

import { Box, Flex, TextBlock } from 'zbase';

import Avatar from './Avatar';

export default () => (
  <Flex align="center">
    <Flex column justify="space-around" align="center" mr={4}>
      <Box>
        <Avatar
          firstName="Jennifer"
          lastName="Saison"
          s="medium"
          badge="contingent"
          tooltipBody={<TextBlock p={2}>Tooltip content</TextBlock>}
        />
      </Box>
      <Box textAlign="center" my={2}>
        We can set a custom tooltip
      </Box>
    </Flex>

    <Flex column justify="space-around" align="center" mr={4}>
      <Box>
        <Avatar firstName="Jennifer" lastName="Saison" s="xxlarge" />
      </Box>
      <Box textAlign="center" my={2}>
        Tooltip minimally defaults to `firstName lastName`
      </Box>
    </Flex>

    <Flex column justify="space-around" align="center" mr={4}>
      <Box>
        <Avatar
          firstName="Jennifer"
          lastName="Saison"
          email="jsaison@zenefits.com"
          workerType="Company Paid Temp"
          s="xxlarge"
          badge="contingent"
          tooltipProps={{ showPopover: true }}
        />
      </Box>
      <Box textAlign="center" my={2}>
        Tooltip defaults to full content for contingent worker
      </Box>
    </Flex>

    <Flex column justify="space-around" align="center" mr={4}>
      <Box>
        <Avatar firstName="Jennifer" lastName="Saison" s="xxlarge" badge="contingent" tooltipBody="" />
      </Box>
      <Box textAlign="center" my={2}>
        We can disable tooltips
      </Box>
    </Flex>
  </Flex>
);
