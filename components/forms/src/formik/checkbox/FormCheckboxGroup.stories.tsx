import React, { Component } from 'react';

import { Box } from 'zbase';

import { storiesOf } from '../../../.storybook/storyHelpers';
import { Form, FormCheckboxGroup } from '../../..';
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
        <FormCheckboxGroup>
          {({ Checkbox }) => (
            <>
              <Checkbox name="offers" label="New product offers" />
              <Checkbox name="alerts" label="Service alerts" />
            </>
          )}
        </FormCheckboxGroup>
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
        <FormCheckboxGroup name="subscribe" label="Subscribe">
          {({ Checkbox }) => (
            <>
              <Checkbox name="offers" label="New product offers" />
              <Checkbox name="alerts" label="Service alerts" />
            </>
          )}
        </FormCheckboxGroup>
        <FormCheckboxGroup name="deliveryDate" label="This is a very very very long Delivery Date label" optional>
          {({ Checkbox }) => (
            <>
              <Checkbox name="monday" label="Monday" />
              <Checkbox name="wednesday" label="Wednesday" />
              <Checkbox name="friday" label="Friday" />
            </>
          )}
        </FormCheckboxGroup>
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
        <FormCheckboxGroup name="subscribe" label="Subscribe">
          {({ Checkbox }) => (
            <>
              <Checkbox name="offers" label="New product offers" />
              <Checkbox disabled name="alerts" label="Service alerts" />
            </>
          )}
        </FormCheckboxGroup>
      </Form>
    );
  }
}

class ArrayExample extends Component {
  render() {
    return (
      <Form onSubmit={() => {}} initialValues={{ proteins: [] }} validationSchema={{}}>
        <FormCheckboxGroup name="proteins" label="Proteins">
          {({ Checkbox }) =>
            options.map(option => <Checkbox key={option.value} name={option.value} label={option.label} />)
          }
        </FormCheckboxGroup>
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
            <FormCheckboxGroup name="proteins" label="Proteins">
              {({ Checkbox }) =>
                options.map(option => <Checkbox key={option.value} name={option.value} label={option.label} />)
              }
            </FormCheckboxGroup>
            {/* submit on load for visual testing only */}
            <FormSubmitter submitForm={props.submitForm} />
          </>
        )}
      </Form>
    );
  }
}
