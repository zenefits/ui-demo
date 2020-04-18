import React from 'react';

import { Form, FormMaskedInput } from '../../..';

export default () => (
  <Form onSubmit={() => {}} initialValues={{ ein: '123456789' }}>
    <FormMaskedInput label="EIN" name="ein" mask={[/\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/]} />
  </Form>
);
