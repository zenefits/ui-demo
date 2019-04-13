import React from 'react';

import { Form } from '../Form';

export default () => (
  <Form
    onSubmit={(values, actions) => {
      setTimeout(() => {
        actions.setSubmitting(false);
        console.log(values);
      }, 1000);
    }}
    initialValues={{
      address: Form.AddressUS.getEmptyValue(),
    }}
    validationSchema={Form.AddressUS.getValidationSchema('address')}
  >
    <Form.AddressUS name="address" autocomplete />
    <Form.Footer primaryText="Save" />
  </Form>
);
