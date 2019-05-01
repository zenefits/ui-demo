import React from 'react';
import { cleanup, fireEvent, wait, RenderResult } from 'react-testing-library';
import 'jest-dom/extend-expect';

import { renderWithContext } from 'z-frontend-theme/test-utils/theme';

import { Form } from '../Form';

interface FormValues {
  email: string;
}

const initialValues: FormValues = {
  email: 'foobar@zenefits.com',
};

describe('Form.TextInput', () => {
  function createForm(props: any = {}) {
    return (
      <Form<FormValues> onSubmit={props.onSubmit} initialValues={initialValues}>
        {formikProps => (
          <>
            <pre data-testid="form-values">{JSON.stringify(formikProps.values)}</pre>
            <Form.TextInput name="email" type="email" label="Email" />
            <Form.Footer cancelText="Reset" cancelOnClick={formikProps.handleReset} primaryText="Save" />
          </>
        )}
      </Form>
    );
  }

  afterEach(cleanup);

  it('renders group label', () => {
    const wrapper = renderWithContext(createForm());
    wrapper.getByLabelText('Email');
  });

  it('submits value', async () => {
    const handleSubmit = jest.fn();
    const wrapper = renderWithContext(createForm({ onSubmit: handleSubmit }));

    const newEmail = 'test@example.com';
    const input = wrapper.getByLabelText('Email');
    (input as any).value = newEmail;
    fireEvent.change(input);
    // NOTE-DZH: this will change when we upgrade RTL v5:
    // fireEvent.change(input, { target: { value: newEmail } });

    verifyFormValues(wrapper, { email: newEmail });
    submitForm(wrapper);

    await wait(() => {
      expect(handleSubmit).toHaveBeenCalledWith(
        {
          email: newEmail,
        },
        expect.anything(),
      );
    });
  });

  it('resets correctly', async () => {
    const wrapper = renderWithContext(createForm());

    // update input
    const newEmail = 'test@example.com';
    const input = wrapper.getByLabelText('Email');
    (input as any).value = newEmail;
    fireEvent.change(input);
    verifyFormValues(wrapper, { email: newEmail });

    // reset the form
    const resetButton = wrapper.getByText('Reset');
    fireEvent.click(resetButton);
    verifyFormValues(wrapper, initialValues);
  });
});

function verifyFormValues(wrapper: RenderResult, values: any) {
  expect(wrapper.getByTestId('form-values')).toHaveTextContent(JSON.stringify(values));
}

function submitForm(wrapper: RenderResult) {
  const submitButton = wrapper.getByText('Save');
  fireEvent.click(submitButton);
}
