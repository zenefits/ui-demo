import React from 'react';

import { Form, FormTextarea } from '../../..';

const initialValues = { description: 'Annual self review' };

export default () => (
  <Form initialValues={initialValues} onSubmit={() => {}}>
    <FormTextarea name="description" label="Description" autoGrow />
  </Form>
);
