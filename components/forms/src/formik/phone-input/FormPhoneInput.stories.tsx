import React from 'react';

import { Box } from 'zbase';

import { storiesOf } from '../../../.storybook/storyHelpers';
import { Form, FormPhoneInput } from '../../..';
import { isUSPhoneNumber, US_PHONE_FORMAT } from '../../phone-input/utils';

storiesOf('forms|Form.PhoneInput', module)
  .addDecorator((getStory: Function) => (
    <Box p={20} w={[1, 1 / 2]} bg="grayscale.white">
      {getStory()}
    </Box>
  ))
  .add('basic phone input', () => (
    <Form onSubmit={() => {}} initialValues={{ phone: '5555555555' }}>
      <FormPhoneInput name="phone" label="Phone number" />
    </Form>
  ))
  .add('with validation', () => {
    return (
      <Form
        validationSchema={{
          nationalPhone: Form.Yup.string()
            .required('Phone is required.')
            .matches(US_PHONE_FORMAT, 'Please enter a valid phone number'),
          internationalPhone: Form.Yup.string()
            .required('Phone is required.')
            .test('isValidPhone', 'Please enter a valid phone number', val => {
              if (!val) {
                return true;
              }
              if (isUSPhoneNumber(val)) {
                return val.match(US_PHONE_FORMAT);
              }
              return true;
            }),
        }}
        onSubmit={() => {}}
        initialValues={{ nationalPhone: '5555555555', internationalPhone: '' }}
      >
        {props => (
          <>
            <FormPhoneInput name="nationalPhone" label="US/Canada phone number" />
            <FormPhoneInput allowInternational name="internationalPhone" label="International phone number" />
            <Form.Footer primaryText="Save" cancelShown={false} />
          </>
        )}
      </Form>
    );
  })
  .add('allow international phone input', () => (
    <Form onSubmit={() => {}} initialValues={{ phone: '' }}>
      <FormPhoneInput allowInternational name="phone" label="Phone number" />
    </Form>
  ));
