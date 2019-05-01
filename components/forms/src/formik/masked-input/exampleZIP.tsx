import React from 'react';

import { Form } from '../Form';
import { zip } from './masks';

export default () => (
  <Form onSubmit={() => {}} initialValues={{ zip: '123456789' }}>
    <Form.MaskedInput label="ZIP" name="zip" mask={zip} />
  </Form>
);
