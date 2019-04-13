import React from 'react';

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
  <Form onSubmit={() => {}} initialValues={{ comment: '' }}>
    <Form.MentionTextarea name="comment" options={options} mt={0} />
  </Form>
);
