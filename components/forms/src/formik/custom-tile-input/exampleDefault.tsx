import React from 'react';

import { TextBlock } from 'zbase';

import { Form, FormCustomTileInput } from '../../..';

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
      <FormCustomTileInput name="paySchedule" key={option.value} value={option.value}>
        <TextBlock p={3}>{option.label}</TextBlock>
      </FormCustomTileInput>
    ))}
  </Form>
);
