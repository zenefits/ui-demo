import React from 'react';
// @ts-ignore
import { action } from '@storybook/addon-actions';

import { Box } from 'zbase';
import { skipVisualTest } from 'z-frontend-app-bootstrap';

import { storiesOf } from '../../.storybook/storyHelpers';
import TimeInput from './TimeInput';

storiesOf('forms|TimeInput', module)
  .addDecorator((getStory: Function) => (
    <Box p={20} w={[1, 1 / 2]} bg="grayscale.white">
      {getStory()}
    </Box>
  ))
  .add('default', () => <TimeInput name="time" />)
  .add('with error', () => <TimeInput name="time" error="invalid time entered" />)
  .add('custom interval', () => <TimeInput name="time" interval={15} />)
  .add('fires events', () => <TimeInput name="time" onChange={action('time changed')} />, skipVisualTest)
  .add('util props', () => <TimeInput name="time" my={50} width={200} />)
  .add('disabled', () => <TimeInput name="time" disabled />)
  .add('disable dropdown', () => <TimeInput name="time" defaultIsOpen disableDropdown />);
