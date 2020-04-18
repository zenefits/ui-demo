import React from 'react';
// @ts-ignore
import { action } from '@storybook/addon-actions';

import { Box, Flex, Heading } from 'zbase';
import { setViewports, skipVisualTest } from 'z-frontend-app-bootstrap';

import { storiesOf } from '../../.storybook/storyHelpers';
import DateInput from './DateInput';

const commonProps = {
  onChange: action('dateinput-change'),
  value: '2019-01-02',
};

const withDisabled = {
  disabledDays: {
    before: new Date(),
  },
};

storiesOf('forms|DateInput', module)
  .addDecorator((getStory: Function) => (
    <Box p={20} w={[1, 1 / 2]} bg="grayscale.white">
      {getStory()}
    </Box>
  ))
  .add('default', () => <DateInput />)
  .add('placeholder', () => <DateInput placeholder="Custom placeholder" />)
  .add('disabled', () => <DateInput disabled {...commonProps} />)
  .add('autofocus', () => <DateInput autoFocus {...commonProps} />)
  .add('custom date format', () => <DateInput format="LL" placeholder="Month day, year" {...commonProps} />)
  .add('util props', () => <DateInput my={50} width={200} />)
  .add('disabled dates', () => <DateInput pickerOptions={withDisabled} {...commonProps} />)
  .add(
    'fires events',
    () => (
      <DateInput
        {...commonProps}
        onClick={action('dateinput-click')}
        onFocus={action('dateinput-focus')}
        onBlur={action('dateinput-blur')}
        onKeyUp={action('dateinput-key-up')}
      />
    ),
    skipVisualTest,
  )
  .add('sizes', () => (
    <Flex wrap align="center">
      <Box w={1 / 3}>Large</Box>
      <Box w={2 / 3} mb="5px">
        <DateInput s="large" {...commonProps} />
      </Box>
      <Box w={1 / 3}>Medium</Box>
      <Box w={2 / 3} mb="5px">
        <DateInput s="medium" {...commonProps} />
      </Box>
      <Box w={1 / 3}>Small</Box>
      <Box w={2 / 3} mb="5px">
        <DateInput s="small" {...commonProps} />
      </Box>
    </Flex>
  ))
  .add(
    'edge cases',
    () => (
      <Box>
        <Heading level={1} fontStyle="headings.m">
          On edge of screen
        </Heading>
        <Flex justify="flex-end" w="calc(100vw - 40px)">
          <DateInput
            {...commonProps}
            onClick={action('dateinput-click')}
            onFocus={action('dateinput-focus')}
            onBlur={action('dateinput-blur')}
            onKeyUp={action('dateinput-key-up')}
            autoFocus
          />
        </Flex>
      </Box>
    ),
    setViewports([0, 3]),
  );
