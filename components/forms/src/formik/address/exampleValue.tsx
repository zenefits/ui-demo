import React from 'react';

import { Form } from '../Form';

export default () => (
  <Form
    onSubmit={(values, actions) => {
      actions.setSubmitting(false);
      console.log(values);
    }}
    initialValues={{
      address: {
        line1: '250 Brannan St',
        line2: '#3',
        city: 'San Francisco',
        state: 'CA',
        zip: '94107',
        country: 'US',
      },
    }}
  >
    <Form.AddressUS name="address" />
    <Form.Footer primaryText="Save" />
  </Form>
);
