import React from 'react';
import { cleanup, fireEvent, wait } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { renderWithContext } from 'z-frontend-theme/test-utils/theme';

import { Form, FormTextInput } from '../../..';

interface FormValues {
  email: string;
}

const initialValues: FormValues = {
  email: 'foobar@zenefits.com',
};

// see also common tests under FormComponents.test.tsx (eg show label, show required validation)
describe('Form.TextInput', () => {
  function createForm(props: any = {}) {
    return (
      <Form<FormValues> onSubmit={props.onSubmit} initialValues={initialValues}>
        {formikProps => (
          <>
            <FormTextInput name="email" type="email" label="Email" />
            <Form.Footer cancelText="Reset" cancelOnClick={formikProps.handleReset} primaryText="Save" />
          </>
        )}
      </Form>
    );
  }

  afterEach(cleanup);

  it('submits value', async () => {
    const handleSubmit = jest.fn();
    const wrapper = renderWithContext(createForm({ onSubmit: handleSubmit }));
    const form = wrapper.container.querySelector('form');

    const newEmail = 'test@example.com';
    const input = wrapper.getByLabelText('Email');
    fireEvent.change(input, { target: { value: newEmail } });
    await wait(() => {
      expect(form).toHaveFormValues({ email: newEmail });
    });

    fireEvent.click(wrapper.getByText('Save'));
    await wait(() => {
      expect(handleSubmit).toHaveBeenCalledWith(
        {
          email: newEmail,
        },
        expect.anything(),
      );
    });
  });
});
