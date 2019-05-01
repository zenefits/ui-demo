import React from 'react';

import { Box, Flex, TextBlock } from 'zbase';

import { storiesOf } from '../../.storybook/storyHelpers';
import Range from './Range';

storiesOf('forms|Range', module)
  .addDecorator((getStory: Function) => (
    <Flex p={20} w={[1, 1 / 2]}>
      {getStory()}
    </Flex>
  ))
  .add('Basic', () => (
    <Box ml={4}>
      <TextBlock mt={4} mb={2}>
        Default
      </TextBlock>
      <Range />
      <TextBlock mt={4} mb={2}>
        Set default value
      </TextBlock>
      <Range defaultValue="25" />
      <TextBlock mt={4} mb={4}>
        With Label and Value Percentage
      </TextBlock>
      <Range label="Range Label" showValuePercentage />
      <TextBlock mt={4} mb={2}>
        Disabled
      </TextBlock>
      <Range disabled />
    </Box>
  ));
