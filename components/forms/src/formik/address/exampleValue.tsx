import React from 'react';

import { Form, FormAddressUS } from '../../..';

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
    <FormAddressUS name="address" />
    <Form.Footer primaryText="Save" />
  </Form>
);
