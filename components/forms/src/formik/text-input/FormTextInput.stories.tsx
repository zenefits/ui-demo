import React, { useState } from 'react';

import { Box } from 'zbase';
import { skipVisualTest } from 'z-frontend-app-bootstrap';
import { Button } from 'z-frontend-elements';
import { Example } from 'z-frontend-storybook-config';

import { storiesOf } from '../../../.storybook/storyHelpers';
import { Form, FormTextInput } from '../../..';
import ValueExample from './exampleValue';
import ValidationExample from './exampleValidation';

storiesOf('forms|Form.TextInput', module)
  .addDecorator((getStory: Function) => (
    <Box p={20} w={[1, 2 / 3]} bg="grayscale.white">
      {getStory()}
    </Box>
  ))
  .add('default', () => <DefaultExample />)
  .add('with initial value', ValueExample)
  .add('with help text', () => <DefaultExample helpText="Choose your main meal." />)
  .add('optional', () => <DefaultExample optional helpText="Choose your main meal." />)
  .add('with type number', () => <NumberExample />, skipVisualTest)
  .add('with validation', ValidationExample)
  .add('display mode', () => <DisplayExample />);

const DefaultExample = (fieldProps: any) => {
  return (
    <Form onSubmit={() => {}} initialValues={{ preferred: '' }}>
      <FormTextInput name="preferred" label="Preferred Name" {...fieldProps} />
    </Form>
  );
};

const NumberExample = () => {
  return (
    <Form onSubmit={() => {}} initialValues={{ count: '' }}>
      <FormTextInput name="count" label="Count" type="number" step="1" />
    </Form>
  );
};

const DisplayExample: React.FunctionComponent<{}> = props => {
  const [displayOnly, setDisplayOnly] = useState(true);
  return (
    <Box>
      <Form onSubmit={() => {}} initialValues={{ count: 100 }}>
        <Example label="Display only mode">
          <Box mb={2}>
            <FormTextInput s="small" name="count" label="Count" displayOnly={displayOnly} />
          </Box>
          <Box mb={2}>
            <FormTextInput s="medium" name="count" label="Count" displayOnly={displayOnly} />
          </Box>
          <Box mb={2}>
            <FormTextInput s="large" name="count" label="Count" displayOnly={displayOnly} />
          </Box>
        </Example>
      </Form>
      <Button onClick={() => setDisplayOnly(!displayOnly)}>Toggle mode</Button>
    </Box>
  );
};
