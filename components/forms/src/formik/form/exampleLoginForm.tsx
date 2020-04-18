import React from 'react';

import { Form, FormCheckbox, FormSelectDeprecated, FormTextarea, FormTextInput } from '../../..';

const loginOptions = [
  { value: 'login', label: 'Log in existing user' },
  { value: 'signup', label: 'Sign up new user' },
];

const loginValidationSchema = {
  email: Form.Yup.string()
    .email('Email must be a valid email.')
    .required('Email is a required field.'),
  password: Form.Yup.string()
    .min(5, 'Password must be at least 5 characters.')
    .required('Password is a required field.'),
  source: Form.Yup.string().required('Source is a required field.'),
};

export default () => (
  <Form
    initialValues={{ type: 'login', email: '', password: '', remember: false, source: '' }}
    validationSchema={loginValidationSchema}
    onSubmit={(values, actions) => {
      setTimeout(() => {
        actions.setSubmitting(false);
        console.log(values);
      }, 1000);
    }}
  >
    {props => (
      <>
        <FormSelectDeprecated name="type" options={loginOptions} />
        <FormTextInput name="email" type="email" label="Email" />
        <FormTextInput name="password" type="password" label="Password" />
        <FormCheckbox name="remember" label="Remember me" />
        <FormTextarea name="source" label="How did you hear about us?" />
        <Form.Footer primaryText="Login" />
      </>
    )}
  </Form>
);
