import React from 'react';

import { Form, FormDateInput } from '../../..';

export default () => (
  <Form onSubmit={() => {}} initialValues={{ date: '2019-03-29' }}>
    <FormDateInput name="date" label="Date" />
  </Form>
);
