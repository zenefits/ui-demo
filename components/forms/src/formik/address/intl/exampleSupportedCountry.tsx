import React from 'react';

import { Form } from '../../Form';

export default () => (
  <Form
    onSubmit={(values, actions) => {
      actions.setSubmitting(false);
      console.log(values);
    }}
    initialValues={{
      address: {
        line1: '1085 Homer St',
        line2: 'Unit 600',
        city: 'Vancouver',
        state: 'BC',
        zip: 'V5Y 1X4',
        country: 'CA',
      },
    }}
  >
    <Form.AddressIntl name="address" />
    <Form.Footer primaryText="Save" />
  </Form>
);
