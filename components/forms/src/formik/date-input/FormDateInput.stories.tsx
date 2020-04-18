import React from 'react';

import { Box } from 'zbase';

import { storiesOf } from '../../../.storybook/storyHelpers';
import DefaultExample from './exampleDefault';
import LabelExample from './exampleLabel';
import { Form, FormDateInput } from '../../..';

storiesOf('forms|Form.DateInput', module)
  .addDecorator((getStory: Function) => (
    <Box p={20} w={[1, 1 / 2]} bg="grayscale.white">
      {getStory()}
    </Box>
  ))
  .add('basic', DefaultExample)
  .add('with label', LabelExample)
  .add('with disabled days', () => <DisabledDaysExample />);

const today = new Date();
const DisabledDaysExample = () => (
  <Form onSubmit={() => {}} initialValues={{ date: '' }} validationSchema={{ date: Form.Yup.string().required() }}>
    <FormDateInput name="date" label="Date" pickerOptions={{ disabledDays: [today] }} />
  </Form>
);
