import React from 'react';

import { Flex } from 'zbase';
import { Button } from 'z-frontend-elements';

import { Form, FormMentionTextarea, FormTextarea, FormTextInput } from '../../..';

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
    initialValues={{ mentiontextarea: '', text: '', textarea: '' }}
    onSubmit={(values, actions) => {
      setTimeout(() => {
        actions.setSubmitting(false);
        actions.resetForm();
        console.log(values);
      }, 1000);
    }}
  >
    {props => (
      <>
        <FormTextInput name="text" />
        <FormTextarea name="textarea" />
        <FormMentionTextarea name="mentiontextarea" label="Comment" options={options} />
        <Flex justify="flex-end" mt={4}>
          <Button type="submit" mode="primary" inProgress={props.isSubmitting}>
            Save
          </Button>
        </Flex>
      </>
    )}
  </Form>
);
