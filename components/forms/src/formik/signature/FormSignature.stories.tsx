import React, { Component } from 'react';

import { Box } from 'zbase';

import { storiesOf } from '../../../.storybook/storyHelpers';
import LabelExample from './exampleLabel';
import { Form, FormSignature, SignatureValue } from '../../..';
import { signatureInitials, tooSmallSignature } from '../../signature/signatureData';

const smallValue: SignatureValue = {
  dataUrl: tooSmallSignature,
  date: new Date('2020-01-01'),
  valid: false,
};

storiesOf('forms|Form.Signature', module)
  .addDecorator((getStory: Function) => (
    <Box p={20} w={[1, 700]} bg="grayscale.white">
      {getStory()}
    </Box>
  ))
  .add('default', () => <DefaultExample />)
  .add('with initial value', () => <ValueExample />)
  .add('with label', LabelExample)
  .add('with validation', () => <ValidationExample initialValue={FormSignature.getEmptyValue()} />)
  .add('with validation (too small)', () => <ValidationExample initialValue={smallValue} />);

class DefaultExample extends Component {
  render() {
    return (
      <Form onSubmit={() => {}} initialValues={{ signature: FormSignature.getEmptyValue() }}>
        <FormSignature name="signature" />
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
        <FormSignature name="signature" />
      </Form>
    );
  }
}

class ValidationExample extends Component<{ initialValue: any }> {
  render() {
    return (
      <Form
        initialValues={{ signature: this.props.initialValue }}
        validationSchema={{
          signature: FormSignature.getValidationSchema('Signature'),
        }}
        onSubmit={(values, actions) => {
          actions.setSubmitting(false);
          console.log(values);
        }}
      >
        {props => {
          return (
            <>
              <FormSignature name="signature" label="Signature" />
              <Form.Footer
                primaryText="Save"
                primaryProps={{
                  // trigger validation immediately:
                  autoFocus: true,
                  onFocus: () => props.submitForm(),
                }}
              />
            </>
          );
        }}
      </Form>
    );
  }
}
