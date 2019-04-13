import React from 'react';

import { Form } from '../Form';

export default () => (
  <Form
    onSubmit={(values, actions) => {
      actions.setSubmitting(false);
      console.log(values);
    }}
    initialValues={{
      address: Form.AddressUS.getEmptyValue(),
    }}
    validationSchema={Form.AddressUS.getValidationSchema('address')}
  >
    {props => {
      return (
        <>
          <Form.AddressUS name="address" />
          <Form.Footer
            primaryText="Save"
            primaryProps={{
              // trigger validation immediately:
              autoFocus: true,
              onFocus: () => props.submitForm(),
            }}
          />
        </>
      );
    }}
  </Form>
);
