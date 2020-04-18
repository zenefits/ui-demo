import React from 'react';

import { Form, FormAddressUS } from '../../..';

export default () => (
  <Form
    onSubmit={(values, actions) => {
      setTimeout(() => {
        actions.setSubmitting(false);
        console.log(values);
      }, 1000);
    }}
    initialValues={{
      address: FormAddressUS.getEmptyValue(),
    }}
    validationSchema={FormAddressUS.getValidationSchema('address')}
  >
    <FormAddressUS name="address" autocomplete />
    <Form.Footer primaryText="Save" />
  </Form>
);
