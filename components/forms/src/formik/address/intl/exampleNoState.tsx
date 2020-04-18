import React from 'react';

import { Form, FormAddressIntl } from '../../../..';

export default () => (
  <Form
    onSubmit={(values, actions) => {
      actions.setSubmitting(false);
      console.log(values);
    }}
    initialValues={{
      address: {
        line1: '555 Rue de Turbigo',
        city: 'Paris',
        zip: '75000',
        state: '',
        country: 'FR',
      },
    }}
    validationSchema={FormAddressIntl.getValidationSchema('address')}
  >
    <FormAddressIntl name="address" />
    <Form.Footer primaryText="Save" />
  </Form>
);
