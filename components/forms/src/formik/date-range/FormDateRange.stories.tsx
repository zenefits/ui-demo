import React, { Component } from 'react';
// @ts-ignore
import { action } from '@storybook/addon-actions';

import { Box } from 'zbase';

import { storiesOf } from '../../../.storybook/storyHelpers';
import DefaultExample from './exampleDefault';
import OptionalLabelExample from './exampleOptionalLabel';
import { Form } from '../Form';

storiesOf('forms|Form.DateRange', module)
  .addDecorator((getStory: Function) => (
    <Box p={20} w={[1, 0.7]} bg="grayscale.white">
      {getStory()}
    </Box>
  ))
  .add('default', () => <DefaultExample />)
  .add('initial value', () => <InitialValueExample />)
  .add('optional', () => <OptionalLabelExample />);

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
      >
        <Form.DateRange name="dateRange" label="Date Range" />
      </Form>
    );
  }
}
