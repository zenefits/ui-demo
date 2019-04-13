import React, { Component } from 'react';

import { Box } from 'zbase';

import { storiesOf } from '../../../.storybook/storyHelpers';
import { Form } from '../Form';
import FormSubmitter from '../FormSubmitter';

const options = [
  { value: 'beef', label: 'Beef' },
  { value: 'chicken', label: 'Chicken' },
  { value: 'tofu', label: 'Tofu' },
];

storiesOf('forms|Form.CheckboxGroup', module)
  .addDecorator((getStory: Function) => (
    <Box p={20} w={[1, 1 / 2]} bg="grayscale.white">
      {getStory()}
    </Box>
  ))
  .add('default', () => <DefaultExample />)
  .add('with label', () => <LabelExample />)
  .add('disabled', () => <DisabledExample />)
  .add('array with label', () => <ArrayExample />)
  .add('array with validation', () => <ArrayValidationExample />);

class DefaultExample extends Component {
  render() {
    return (
      <Form
        onSubmit={() => {}}
        initialValues={{
          offers: false,
          alerts: false,
        }}
      >
        <Form.CheckboxGroup>
          {({ Checkbox }) => (
            <>
              <Checkbox name="offers" label="New product offers" />
              <Checkbox name="alerts" label="Service alerts" />
            </>
          )}
        </Form.CheckboxGroup>
      </Form>
    );
  }
}

class LabelExample extends Component {
  render() {
    return (
      <Form
        onSubmit={() => {}}
        initialValues={{
          offers: false,
          alerts: false,
          monday: false,
          wednesday: false,
          friday: false,
        }}
      >
        <Form.CheckboxGroup name="subscribe" label="Subscribe">
          {({ Checkbox }) => (
            <>
              <Checkbox name="offers" label="New product offers" />
              <Checkbox name="alerts" label="Service alerts" />
            </>
          )}
        </Form.CheckboxGroup>
        <Form.CheckboxGroup name="deliveryDate" label="This is a very very very long Delivery Date label" optional>
          {({ Checkbox }) => (
            <>
              <Checkbox name="monday" label="Monday" />
              <Checkbox name="wednesday" label="Wednesday" />
              <Checkbox name="friday" label="Friday" />
            </>
          )}
        </Form.CheckboxGroup>
      </Form>
    );
  }
}

class DisabledExample extends Component {
  render() {
    return (
      <Form
        onSubmit={() => {}}
        initialValues={{
          offers: false,
          alerts: false,
        }}
      >
        <Form.CheckboxGroup name="subscribe" label="Subscribe">
          {({ Checkbox }) => (
            <>
              <Checkbox name="offers" label="New product offers" />
              <Checkbox disabled name="alerts" label="Service alerts" />
            </>
          )}
        </Form.CheckboxGroup>
      </Form>
    );
  }
}

class ArrayExample extends Component {
  render() {
    return (
      <Form onSubmit={() => {}} initialValues={{ proteins: [] }} validationSchema={{}}>
        <Form.CheckboxGroup name="proteins" label="Proteins">
          {({ Checkbox }) =>
            options.map(option => <Checkbox key={option.value} name={option.value} label={option.label} />)
          }
        </Form.CheckboxGroup>
      </Form>
    );
  }
}

class ArrayValidationExample extends Component {
  render() {
    return (
      <Form
        onSubmit={() => {}}
        initialValues={{ proteins: [] }}
        validationSchema={{
          proteins: Form.Yup.array().required('Please choose at least one protein.'),
        }}
      >
        {props => (
          <>
            <Form.CheckboxGroup name="proteins" label="Proteins">
              {({ Checkbox }) =>
                options.map(option => <Checkbox key={option.value} name={option.value} label={option.label} />)
              }
            </Form.CheckboxGroup>
            {/* submit on load for visual testing only */}
            <FormSubmitter submitForm={props.submitForm} />
          </>
        )}
      </Form>
    );
  }
}
