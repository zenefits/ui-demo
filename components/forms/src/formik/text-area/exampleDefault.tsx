import React from 'react';

import { Form } from '../Form';

export default () => (
  <Form onSubmit={() => {}} initialValues={{ description: '' }}>
    <Form.Textarea name="description" mt={0} />
  </Form>
);
