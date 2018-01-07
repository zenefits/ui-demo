import React from 'react';
import { Box, Flex } from 'rebass';
import { storiesOf } from '@storybook/react';
import Heading from './Heading';

storiesOf('Heading', module)
  .addDecorator(getStory => (
    <Box p={20} w={[1, 1 / 2]} bg="white">
      {getStory()}
    </Box>
  ))
  .add('default', () => <Heading>Default Heading</Heading>)
  .add('sizes', () => (
    <Flex column>
      <Heading is="h1">h1 Heading</Heading>
      <Heading is="h2">h2 Heading</Heading>
      <Heading is="h3">h3 Heading</Heading>
      <Heading is="h4">h4 Heading</Heading>
      <Heading is="h5">h5 Heading</Heading>
      <Heading is="h6">H6 Heading</Heading>
    </Flex>
  ));
