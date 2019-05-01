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
  <Form onSubmit={() => {}} initialValues={{ comment: '', additional: '' }}>
    <Form.MentionTextarea name="comment" options={options} label="Comment" />
    <Form.MentionTextarea name="additional" options={options} label="Additional Comments" optional />
  </Form>
);
