import React from 'react';

import { Form, FormTimeRange } from '../../..';

export default () => (
  <Form
    onSubmit={() => {}}
    initialValues={{ timeRange: FormTimeRange.getEmptyValue() }}
    validationSchema={{ timeRange: FormTimeRange.validationSchema }}
  >
    <FormTimeRange name="timeRange" label="Time Range" optional />
  </Form>
);
