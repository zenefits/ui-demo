import React from 'react';

import { Form, FormSelectDeprecated } from '../../..';

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
  <Form onSubmit={() => {}} initialValues={{ assignees: '' }}>
    <FormSelectDeprecated multi name="assignees" label="Assignees" options={options} />
  </Form>
);
