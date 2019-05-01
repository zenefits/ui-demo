import React from 'react';

import { Form } from '../Form';

export default () => (
  <Form
    onSubmit={() => {}}
    initialValues={{ timeRange: Form.TimeRange.getEmptyValue() }}
    validationSchema={{ timeRange: Form.TimeRange.validationSchema }}
  >
    <Form.TimeRange name="timeRange" label="Time Range" />
  </Form>
);
