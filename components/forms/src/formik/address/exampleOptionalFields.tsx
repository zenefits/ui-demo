import React from 'react';

import { Form } from '../Form';

export default () => (
  <Form
    onSubmit={(values, actions) => {
      actions.setSubmitting(false);
      console.log(values);
    }}
    initialValues={{
      address: Form.AddressUS.getEmptyValue({ includeName: true }),
    }}
    validationSchema={Form.AddressUS.getValidationSchema('address', { includeName: true })}
  >
    <Form.AddressUS name="address" includeName includeLine2={false} />
    <Form.Footer primaryText="Save" />
  </Form>
);
