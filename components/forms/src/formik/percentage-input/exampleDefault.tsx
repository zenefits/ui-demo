import React from 'react';

import { Form } from '../Form';

export default () => (
  <Form onSubmit={() => {}} initialValues={{ ownershipPercentage: '33.33' }}>
    <Form.PercentageInput name="ownershipPercentage" label="Percentage owned" />
  </Form>
);
