import React from 'react';

import { Form, FormAddressUS } from '../../..';

export default () => (
  <Form
    onSubmit={(values, actions) => {
      actions.setSubmitting(false);
      console.log(values);
    }}
    initialValues={{
      address: FormAddressUS.getEmptyValue({ includeName: true }),
    }}
    validationSchema={FormAddressUS.getValidationSchema('address', { includeName: true })}
  >
    <FormAddressUS name="address" includeName includeLine2={false} />
    <Form.Footer primaryText="Save" />
  </Form>
);
