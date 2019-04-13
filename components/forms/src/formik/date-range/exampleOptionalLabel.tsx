import React from 'react';

import { Form } from '../Form';

export default () => (
  <Form onSubmit={() => {}} initialValues={{ dateRange: Form.DateRange.getEmptyValue() }}>
    <Form.DateRange name="dateRange" label="Date Range" optional />
  </Form>
);
