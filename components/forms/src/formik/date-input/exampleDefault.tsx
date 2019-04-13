import React from 'react';

import { Form } from '../Form';

export default () => (
  <Form onSubmit={() => {}} initialValues={{ date: '' }}>
    <Form.DateInput name="date" label="Date" />
  </Form>
);
