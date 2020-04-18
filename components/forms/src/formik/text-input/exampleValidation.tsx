import React from 'react';

import { Flex } from 'zbase';
import { Button } from 'z-frontend-elements';

import { Form, FormTextInput } from '../../..';

export default () => (
  <Form
    initialValues={{ email: 'foobar' }}
    validationSchema={{
      email: Form.Yup.string()
        .email('Email must be a valid email.')
        .required('Email is a required field.'),
    }}
    onSubmit={(values, actions) => {
      setTimeout(() => {
        actions.setSubmitting(false);
        console.log(values);
      }, 1000);
    }}
  >
    {props => {
      return (
        <>
          <FormTextInput
            name="email"
            type="email"
            label="Email"
            // trigger validation immediately:
            autoFocus
            onFocus={() => props.setFieldTouched('email')}
          />
          <Flex justify="flex-end" mt={4}>
            <Button type="submit" mode="primary" inProgress={props.isSubmitting}>
              Save
            </Button>
          </Flex>
        </>
      );
    }}
  </Form>
);
