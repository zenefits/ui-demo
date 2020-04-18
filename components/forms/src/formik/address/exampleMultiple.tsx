import React from 'react';

import { Heading } from 'zbase';

import { Form, FormAddressUS } from '../../..';

export default () => (
  <Form
    onSubmit={(values, actions) => {
      actions.setSubmitting(false);
      console.log(values);
    }}
    initialValues={{
      home: FormAddressUS.getEmptyValue(),
      office: FormAddressUS.getEmptyValue(),
    }}
    validationSchema={FormAddressUS.getValidationSchema('home')}
  >
    <Heading level="4">Home</Heading>
    <FormAddressUS name="home" />

    <Heading level="4">Office</Heading>
    <FormAddressUS name="office" />

    <Form.Footer primaryText="Save" />
  </Form>
);
