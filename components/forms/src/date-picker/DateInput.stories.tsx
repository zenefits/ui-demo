import React from 'react';
// @ts-ignore
import { action } from '@storybook/addon-actions';

import { Box, Flex } from 'zbase';
import { skipVisualTest } from 'z-frontend-app-bootstrap';

import { storiesOf } from '../../.storybook/storyHelpers';
import DateInput from './DateInput';

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
  .add('default', () => <DateInput onChange={action('dateinput-change')} />)
  .add('placeholder', () => <DateInput placeholder="Custom placeholder" onChange={action('dateinput-change')} />)
  .add('disabled', () => <DateInput disabled onChange={action('dateinput-change')} />)
  .add('autofocus', () => <DateInput autoFocus onChange={action('dateinput-change')} />)
  .add('custom date format', () => (
    <DateInput format="LL" placeholder="Month day, year" value="2010-01-02" onChange={action('dateinput-change')} />
  ))
  .add('util props', () => <DateInput my={50} onChange={action('dateinput-change')} />)
  .add('disabled dates', () => <DateInput pickerOptions={withDisabled} onChange={action('dateinput-change')} />)
  .add(
    'fires events',
    () => (
      <DateInput
        onChange={action('dateinput-change')}
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
        <DateInput s="large" onChange={action('dateinput-change')} />
      </Box>
      <Box w={1 / 3}>Medium</Box>
      <Box w={2 / 3} mb="5px">
        <DateInput s="medium" onChange={action('dateinput-change')} />
      </Box>
      <Box w={1 / 3}>Small</Box>
      <Box w={2 / 3} mb="5px">
        <DateInput s="small" onChange={action('dateinput-change')} />
      </Box>
    </Flex>
  ));
