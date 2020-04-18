import React from 'react';

import { Form, FormTextarea } from '../../..';

export default () => (
  <Form onSubmit={() => {}} initialValues={{ description: '' }}>
    <FormTextarea name="description" mt={0} />
  </Form>
);
