import React from 'react';
// @ts-ignore
import { action } from '@storybook/addon-actions';

import { Box } from 'zbase';

import { storiesOf } from '../../.storybook/storyHelpers';
import WeekPicker from './WeekPicker';

// Use this for initialMonth so that the snapshots will not change to different months
const dateString = '2018-07-17T03:24:00';
const date = new Date(dateString);

storiesOf('forms|WeekPicker', module)
  .addDecorator((getStory: Function) => (
    <Box p={20} w={[1, 1 / 2]} bg="grayscale.white">
      {getStory()}
    </Box>
  ))
  .add('default', () => <WeekPicker initialMonth={date} onDayClick={action('onDayClick')} />)
  .add('first day of the week', () => (
    <WeekPicker initialMonth={date} firstDayOfWeek={4} onDayClick={action('onDayClick')} />
  ))
  .add('selected week', () => <WeekPicker initialMonth={date} onDayClick={action('onDayClick')} selectedWeek={date} />);
