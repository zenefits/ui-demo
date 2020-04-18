import React from 'react';

import { Form, FormWeekPicker } from '../../..';

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
    <FormWeekPicker name="week" label="Week" />
  </Form>
);
