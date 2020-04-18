import React from 'react';

import { Form, FormRadioGroup } from '../../..';
import FormRadio from './FormRadio';

const options = [
  { value: 'biweekly', label: 'Bi-weekly' },
  { value: 'semimonthly', label: 'Semi-monthly' },
  { value: 'monthly', label: 'Monthly' },
];

export default () => (
  <Form onSubmit={() => {}} initialValues={{ frequency: '' }}>
    <FormRadioGroup name="frequency">
      {options.map(option => (
        <FormRadio key={option.value} value={option.value} label={option.label} />
      ))}
    </FormRadioGroup>
  </Form>
);
