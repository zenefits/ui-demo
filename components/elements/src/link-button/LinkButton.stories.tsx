import React from 'react';
// @ts-ignore
import { action } from '@storybook/addon-actions';

import { paddedBox, Example } from 'z-frontend-storybook-config';
import { Box, Flex, Icon } from 'zbase';

import { storiesOf } from '../../.storybook/storyHelpers';
import LinkButton from './LinkButton';

storiesOf('elements|LinkButton', module)
  .addDecorator(paddedBox)
  .add('default', () => (
    <Flex direction="column" align="flex-start">
      <Example label="default">
        <LinkButton>Cancel Import</LinkButton>
      </Example>
      <Example label="with icon">
        <LinkButton>
          <Icon iconName="plus-circle" mr={1} />
          Add Question
        </LinkButton>
      </Example>
      <Example label="focus">
        <LinkButton className="simulate-focus">Cancel Import</LinkButton>
      </Example>
      <Example label="large font">
        <LinkButton fontStyle="paragraphs.xl">Cancel Import</LinkButton>
      </Example>
      <Example label="inProgress">
        <LinkButton inProgress>Cancel Import</LinkButton>
      </Example>
      <Example label="disabled">
        <LinkButton disabled>Cancel Import</LinkButton>
      </Example>
      <Example label="inline">
        <Box>
          Alternatively, you may wish to <LinkButton onClick={action('click')}>Cancel Import</LinkButton>
        </Box>
      </Example>
      <Example label="inline with large font">
        <Box fontStyle="paragraphs.xl">
          Alternatively, you may wish to <LinkButton onClick={action('click')}>Cancel Import</LinkButton>
        </Box>
      </Example>
    </Flex>
  ));
