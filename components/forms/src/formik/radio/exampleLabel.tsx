import React from 'react';

import { Form, FormRadio, FormRadioGroup } from '../../..';

const options = [
  { value: 'biweekly', label: 'Bi-weekly' },
  { value: 'semimonthly', label: 'Semi-monthly' },
  { value: 'monthly', label: 'Monthly' },
];

export default () => (
  <Form onSubmit={() => {}} initialValues={{ frequency: '', secondary: '' }}>
    <FormRadioGroup name="frequency" label="Pay Frequency">
      {options.map(option => (
        <FormRadio key={option.value} value={option.value} label={option.label} />
      ))}
    </FormRadioGroup>
    <FormRadioGroup name="secondary" label="Second Choice" optional>
      {options.map(option => (
        <FormRadio key={option.value} value={option.value} label={option.label} />
      ))}
    </FormRadioGroup>
  </Form>
);
