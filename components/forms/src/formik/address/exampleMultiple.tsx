import React from 'react';

import { Heading } from 'zbase';

import { Form } from '../Form';

export default () => (
  <Form
    onSubmit={(values, actions) => {
      actions.setSubmitting(false);
      console.log(values);
    }}
    initialValues={{
      home: Form.AddressUS.getEmptyValue(),
      office: Form.AddressUS.getEmptyValue(),
    }}
    validationSchema={Form.AddressUS.getValidationSchema('home')}
  >
    <Heading level="4">Home</Heading>
    <Form.AddressUS name="home" />

    <Heading level="4">Office</Heading>
    <Form.AddressUS name="office" />

    <Form.Footer primaryText="Save" />
  </Form>
);
