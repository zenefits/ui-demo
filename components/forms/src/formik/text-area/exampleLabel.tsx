import React from 'react';

import { Form, FormTextarea } from '../../..';

export default () => (
  <Form onSubmit={() => {}} initialValues={{ description: '', comment: '' }}>
    <FormTextarea name="description" label="Description" />
    <FormTextarea
      name="comment"
      label="Comments"
      optional
      helpText="Additional comments you have. These will be visible only to you."
    />
  </Form>
);
