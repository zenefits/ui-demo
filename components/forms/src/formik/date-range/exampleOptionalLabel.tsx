import React from 'react';

import { Form, FormDateRange } from '../../..';

export default () => (
  <Form onSubmit={() => {}} initialValues={{ dateRange: FormDateRange.getEmptyValue() }}>
    <FormDateRange name="dateRange" label="Date Range" optional />
  </Form>
);
