import React from 'react';
import { fireEvent, wait, waitForElement } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderWithContext } from 'z-frontend-theme/test-utils/theme';

import { Form } from '../Form';
import FormPhoneInput from '../phone-input/FormPhoneInput';
import { isUSPhoneNumber, US_PHONE_FORMAT } from '../../phone-input/utils';

const emptyFieldMessage = 'Phone number is required';
const invalidNumberMessage = 'Please enter a valid phone number';

// see also common tests under FormComponents.test.tsx (eg show label, show required validation)
describe('FormPhoneInput', () => {
  it('changes form state and apply mask for national Phone number ', async () => {
    const onSubmit = jest.fn(() => Promise.resolve());

    const { getByText, findByText, getByLabelText, queryAllByRole } = renderWithContext(
      <Form
        validationSchema={{
          nationalPhone: Form.Yup.string()
            .required(emptyFieldMessage)
            .matches(US_PHONE_FORMAT, invalidNumberMessage),
        }}
        onSubmit={onSubmit}
        initialValues={{ nationalPhone: '' }}
      >
        {props => (
          <>
            <FormPhoneInput name="nationalPhone" label="US/Canada phone number" />
            <Form.Footer primaryText="Save" cancelText="Reset" cancelOnClick={props.handleReset} />
          </>
        )}
      </Form>,
    );

    const saveButton = getByText('Save');
    const phoneInput = getByLabelText('US/Canada phone number');

    // trigger validation
    fireEvent.click(saveButton);
    await findByText(emptyFieldMessage);

    // enter invalid phone number and validate
    await userEvent.type(phoneInput, '555');
    userEvent.click(saveButton);
    await findByText(invalidNumberMessage);

    // enter a valid phone number
    await userEvent.type(phoneInput, '5555555');
    await wait(() => expect(queryAllByRole('alert')).toHaveLength(0));

    // submit the form with the correct value
    userEvent.click(saveButton);
    await wait(() => expect(onSubmit).toHaveBeenCalledWith({ nationalPhone: '(555) 555-5555' }, expect.anything()));
  });

  it('changes form state and applies mask for international Phone number', async () => {
    const onSubmit = jest.fn(() => Promise.resolve());

    const { getByText, getByDisplayValue, getByLabelText, queryAllByRole, findByText } = renderWithContext(
      <Form
        validationSchema={{
          internationalPhone: Form.Yup.string()
            .required(emptyFieldMessage)
            .test('isValidPhone', invalidNumberMessage, val => {
              if (!val) {
                return true;
              }
              if (isUSPhoneNumber(val)) {
                return val.match(US_PHONE_FORMAT);
              }
              return true;
            }),
        }}
        onSubmit={onSubmit}
        initialValues={{ internationalPhone: '' }}
      >
        {props => (
          <>
            <FormPhoneInput allowInternational name="internationalPhone" label="International phone number" />
            <Form.Footer primaryText="Save" cancelText="Reset" cancelOnClick={props.handleReset} />
          </>
        )}
      </Form>,
    );

    const saveButton = getByText('Save');
    const phoneInput = getByLabelText('International phone number');

    // trigger validation
    fireEvent.click(saveButton);
    await findByText(emptyFieldMessage);

    // enter invalid phone number and validate
    await userEvent.type(phoneInput, '555');
    userEvent.click(saveButton);
    await findByText(invalidNumberMessage);

    // should match US_PHONE_FORMAT
    await userEvent.type(phoneInput, '5555555');
    await wait(() => expect(queryAllByRole('alert')).toHaveLength(0));
    getByDisplayValue('(555) 555-5555');

    // should match international number format
    fireEvent.change(phoneInput, { target: { value: '919842222976' } });
    await waitForElement(() => getByDisplayValue('+919842222976'));

    // submit the form with the correct value
    userEvent.click(saveButton);
    await wait(() => expect(onSubmit).toHaveBeenCalledWith({ internationalPhone: '+919842222976' }, expect.anything()));
  });
});
