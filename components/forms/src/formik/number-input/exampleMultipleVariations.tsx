import React from 'react';

import { Form } from '../Form';

export default () => (
  <Form
    onSubmit={() => {}}
    initialValues={{
      timeOffDays: 10,
      maxInteger: Number.MAX_SAFE_INTEGER,
      minInteger: Number.MIN_SAFE_INTEGER,
      noCommas: Number.MAX_SAFE_INTEGER,
      randomNumber: 12,
    }}
  >
    <Form.NumberInput name="timeOffDays" label="Time off days (Default number input)" />
    <Form.NumberInput
      name="maxInteger"
      allowDecimal={false}
      label="Maximum Integer Value (No decimal or negative symbols)"
    />
    <Form.NumberInput
      name="minInteger"
      allowDecimal={false}
      allowNegative
      label="Minimum Integer Value (No decimal but negative allowed)"
    />
    <Form.NumberInput
      name="noCommas"
      allowDecimal={false}
      allowCommaSeparator={false}
      label="No Commas seprating thousands"
    />
    <Form.NumberInput
      name="randomNumber"
      allowDecimal={false}
      integerLimit={2}
      label="Random integer between 0 and 99"
    />
  </Form>
);
