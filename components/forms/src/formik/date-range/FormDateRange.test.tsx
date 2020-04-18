import React from 'react';
import { fireEvent, wait, waitForElement } from '@testing-library/react';

import { renderWithContext } from 'z-frontend-theme/test-utils/theme';

import FormDateRange from '../date-range/FormDateRange';
import { Form } from '../Form';

const errorMessage = 'Start date is required';
const startDateTestId = 'FormDateRangeStartDate';
const endDateTestId = 'FormDateRangeEndDate';
const formFooterPrimaryText = 'Submit';

describe('FormDateRange', () => {
  it('Blur on end date triggers touched state which triggers validation', async () => {
    const submitStub = jest.fn();
    const { getByText, queryAllByText, getByTestId } = renderWithContext(
      <Form
        onSubmit={submitStub}
        initialValues={{ dateRange: FormDateRange.getEmptyValue() }}
        validationSchema={{
          dateRange: Form.Yup.object().test('has-start-date', errorMessage, value => value.startDate),
        }}
      >
        <FormDateRange name="dateRange" label="Date Range" />
        <Form.Footer primaryText={formFooterPrimaryText} />
      </Form>,
    );

    const startRangeInput = getByTestId(startDateTestId);
    const endRangeInput = getByTestId(endDateTestId);
    const submitButton = getByText(formFooterPrimaryText);

    // Clicking input shows calendar dropdown
    expect(queryAllByText('Su')).toHaveLength(0);
    fireEvent.click(startRangeInput);
    getByText('Su');

    // Blur on start date doesn't set touched state to true
    expect(queryAllByText(errorMessage)).toHaveLength(0);
    // Blur on end date set touched state to true
    endRangeInput.focus();
    startRangeInput.focus();
    await waitForElement(() => getByText(errorMessage));

    // Fill in start date
    startRangeInput.focus();
    fireEvent.click(getByText('10'));
    await wait(() => expect(queryAllByText(errorMessage)).toHaveLength(0));

    // Submit form
    fireEvent.click(submitButton);
    await wait(() => {
      expect(submitStub).toHaveBeenCalledTimes(1);
      expect(submitStub).not.toHaveBeenCalledWith(1, {
        dateRange: { startDate: expect.any(String), endDate: '' },
      });
    });
  });
});
