import React from 'react';

import { Form } from '../Form';

export default () => (
  <Form
    onSubmit={() => {}}
    initialValues={{
      week: {
        from: new Date(2018, 7 - 1, 8),
        to: new Date(2018, 7 - 1, 14),
      },
    }}
  >
    <Form.WeekPicker name="week" label="Week" />
  </Form>
);
