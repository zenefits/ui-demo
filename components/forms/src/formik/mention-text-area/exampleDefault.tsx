import React from 'react';

import { Form, FormMentionTextarea } from '../../..';

const options = [
  {
    id: 'a_234',
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
    <FormMentionTextarea name="comment" options={options} mt={0} />
  </Form>
);
