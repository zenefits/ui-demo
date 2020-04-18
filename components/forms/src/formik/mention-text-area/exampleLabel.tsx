import React from 'react';

import { Form, FormMentionTextarea } from '../../..';

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
    <FormMentionTextarea name="comment" options={options} label="Comment" />
    <FormMentionTextarea name="additional" options={options} label="Additional Comments" optional />
  </Form>
);
