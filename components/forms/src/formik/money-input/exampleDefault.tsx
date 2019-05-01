import React from 'react';

import { Form } from '../Form';

export default () => (
  <Form onSubmit={() => {}} initialValues={{ salary: 175000 }}>
    <Form.MoneyInput name="salary" label="Annual Salary" />
  </Form>
);
