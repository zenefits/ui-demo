import React from 'react';

import { Form } from '../Form';

const initialValues = { description: 'Annual self review' };

export default () => (
  <Form initialValues={initialValues} onSubmit={() => {}}>
    <Form.Textarea name="description" label="Description" autoGrow />
  </Form>
);
