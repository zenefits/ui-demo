import React from 'react';

import { Form, FormAddressUS } from '../../..';

export default () => (
  <Form onSubmit={() => {}} initialValues={{}}>
    <Form.Section label="Legal Address" isLabelVisuallyHidden>
      <FormAddressUS name="address" />
    </Form.Section>
  </Form>
);
