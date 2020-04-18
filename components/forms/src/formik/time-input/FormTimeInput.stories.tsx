import React from 'react';
// @ts-ignore
import { action } from '@storybook/addon-actions';

import { Box } from 'zbase';

import { storiesOf } from '../../../.storybook/storyHelpers';
import { Form, FormTimeInput } from '../../..';
import { simulateNetworkDelay } from '../Form.stories';

storiesOf('forms|Form.TimeInput', module)
  .addDecorator((getStory: Function) => (
    <Box p={20} w={[1, 1 / 2]} bg="grayscale.white">
      {getStory()}
    </Box>
  ))
  .add('basic input', () => <DefaultExample />)
  .add('optional label', () => <OptionalLabelExample />);

const DefaultExample = () => (
  <Form
    onSubmit={values => simulateNetworkDelay(() => action('select-default-submit')(values))}
    initialValues={{ time: FormTimeInput.getEmptyValue() }}
    validationSchema={{ time: FormTimeInput.validationSchema }}
  >
    <FormTimeInput name="time" label="Time" />
    <Form.Footer primaryText="Submit" />
  </Form>
);

const OptionalLabelExample = () => (
  <Form
    onSubmit={() => {}}
    initialValues={{ time: FormTimeInput.getEmptyValue() }}
    validationSchema={{ time: FormTimeInput.validationSchema }}
  >
    <FormTimeInput name="time" label="Time" optional />
  </Form>
);
