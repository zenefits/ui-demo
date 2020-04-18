import React from 'react';

import { paddedSizedBox } from 'z-frontend-storybook-config';
import { Flex, TextBlock } from 'zbase';

import { storiesOf } from '../../.storybook/storyHelpers';
import StatusTag from './StatusTag';

const customPadding = { p: 2 };

storiesOf('elements|StatusTag', module)
  .addDecorator(paddedSizedBox(500))
  .add('modes', () => (
    <Flex direction="row">
      <StatusTag mode="affirmation">Approved</StatusTag>
      <StatusTag mode="negation">Rejected</StatusTag>
      <StatusTag mode="caution">Pending</StatusTag>
      <StatusTag mode="neutral">In Progress</StatusTag>
    </Flex>
  ))
  .add('custom padding (rare)', () => (
    <Flex direction="row">
      <StatusTag {...customPadding} mode="affirmation">
        Approved
      </StatusTag>
      <StatusTag {...customPadding} mode="negation">
        Rejected
      </StatusTag>
      <StatusTag {...customPadding} mode="caution">
        Pending
      </StatusTag>
      <StatusTag {...customPadding} mode="neutral">
        In Progress
      </StatusTag>
    </Flex>
  ))
  .add('inline with text', () => (
    <TextBlock fontStyle="headings.l">
      Heading
      <StatusTag mode="caution" ml={2}>
        Review Started
      </StatusTag>
    </TextBlock>
  ));
