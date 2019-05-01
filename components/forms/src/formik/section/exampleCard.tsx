import React from 'react';

import { Card } from 'z-frontend-composites';

import { Form } from '../Form';

export default () => (
  <Form onSubmit={() => {}} initialValues={{}}>
    <Card>
      <Card.Row>
        <Form.Section label="Legal Address" visuallyHidden>
          <Form.AddressUS name="address" />
        </Form.Section>
      </Card.Row>
    </Card>
  </Form>
);
