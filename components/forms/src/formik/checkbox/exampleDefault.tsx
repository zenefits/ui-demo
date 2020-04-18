import React from 'react';

import { Form, FormCheckbox } from '../../..';

export default () => (
  <Form onSubmit={() => {}} initialValues={{ remember: false }}>
    <FormCheckbox name="remember" label="Remember Me" />
  </Form>
);
