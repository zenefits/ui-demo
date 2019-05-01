import React from 'react';

import { Box } from 'zbase';

import { storiesOf } from '../../../.storybook/storyHelpers';
import { Form } from '../Form';

const checkboxExample = () => (
  <Form onSubmit={() => {}} initialValues={{ 'days-of-week': [false, true, true, false, false, false, false] }}>
    <Form.DaysOfWeekSelect name="days-of-week" label="Days of Week" behavior="checkbox" />
  </Form>
);

const radioExample = () => (
  <Form onSubmit={() => {}} initialValues={{ 'days-of-week': 3 }}>
    <Form.DaysOfWeekSelect name="days-of-week" label="Days of Week" behavior="radio" />
  </Form>
);

storiesOf('forms|Form.DaysOfWeekSelect', module)
  .addDecorator((getStory: Function) => (
    <Box p={20} w={[1, 1 / 2]} bg="grayscale.white">
      {getStory()}
    </Box>
  ))
  .add('checkbox', checkboxExample)
  .add('radio', radioExample);
