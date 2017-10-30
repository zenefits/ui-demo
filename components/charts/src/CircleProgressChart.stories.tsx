import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import CircleProgressChart from './CircleProgressChart';
import { Flex, Box, Heading, Text } from 'rebass';

storiesOf('Circle Progress', module).add('all', () => (
  <Box>
    <Flex>
      <Heading is="h2" f={3}>
        This is an example of a circle progress chart
      </Heading>
      <Box p={3}>
        <CircleProgressChart percentage={25} />
      </Box>
    </Flex>
  </Box>
));
