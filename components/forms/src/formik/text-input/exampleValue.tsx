import React from 'react';

import { Form } from '../Form';

export default () => (
  <Form initialValues={{ email: 'foobar@zenefits.com' }} onSubmit={() => {}}>
    <Form.TextInput name="email" type="email" label="Email" />
  </Form>
);
