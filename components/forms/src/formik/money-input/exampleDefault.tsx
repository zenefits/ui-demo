import React from 'react';

import { Form, FormMoneyInput } from '../../..';

export default () => (
  <Form onSubmit={() => {}} initialValues={{ salary: 175000 }}>
    <FormMoneyInput name="salary" label="USA" />
    <FormMoneyInput currency="EUR" name="salary" label="Europe" />
    <FormMoneyInput currency="BGN" name="salary" label="Bulgaria" />
    <FormMoneyInput currency="CHF" name="salary" label="Switzerland" />
    <FormMoneyInput currency="CZK" name="salary" label="Czech Republic" />
    <FormMoneyInput currency="DKK" name="salary" label="Denmark" />
    <FormMoneyInput currency="HRK" name="salary" label="Croatia" />
    <FormMoneyInput currency="GEL" name="salary" label="Georgia" />
    <FormMoneyInput currency="HUF" name="salary" label="Hungary" />
    <FormMoneyInput currency="NOK" name="salary" label="Norway" />
    <FormMoneyInput currency="PLN" name="salary" label="Poland" />
    <FormMoneyInput currency="RUB" name="salary" label="Russia" />
    <FormMoneyInput currency="RON" name="salary" label="Romania" />
  </Form>
);
