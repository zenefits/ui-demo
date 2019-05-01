import React from 'react';

import { Form } from '../Form';

export default () => (
  <Form initialValues={{ remember: true, twoFactor: false }} onSubmit={() => {}}>
    <Form.Checkbox name="remember" label="Remember Me" />
    <Form.Checkbox name="twoFactor" label="Two-Factor Auth" />
  </Form>
);
