import React from 'react';

import { Form } from '../Form';

export default () => (
  <Form onSubmit={() => {}} initialValues={{ ein: '123456789' }}>
    <Form.MaskedInput
      label="EIN"
      name="ein"
      mask={[/\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/]}
      optional
    />
  </Form>
);
