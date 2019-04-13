import React from 'react';

import { Flex } from 'zbase';
import { Button } from 'z-frontend-elements';

import { Form } from '../Form';

const options = [
  { value: 1, label: 'Bo' },
  { value: 2, label: 'Devin' },
  { value: 3, label: 'Christopher' },
  { value: 4, label: 'Eve' },
  { value: 5, label: 'Martin' },
  { value: 6, label: 'Marcus' },
  { value: 7, label: 'Vic' },
];

export default () => (
  <Form
    initialValues={{ assignee: '' }}
    validationSchema={{
      assignee: Form.Yup.string().required('Assignee is a required field.'),
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
          <Form.SelectDeprecated
            name="assignee"
            label="Assignee"
            options={options}
            // trigger validation immediately:
            autoFocus
            onFocus={() => props.setFieldTouched('assignee')}
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
