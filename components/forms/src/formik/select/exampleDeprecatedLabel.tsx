import React from 'react';

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
  <Form onSubmit={() => {}} initialValues={{ assignee: '', additional: '' }}>
    <Form.SelectDeprecated name="assignee" label="Assignee" options={options} />
    <Form.SelectDeprecated name="additional" label="Additional Assignee" options={options} optional />
  </Form>
);
