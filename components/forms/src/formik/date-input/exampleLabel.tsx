import React from 'react';

import { Form } from '../Form';

export default () => (
  <Form onSubmit={() => {}} initialValues={{ sdate: '', edate: '' }}>
    <Form.DateInput name="sdate" label="Start Date" />
    <Form.DateInput name="edate" label="End Date" optional />
  </Form>
);
