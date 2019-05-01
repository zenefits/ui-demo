import React from 'react';

import { Form } from '../Form';

export default () => (
  <Form onSubmit={() => {}} initialValues={{ name: '' }}>
    <Form.TextInput name="name" />
  </Form>
);
