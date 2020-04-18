import React from 'react';
import { cleanup, fireEvent, wait, waitForElement } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { renderWithContext } from 'z-frontend-theme/test-utils/theme';
import { Button } from 'z-frontend-elements';

import FormCheckbox from './FormCheckbox';
import { Form } from '../Form';

const rememberLabel = 'Remember Me';
const twoFactorLabel = 'Two-Factor Auth';
const agreeLabel = 'I agree to the terms of use.';
const errorMessage = 'You must agree to the terms to proceed.';

describe('FormCheckbox', () => {
  afterEach(cleanup);

  it('can be checked by clicking label', () => {
    const { getByLabelText } = renderWithContext(
      <Form onSubmit={() => {}} initialValues={{ remember: false }}>
        <FormCheckbox name="remember" label={rememberLabel} />
      </Form>,
    );

    const checkbox = getByLabelText(rememberLabel) as HTMLInputElement;

    expect(checkbox).not.toBeChecked();
    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();
  });

  it('supports initial values', () => {
    const { getByLabelText } = renderWithContext(
      <Form initialValues={{ remember: true, twoFactor: false }} onSubmit={() => {}}>
        <FormCheckbox name="remember" label={rememberLabel} />
        <FormCheckbox name="twoFactor" label={twoFactorLabel} />
      </Form>,
    );

    const rememberMeCheckbox = getByLabelText(rememberLabel) as HTMLInputElement;
    expect(rememberMeCheckbox).toBeChecked();
    const twoFactorCheckbox = getByLabelText(twoFactorLabel) as HTMLInputElement;
    expect(twoFactorCheckbox).not.toBeChecked();
  });

  it('supports validation schema', async () => {
    const { getByLabelText, queryAllByText, getByText, getByTestId } = renderWithContext(
      <Form
        initialValues={{ agree: false }}
        validationSchema={{
          agree: Form.Yup.boolean().oneOf([true], errorMessage),
        }}
        onSubmit={values => {}}
      >
        {props => (
          <>
            <FormCheckbox name="agree" label={agreeLabel} />
            <Button data-testid="submitButton" type="submit" mode="primary" inProgress={props.isSubmitting}>
              Submit
            </Button>
          </>
        )}
      </Form>,
    );

    const submitButton = getByTestId('submitButton');
    const checkbox = getByLabelText(agreeLabel);

    expect(queryAllByText(errorMessage)).toHaveLength(0);
    fireEvent.click(submitButton);
    await waitForElement(() => getByText(errorMessage));

    fireEvent.click(checkbox);
    await wait(() => expect(queryAllByText(errorMessage)).toHaveLength(0));
  });
});
