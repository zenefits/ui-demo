import React from 'react';

import { Form, FormCheckbox } from '../../..';

export default () => (
  <Form initialValues={{ remember: true, twoFactor: false }} onSubmit={() => {}}>
    <FormCheckbox name="remember" label="Remember Me" />
    <FormCheckbox name="twoFactor" label="Two-Factor Auth" />
  </Form>
);
