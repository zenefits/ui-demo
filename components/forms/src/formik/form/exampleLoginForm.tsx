import React from 'react';

import { Form } from '../Form';

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
        <Form.SelectDeprecated name="type" options={loginOptions} />
        <Form.TextInput name="email" type="email" label="Email" />
        <Form.TextInput name="password" type="password" label="Password" />
        <Form.Checkbox name="remember" label="Remember me" />
        <Form.Textarea name="source" label="How did you hear about us?" />
        <Form.Footer primaryText="Login" />
      </>
    )}
  </Form>
);
