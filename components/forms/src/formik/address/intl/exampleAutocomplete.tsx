import React from 'react';

import { Form, FormAddressIntl } from '../../../..';

export default () => (
  <Form
    onSubmit={(values, actions) => {
      actions.setSubmitting(false);
      console.log(values);
    }}
    initialValues={{
      address: FormAddressIntl.getEmptyValue(),
    }}
    validationSchema={FormAddressIntl.getValidationSchema('address')}
  >
    <FormAddressIntl name="address" autocomplete />
    <Form.Footer primaryText="Save" />
  </Form>
);
