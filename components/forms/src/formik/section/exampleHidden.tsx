import React from 'react';

import { Form } from '../Form';

export default () => (
  <Form onSubmit={() => {}} initialValues={{}}>
    <Form.Section label="Legal Address" visuallyHidden>
      <Form.AddressUS name="address" />
    </Form.Section>
  </Form>
);
