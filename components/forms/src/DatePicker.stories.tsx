import React from 'react';
import { storiesOf } from '@storybook/react';
import { Box, Flex } from 'rebass';
import { action } from '@storybook/addon-actions';
import DatePicker from './DatePicker';

const januaryFirst = new Date(2017, 1 - 1);
const withDisabled = {
  disabledDays: {
    before: new Date(),
  },
};

storiesOf('DatePicker', module)
  .addDecorator(getStory => (
    <Box p={20} w={[1, 1 / 2]} bg="white">
      {getStory()}
    </Box>
  ))
  .add('default', () => <DatePicker />)
  .add('placeholder', () => <DatePicker placeholder="Custom placeholder" />)
  .add('disabled', () => <DatePicker disabled />)
  .add('initial value', () => <DatePicker value="12/12/2012" />)
  .add('initial date', () => <DatePicker date={januaryFirst} />)
  .add('autofocus', () => <DatePicker autoFocus value="12/12/2012" />)
  .add('custom date format', () => <DatePicker format="YYYY-MM-DD" />)
  .add('rebass props', () => <DatePicker my={50} />)
  .add('disabled dates', () => <DatePicker pickerOptions={withDisabled} />)
  .add('fires events', () => (
    <DatePicker
      onChange={action('datepicker-change')}
      onClick={action('datepicker-click')}
      onFocus={action('datepicker-focus')}
      onBlur={action('datepicker-blur')}
      onKeyUp={action('datepicker-key-up')}
    />
  ))
  .add('sizes', () => (
    <Flex wrap align="center">
      <Box w={1 / 3}>Large</Box>
      <Box w={2 / 3} mb="5px">
        <DatePicker s="large" />
      </Box>
      <Box w={1 / 3}>Medium</Box>
      <Box w={2 / 3} mb="5px">
        <DatePicker s="medium" />
      </Box>
      <Box w={1 / 3}>Small</Box>
      <Box w={2 / 3} mb="5px">
        <DatePicker s="small" />
      </Box>
    </Flex>
  ));
