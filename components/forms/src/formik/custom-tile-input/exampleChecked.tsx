import React from 'react';

import { TextBlock } from 'zbase';

import { Form, FormCustomTileInput } from '../../..';

const featureOptions = [
  {
    label: 'Time off',
    value: 'pto',
  },
  {
    label: 'Payroll',
    value: 'pyp',
  },
  {
    label: 'Performance management',
    value: 'talent',
  },
];

export default () => (
  <Form onSubmit={() => {}} initialValues={{ pto: false, pyp: false, talent: true }}>
    {featureOptions.map(option => (
      <FormCustomTileInput name={option.value} isCheckbox key={option.value} value={option.value}>
        <TextBlock p={3}>{option.label}</TextBlock>
      </FormCustomTileInput>
    ))}
  </Form>
);
