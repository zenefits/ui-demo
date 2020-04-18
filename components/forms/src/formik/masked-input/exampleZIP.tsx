import React from 'react';

import { Form, FormMaskedInput } from '../../..';
import { zip } from './masks';

export default () => (
  <Form onSubmit={() => {}} initialValues={{ zip: '123456789' }}>
    <FormMaskedInput label="ZIP" name="zip" mask={zip} />
  </Form>
);
