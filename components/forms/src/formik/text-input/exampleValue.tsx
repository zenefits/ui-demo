import React from 'react';

import { Form, FormTextInput } from '../../..';

export default () => (
  <Form initialValues={{ email: 'foobar@zenefits.com' }} onSubmit={() => {}}>
    <FormTextInput name="email" type="email" label="Email" />
  </Form>
);
