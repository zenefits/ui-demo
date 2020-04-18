import React from 'react';

import { Form, FormSignature } from '../../..';

export default () => (
  <Form onSubmit={() => {}} initialValues={{ signature: '' }}>
    <FormSignature name="signature" label="Signature" />
  </Form>
);
