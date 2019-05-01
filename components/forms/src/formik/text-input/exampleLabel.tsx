import React from 'react';

import { Form } from '../Form';

export default () => (
  <Form onSubmit={() => {}} initialValues={{ name: '', preferred: '' }}>
    <Form.TextInput name="name" label="Name" />
    <Form.TextInput name="preferred" label="Preferred Name" optional />
  </Form>
);
