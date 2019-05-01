import React from 'react';
// @ts-ignore
import { action } from '@storybook/addon-actions';

import { Box, Flex } from 'zbase';

import { storiesOf } from '../../.storybook/storyHelpers';
import SearchInput from './SearchInputDeprecated';

storiesOf('forms|SearchInput', module)
  .addDecorator((getStory: Function) => (
    <Box p={20} w={[1, 1 / 2]} bg="grayscale.white">
      {getStory()}
    </Box>
  ))
  .add('default', () => (
    <SearchInput onChange={action('onChange')} onSubmit={action('onSubmit')} onClear={action('onClear')} />
  ))
  .add('sizes', () => (
    <Flex wrap align="center">
      <Box w={1 / 3}>Large</Box>
      <Box w={2 / 3} mb={1}>
        <SearchInput
          s="large"
          onChange={action('onChange')}
          onSubmit={action('onSubmit')}
          onClear={action('onClear')}
        />
      </Box>
      <Box w={1 / 3}>Medium</Box>
      <Box w={2 / 3} mb={1}>
        <SearchInput
          s="medium"
          onChange={action('onChange')}
          onSubmit={action('onSubmit')}
          onClear={action('onClear')}
        />
      </Box>
      <Box w={1 / 3}>Small</Box>
      <Box w={2 / 3} mb={1}>
        <SearchInput
          s="small"
          onChange={action('onChange')}
          onSubmit={action('onSubmit')}
          onClear={action('onClear')}
        />
      </Box>
    </Flex>
  ))
  .add('default value', () => (
    <SearchInput
      defaultValue="UIE"
      onChange={action('onChange')}
      onSubmit={action('onSubmit')}
      onClear={action('onClear')}
    />
  ))
  .add('button text and input placeholder', () => (
    <SearchInput
      buttonText="buttonText"
      placeholder="placeholder"
      onChange={action('onChange')}
      onSubmit={action('onSubmit')}
      onClear={action('onClear')}
    />
  ));
