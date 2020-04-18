import React from 'react';

import { Form, FormMentionTextarea } from '../../..';

const initialValues = { comment: 'Hey [@234], can you take a look at this?' };

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
  <Form initialValues={initialValues} onSubmit={() => {}}>
    <FormMentionTextarea name="comment" label="Comment" options={options} />
  </Form>
);
