import React from 'react';
import userEvent from '@testing-library/user-event';
import { wait } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { renderWithContext } from 'z-frontend-theme/test-utils/theme';

import { Form } from '../Form';
import { FormRadio, FormRadioGroup } from '..';

const options = [
  { value: 'biweekly', label: 'Bi-weekly' },
  { value: 'semimonthly', label: 'Semi-monthly' },
  { value: 'monthly', label: 'Monthly' },
];

// see also common tests under FormComponents.test.tsx (eg show label, show required validation)
describe('FormRadioGroup', () => {
  it('renders necessary labels', async () => {
    const initialValue = 'monthly';
    const onSubmit = jest.fn(() => Promise.resolve());

    const { getByLabelText, getAllByTestId, getByText } = renderWithContext(
      <Form onSubmit={onSubmit} initialValues={{ frequency: initialValue }}>
        {formikProps => (
          <>
            <FormRadioGroup name="frequency" label="Pay Frequency">
              {options.map(option => (
                <FormRadio data-testid="radio" key={option.value} label={option.label} value={option.value} />
              ))}
            </FormRadioGroup>
            <Form.Footer primaryText="Save" cancelText="Reset" cancelOnClick={formikProps.handleReset} />
          </>
        )}
      </Form>,
    );
    getByLabelText('Pay Frequency');
    expect(getAllByTestId('radio')).toHaveLength(3);

    // check initial value
    const initialValueLabel = options.find(option => option.value === initialValue).label;
    expect(getByLabelText(initialValueLabel)).toBeChecked();

    // click on another option and save
    const biWeeklyRadio = getByLabelText('Bi-weekly');
    userEvent.click(biWeeklyRadio);
    await wait(() => expect(biWeeklyRadio).toBeChecked());

    userEvent.click(getByText('Save'));
    await wait(() => expect(onSubmit).toHaveBeenCalledWith({ frequency: 'biweekly' }, expect.anything()));

    // resets back to initial value
    userEvent.click(getByText('Reset'));
    await wait(() => expect(getByLabelText(initialValueLabel)).toBeChecked());
  });
});
