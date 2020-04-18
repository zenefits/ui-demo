import React from 'react';

import { Form, FormDateInput } from '../../..';

export default () => (
  <Form onSubmit={() => {}} initialValues={{ sdate: '', edate: '' }}>
    <FormDateInput name="sdate" label="Start Date" />
    <FormDateInput name="edate" label="End Date" optional />
  </Form>
);
