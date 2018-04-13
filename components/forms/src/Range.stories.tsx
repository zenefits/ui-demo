import React from 'react';
import { storiesOf } from '@storybook/react';

import { Box, Flex, P } from 'zbase';

import Range from './Range';

storiesOf('Range', module)
  .addDecorator(getStory => (
    <Flex p={20} w={[1, 1 / 2]}>
      {getStory()}
    </Flex>
  ))
  .add('Basic', () => (
    <Box ml={4}>
      <P mt={4} mb={2}>
        Default
      </P>
      <Range />
      <P mt={4} mb={2}>
        Set default value
      </P>
      <Range defaultValue="25" />
      <P mt={4} mb={4}>
        With Label and Value Percentage
      </P>
      <Range label="Range Label" showValuePercentage />
      <P mt={4} mb={2}>
        Disabled
      </P>
      <Range disabled />
    </Box>
  ));
