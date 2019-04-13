import React from 'react';

import { Box } from 'zbase';
import { skipVisualTest } from 'z-frontend-app-bootstrap';

import { storiesOf } from '../../../.storybook/storyHelpers';
import { Form } from '../Form';
import DefaultExample from './exampleDefault';
import LabelExample from './exampleLabel';
import ValueExample from './exampleValue';
import ValidationExample from './exampleValidation';

storiesOf('forms|Form.TextInput', module)
  .addDecorator((getStory: Function) => (
    <Box p={20} w={[1, 1 / 2]} bg="grayscale.white">
      {getStory()}
    </Box>
  ))
  .add('basic input', DefaultExample)
  .add('with label', LabelExample)
  .add('with initial value', ValueExample)
  .add('with type number', () => <NumberExample />, skipVisualTest)
  .add('with validation', ValidationExample);

const NumberExample = () => {
  return (
    <Form onSubmit={() => {}} initialValues={{ count: '' }}>
      <Form.TextInput name="count" label="Count" type="number" step="1" />
    </Form>
  );
};
