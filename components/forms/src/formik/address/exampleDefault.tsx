import React from 'react';

import { Form, FormAddressUS } from '../../..';

export default () => (
  <Form
    onSubmit={(values, actions) => {
      actions.setSubmitting(false);
      console.log(values);
    }}
    initialValues={{
      address: FormAddressUS.getEmptyValue(),
    }}
  >
    <FormAddressUS name="address" />
    <Form.Footer primaryText="Save" />
  </Form>
);
