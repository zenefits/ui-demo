import React from 'react';

import { Box, TextBlock } from 'zbase';

import { Form } from '../Form';

export default () => (
  <Form onSubmit={() => {}} initialValues={{ allow: false }}>
    <Box mb={3}>
      <TextBlock bold>Do:</TextBlock>
      <Form.Checkbox name="allow" label="Allow Changes" />
    </Box>

    <Box mb={3}>
      <TextBlock bold>Avoid:</TextBlock>
      <Form.Checkbox name="allow" label="Update Changes" />
    </Box>

    <Box>
      <TextBlock bold>Never:</TextBlock>
      <Form.Checkbox name="allow" label="Let users change stuff." containerProps={{ mb: 1 }} />
      <Form.Checkbox name="allow2" label="Don't Allow Changes" />
    </Box>
  </Form>
);
