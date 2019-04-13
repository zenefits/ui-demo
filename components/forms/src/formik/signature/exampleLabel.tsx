import React from 'react';

import { Form } from '../Form';

export default () => (
  <Form onSubmit={() => {}} initialValues={{ signature: '' }}>
    <Form.Signature name="signature" label="Signature" />
  </Form>
);
