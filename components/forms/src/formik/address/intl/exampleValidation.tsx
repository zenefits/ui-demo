import React from 'react';

import { Form } from '../../Form';

export default () => (
  <Form
    onSubmit={(values, actions) => {
      actions.setSubmitting(false);
      console.log(values);
    }}
    initialValues={{
      address: Form.AddressIntl.getEmptyValue({ country: 'US' }),
    }}
    validationSchema={Form.AddressIntl.getValidationSchema('address')}
  >
    <Form.AddressIntl name="address" />
    <Form.Footer primaryText="Save" />
  </Form>
);
