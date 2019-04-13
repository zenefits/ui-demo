import React from 'react';

import { Flex } from 'zbase';
import { Button } from 'z-frontend-elements';

import { Form } from '../Form';

export default () => (
  <Form
    initialValues={{ description: 'n/a' }}
    validationSchema={{
      description: Form.Yup.string()
        .min(5, 'Description must be at least 5 characters.')
        .required('Description is a required field.'),
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
          <Form.Textarea
            name="description"
            label="Description"
            // trigger validation immediately:
            autoFocus
            onFocus={() => props.setFieldTouched('description')}
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
