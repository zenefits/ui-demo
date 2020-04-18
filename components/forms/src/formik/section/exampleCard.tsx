import React from 'react';

import { Card } from 'z-frontend-composites';

import { Form, FormAddressUS } from '../../..';

export default () => (
  <Form onSubmit={() => {}} initialValues={{}}>
    <Card>
      <Card.Row>
        <Form.Section label="Legal Address" isLabelVisuallyHidden>
          <FormAddressUS name="address" />
        </Form.Section>
      </Card.Row>
    </Card>
  </Form>
);
