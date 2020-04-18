import React, { Component } from 'react';

import { Box } from 'zbase';

import { storiesOf } from '../../../.storybook/storyHelpers';
import { Form, FormNumberInput } from '../../..';

storiesOf('forms|FormNumberInput', module)
  .addDecorator((getStory: Function) => (
    <Box p={20} w={[1, 1 / 2]} bg="grayscale.white">
      {getStory()}
    </Box>
  ))
  .add('Variations of number input', () => <VariationsExample />)
  .add('preserveFormattedValue', () => <PreserveFormattedExample />);

const VariationsExample = () => (
  <Form
    debug
    onSubmit={() => {}}
    initialValues={{
      timeOffDays: 10,
      maxInteger: Number.MAX_SAFE_INTEGER,
      minInteger: -1234.56,
      noCommas: 123456,
      randomNumber: 12,
    }}
  >
    <FormNumberInput name="timeOffDays" label="Time off days (Default number input)" />
    <FormNumberInput
      name="maxInteger"
      allowDecimal={false}
      label="Maximum Integer Value (No decimal or negative symbols)"
    />
    <FormNumberInput name="minInteger" allowDecimal allowNegative label="Allow decimal and negatives" />
    <FormNumberInput
      name="noCommas"
      allowDecimal={false}
      includeThousandsSeparator={false}
      label="No commas separating thousands"
    />
    <FormNumberInput
      name="randomNumber"
      allowDecimal={false}
      integerLimit={2}
      label="Limit of 2 integers"
      format="form-row-top-label"
    />
  </Form>
);

class PreserveFormattedExample extends Component {
  render() {
    return (
      <Form
        debug
        onSubmit={() => {}}
        initialValues={{
          timeOffDays: '1234',
        }}
      >
        <FormNumberInput name="timeOffDays" label="Time off days" preserveFormattedValue />
      </Form>
    );
  }
}
