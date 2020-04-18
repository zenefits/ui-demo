import React from 'react';

// @ts-ignore
import { storiesOf } from '@storybook/react';

import { Box, Flex, Heading } from '../index';

storiesOf('zbase|Heading', module)
  .addDecorator((getStory: Function) => (
    <Box p={20} w={[1, 1 / 2]} bg="grayscale.white">
      {getStory()}
    </Box>
  ))
  .add('default', () => <Heading level="2">Heading</Heading>)
  .add('textKey and Values', () => <Heading level="2" textKey="hello" textValues={{ name: 'Miguel' }} />)
  .add('levels', () => (
    <>
      <Flex column>
        <Heading level={2}>Teams</Heading>
        <Heading level={3}>Engineering</Heading>
        <Heading level={3}>Marketing</Heading>
        <Heading level={3}>Sales</Heading>
      </Flex>
      <Flex column>
        <Heading level="1">Heading</Heading>
        <Heading level="2">Heading</Heading>
        <Heading level="3">Heading</Heading>
        <Heading level="4">Heading</Heading>
        <Heading level="5">Heading</Heading>
        <Heading level="6">Heading</Heading>
      </Flex>
    </>
  ))
  .add('util props', () => (
    <Heading level="5" fontStyle="controls.m" bg="primary.a" color="grayscale.white" p={3}>
      Heading
    </Heading>
  ));
