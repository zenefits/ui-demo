import React from 'react';

import { Form, FormRadio, FormRadioGroup } from '../../..';

const options = [
  { value: 'biweekly', label: 'Bi-weekly' },
  { value: 'semimonthly', label: 'Semi-monthly' },
  { value: 'monthly', label: 'Monthly' },
];

export default () => (
  <Form onSubmit={() => {}} initialValues={{ frequency: 'monthly' }}>
    <FormRadioGroup name="frequency" label="Pay Frequency">
      {options.map(option => (
        <FormRadio key={option.value} label={option.label} value={option.value} />
      ))}
    </FormRadioGroup>
  </Form>
);
