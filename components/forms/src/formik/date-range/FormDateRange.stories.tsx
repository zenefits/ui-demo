import React, { Component } from 'react';

import { Box } from 'zbase';

import { storiesOf } from '../../../.storybook/storyHelpers';
import OptionalLabelExample from './exampleOptionalLabel';
import DisabledDatePickerExample from './exampleDisabledDayPickers';
import { Form, FormDateRange } from '../../..';

storiesOf('forms|FormDateRange', module)
  .addDecorator((getStory: Function) => (
    <Box p={20} w={[1, 0.7]} bg="grayscale.white">
      {getStory()}
    </Box>
  ))
  .add('default', () => <DefaultExample />)
  .add('initial value', () => <InitialValueExample />)
  .add('optional', () => <OptionalLabelExample />)
  .add('disabled', () => <DisabledDatePickerExample />);

class DefaultExample extends Component {
  render() {
    return (
      <Form
        onSubmit={() => {}}
        initialValues={{ dateRange: FormDateRange.getEmptyValue() }}
        validationSchema={{
          dateRange: FormDateRange.validationSchema,
        }}
      >
        <FormDateRange name="dateRange" label="Date Range" />
      </Form>
    );
  }
}

class InitialValueExample extends Component {
  render() {
    return (
      <Form
        onSubmit={() => {}}
        initialValues={{
          dateRange: {
            startDate: '2019-01-07',
            endDate: '2019-01-14',
          },
        }}
        validationSchema={{
          dateRange: FormDateRange.validationSchema,
        }}
      >
        <FormDateRange name="dateRange" label="Date Range" />
      </Form>
    );
  }
}
