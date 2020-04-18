import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, wait } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderWithContext } from 'z-frontend-theme/test-utils/theme';

import { Form } from '../Form';
import { FormMaskedInput } from '..';

type FormValues = { id: string };

const validationMessage = 'Please enter an ID';

// see also common tests under FormComponents.test.tsx (eg show label, show required validation)
describe('FormMaskedInput', () => {
  it('updates form state', async () => {
    const initialValue = '90210';
    const initialValueMasked = '90-210';

    const onSubmit = jest.fn(() => Promise.resolve());

    const { getByLabelText, getByDisplayValue, getByText, queryAllByRole, container, findByText } = renderWithContext(
      <Form<FormValues>
        onSubmit={onSubmit}
        validationSchema={{ id: Form.Yup.string().required(validationMessage) }}
        initialValues={{ id: initialValue }}
      >
        <FormMaskedInput label="ID" name="id" mask={[/\d/, /\d/, '-', /\d/, /\d/, /\d/]} />
        <Form.Footer primaryText="Save" />
      </Form>,
    );

    // masks value
    expect(container.querySelector('form')).toHaveFormValues({ id: initialValueMasked });

    // trigger validation
    // not using user-event type here since it always appends to existing value https://github.com/testing-library/user-event/issues/226
    fireEvent.change(getByDisplayValue(initialValueMasked), { target: { value: '' } });
    fireEvent.click(getByText('Save'));
    await findByText(validationMessage);

    // enter new value
    const newValue = '12345';
    const newValueMasked = '12-345';
    await userEvent.type(getByLabelText('ID'), newValue);
    await wait(() => expect(queryAllByRole('alert')).toHaveLength(0));
    getByDisplayValue(newValueMasked);

    // submits expected value
    fireEvent.click(getByText('Save'));
    await wait(() => expect(onSubmit).toHaveBeenCalledWith({ id: newValueMasked }, expect.anything()));
  });
});
