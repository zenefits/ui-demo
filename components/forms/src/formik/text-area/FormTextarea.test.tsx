import React from 'react';
import { cleanup, fireEvent, wait } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';

import { renderWithContext } from 'z-frontend-theme/test-utils/theme';

import FormTextarea from './FormTextarea';
import { Form } from '../Form';

type FormValues = { description: string };

// see also common tests under FormComponents.test.tsx (eg show label, show required validation)
describe('FormTextarea', () => {
  afterEach(cleanup);

  it('updates form state', async () => {
    const initialValue = 'Annual self review';
    const onSubmit = jest.fn(() => Promise.resolve());

    const { findByDisplayValue, getByDisplayValue, getByLabelText, getByText } = renderWithContext(
      <Form<FormValues> onSubmit={onSubmit} initialValues={{ description: initialValue }}>
        <FormTextarea name="description" label="Description" />
        <Form.Footer primaryText="Save" />
      </Form>,
    );

    // enter new value
    const newValue = 'A new value';
    fireEvent.change(getByDisplayValue(initialValue), { target: { value: '' } }); // clear value
    await userEvent.type(getByLabelText('Description'), newValue);
    await findByDisplayValue(newValue);

    // submits expected value
    userEvent.click(getByText('Save'));
    await wait(() => {
      expect(onSubmit).toBeCalledTimes(1);
      expect(onSubmit).toHaveBeenCalledWith({ description: newValue }, expect.anything());
    });
  });
});
