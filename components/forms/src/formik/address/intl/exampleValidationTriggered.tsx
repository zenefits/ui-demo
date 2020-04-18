import React from 'react';

import { Form, FormAddressIntl } from '../../../..';

export default () => (
  <Form
    onSubmit={(values, actions) => {
      actions.setSubmitting(false);
      console.log(values);
    }}
    initialValues={{
      address: FormAddressIntl.getEmptyValue({ country: 'US' }),
    }}
    validationSchema={FormAddressIntl.getValidationSchema('address')}
  >
    {props => (
      <>
        <FormAddressIntl name="address" />
        <Form.Footer
          primaryText="Save"
          primaryProps={{
            // trigger validation immediately for visual regression:
            autoFocus: true,
            onFocus: () => props.submitForm(),
          }}
        />
      </>
    )}
  </Form>
);
