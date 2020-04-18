import React from 'react';

import { Flex } from 'zbase';
import { Button } from 'z-frontend-elements';

import { Form, FormCheckbox } from '../../..';

export default () => (
  <Form
    initialValues={{ agree: false }}
    validationSchema={{
      agree: Form.Yup.boolean().oneOf([true], 'You must agree to the terms to proceed.'),
    }}
    onSubmit={(values, actions) => {
      setTimeout(() => {
        actions.setSubmitting(false);
        console.log(values);
      }, 1000);
    }}
  >
    {props => (
      <>
        <FormCheckbox name="agree" label="I agree to the terms of use." />
        <Flex justify="flex-end" mt={4}>
          <Button
            type="submit"
            mode="primary"
            inProgress={props.isSubmitting}
            // trigger validation immediately:
            autoFocus
            onFocus={() => props.submitForm()}
          >
            Continue
          </Button>
        </Flex>
      </>
    )}
  </Form>
);
