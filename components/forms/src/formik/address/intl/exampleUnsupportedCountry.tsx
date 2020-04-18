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
        line1: 'Road 2035',
        line2: '',
        city: 'Riffa',
        state: '', // optional
        zip: '926',
        country: 'BH',
      },
    }}
  >
    <FormAddressIntl name="address" />
    <Form.Footer primaryText="Save" />
  </Form>
);
