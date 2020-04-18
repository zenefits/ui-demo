import React from 'react';

import { Form, FormAddressUS } from '../../..';

export default () => (
  <Form
    onSubmit={(values, actions) => {
      actions.setSubmitting(false);
      console.log(values);
    }}
    initialValues={{
      address: FormAddressUS.getEmptyValue(),
    }}
    validationSchema={FormAddressUS.getValidationSchema('address')}
  >
    {props => {
      return (
        <>
          <FormAddressUS name="address" />
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
