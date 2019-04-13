import React from 'react';

import { Form } from '../Form';

export default () => (
  <Form onSubmit={() => {}} initialValues={{ remember: false }}>
    <Form.Checkbox name="remember" label="Remember Me" />
  </Form>
);
