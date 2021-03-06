import React from 'react';

import { Form } from '../Form';

export default () => (
  <Form
    onSubmit={(values, actions) => {
      actions.setSubmitting(false);
      console.log(values);
    }}
    initialValues={{
      address: Form.AddressUS.getEmptyValue(),
    }}
  >
    <Form.AddressUS name="address" />
    <Form.Footer primaryText="Save" />
  </Form>
);
