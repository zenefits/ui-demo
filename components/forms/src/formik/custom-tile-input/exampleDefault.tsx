import React from 'react';

import { TextBlock } from 'zbase';

import { Form } from '../Form';

const featureOptions = [
  {
    label: 'Bi-Weekly',
    value: 'BW',
  },
  {
    label: 'Monthly',
    value: 'Mo',
  },
  {
    label: 'Semi-Monthly',
    value: 'SM',
  },
  {
    label: 'Weekly',
    value: 'We',
  },
];

export default () => (
  <Form onSubmit={() => {}} initialValues={{ paySchedule: 'SM' }}>
    {featureOptions.map(option => (
      <Form.CustomTileInput name="paySchedule" key={option.value} value={option.value}>
        <TextBlock p={3}>{option.label}</TextBlock>
      </Form.CustomTileInput>
    ))}
  </Form>
);
