import React from 'react';

import { Form } from '../Form';

export default () => (
  <Form onSubmit={() => {}} initialValues={{ description: '', comment: '' }}>
    <Form.Textarea name="description" label="Description" />
    <Form.Textarea name="comment" label="Comments" optional />
  </Form>
);
