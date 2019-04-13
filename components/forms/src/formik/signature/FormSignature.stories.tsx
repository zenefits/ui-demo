import React, { Component } from 'react';

import { Box, Flex } from 'zbase';
import { Button } from 'z-frontend-elements';

import { storiesOf } from '../../../.storybook/storyHelpers';
import LabelExample from './exampleLabel';
import { Form } from '../Form';
import { signatureInitials } from '../../signature/signatureData';

storiesOf('forms|Form.Signature', module)
  .addDecorator((getStory: Function) => (
    <Box p={20} w={[1, 700]} bg="grayscale.white">
      {getStory()}
    </Box>
  ))
  .add('default', () => <DefaultExample />)
  .add('with initial value', () => <ValueExample />)
  .add('with label', LabelExample)
  .add('with validation', () => <ValidationExample />);

class DefaultExample extends Component {
  render() {
    return (
      <Form onSubmit={() => {}} initialValues={{ signature: Form.Signature.getEmptyValue() }}>
        <Form.Signature name="signature" />
      </Form>
    );
  }
}

class ValueExample extends Component {
  render() {
    return (
      <Form
        onSubmit={() => {}}
        initialValues={{ signature: { dataUrl: signatureInitials, date: new Date('2019-01-01') } }}
      >
        <Form.Signature name="signature" />
      </Form>
    );
  }
}

class ValidationExample extends Component {
  render() {
    return (
      <Form
        initialValues={{ signature: Form.Signature.getEmptyValue() }}
        validationSchema={{
          signature: Form.Signature.getValidationSchema('Signature'),
        }}
        onSubmit={(values, actions) => {
          actions.setSubmitting(false);
          console.log(values);
        }}
      >
        {props => {
          return (
            <>
              <Form.Signature name="signature" label="Signature" />
              <Flex justify="flex-end" mt={4}>
                <Button
                  type="submit"
                  mode="primary"
                  inProgress={props.isSubmitting}
                  // trigger validation immediately (for snapshots):
                  autoFocus
                  onFocus={() => {
                    props.setFieldTouched('signature');
                  }}
                >
                  Save
                </Button>
              </Flex>
            </>
          );
        }}
      </Form>
    );
  }
}
