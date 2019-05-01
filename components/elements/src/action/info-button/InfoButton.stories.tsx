import React from 'react';
// @ts-ignore
import { action } from '@storybook/addon-actions';

import { Box, Flex, TextBlock } from 'zbase';
import { skipVisualTest } from 'z-frontend-app-bootstrap';

import { storiesOf } from '../../../.storybook/storyHelpers';
import { InfoButton } from '../../../index';

storiesOf('elements|InfoButton', module)
  .addDecorator((getStory: Function) => (
    <Box p={20} w={[1, 2 / 3]} bg="grayscale.white">
      {getStory()}
    </Box>
  ))
  .add('default', () => <InfoButton>Manager</InfoButton>)
  .add('inline with text', () => (
    <TextBlock>
      Assigned: <InfoButton>Manager</InfoButton>, <InfoButton>Peers</InfoButton>, Self
    </TextBlock>
  ))
  .add('focus state', () => <InfoButton autoFocus>Manager</InfoButton>)
  .add('disabled state', () => <InfoButton disabled>Manager</InfoButton>)
  .add('label wraps', () => (
    <Box w={150} fontStyle="paragraphs.m">
      <InfoButton>Really long label that wraps</InfoButton>
    </Box>
  ))
  .add('util props', () => (
    <InfoButton m={4} px={3} py={2} color="primary.a" fontStyle="headings.xl">
      Manager
    </InfoButton>
  ))
  .add('actions', () => <InfoButton onClick={action('InfoButton-click')}>Manager</InfoButton>, skipVisualTest)
  .add('sizes', () => (
    <Box>
      <Flex direction="column" align="flex-start" height={200} justify="space-between">
        <InfoButton fontStyle="paragraphs.xxl">Manager</InfoButton>
        <InfoButton fontStyle="paragraphs.xl">Manager</InfoButton>
        <InfoButton fontStyle="paragraphs.l">Manager</InfoButton>
        <InfoButton fontStyle="paragraphs.m">Manager</InfoButton>
        <InfoButton fontStyle="paragraphs.s">Manager</InfoButton>
      </Flex>
    </Box>
  ));
