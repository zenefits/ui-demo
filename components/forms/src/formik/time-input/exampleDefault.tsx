import React from 'react';

import { Form } from '../Form';

export default () => (
  <Form
    onSubmit={() => {}}
    initialValues={{ time: Form.TimeInput.getEmptyValue() }}
    validationSchema={{ time: Form.TimeInput.validationSchema }}
  >
    <Form.TimeInput name="time" label="Time" />
  </Form>
);
