import React from 'react';

import { Flex } from 'zbase';
import { Button } from 'z-frontend-elements';

import { Form } from '../Form';

const options = [
  {
    id: '234',
    menuLabel: `Meghan Markle — marklesparkle@zenefits.com`,
    tagLabel: 'Meghan',
  },
  {
    id: '11',
    menuLabel: `Elizabeth Queen — thequeen@zenefits.com`,
    tagLabel: 'Elizabeth',
  },
];

export default () => (
  <Form
    initialValues={{ comment: '' }}
    validationSchema={{
      comment: Form.Yup.string().required('Comment is a required field.'),
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
          <Form.MentionTextarea
            name="comment"
            label="Comment"
            options={options}
            // trigger validation immediately:
            autoFocus
            onFocus={() => props.setFieldTouched('comment')}
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
