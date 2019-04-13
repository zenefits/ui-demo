import React from 'react';

import { Form } from '../Form';

const groups = [
  {
    groupName: 'Warriors',
    options: [
      { value: 30, label: 'Steph' },
      { value: 35, label: 'Kevin' },
      { value: 11, label: 'Klay' },
      { value: 23, label: 'Draymond' },
    ],
  },
  {
    groupName: 'Celtics',
    options: [
      { value: 11, label: 'Kyrie' },
      { value: 0, label: 'Jayson' },
      { value: 7, label: 'Jaylen' },
      { value: 20, label: 'Gordon' },
      { value: 42, label: 'Al' },
    ],
  },
];

export default () => (
  <>
    <Form onSubmit={() => {}} initialValues={{ player: null }}>
      <Form.GroupSelect name="player" label="Player" groups={groups} />
      <Form.GroupSelect name="disabled-example" label="Disabled example" groups={groups} disabled />
      <Form.GroupSelect
        name="placeholder-example"
        label="Placeholder example"
        groups={groups}
        placeholder="Pick a player..."
      />
      <Form.GroupSelect name="optional-example" label="Optional Label Example" groups={groups} optional />
    </Form>
    <Form onSubmit={() => {}} initialValues={{ player: { value: 30, label: 'Steph' } }}>
      <Form.GroupSelect name="player" label="Default Value Example" groups={groups} />
    </Form>
  </>
);
