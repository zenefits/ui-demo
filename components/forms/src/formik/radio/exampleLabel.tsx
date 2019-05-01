import React from 'react';

import { Form } from '../Form';

const options = [
  { value: 'biweekly', label: 'Bi-weekly' },
  { value: 'semimonthly', label: 'Semi-monthly' },
  { value: 'monthly', label: 'Monthly' },
];

export default () => (
  <Form onSubmit={() => {}} initialValues={{ frequency: '', secondary: '' }}>
    <Form.RadioGroup name="frequency" label="Pay Frequency">
      {options.map(option => (
        <Form.Radio key={option.value} value={option.value} label={option.label} />
      ))}
    </Form.RadioGroup>
    <Form.RadioGroup name="secondaryfrequency" label="Second Choice" optional>
      {options.map(option => (
        <Form.Radio key={option.value} value={option.value} label={option.label} />
      ))}
    </Form.RadioGroup>
  </Form>
);
