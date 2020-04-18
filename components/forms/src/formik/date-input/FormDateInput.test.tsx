import React from 'react';
import { cleanup, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { FormDateInput } from '../../..';
import { renderForm } from '../formikTestUtils';
import { FormDateInputProps } from './FormDateInput';

interface FormValues {
  endDate: string;
}

const initialValues: FormValues = {
  endDate: '2019-03-29',
};

// see also common tests under FormComponents.test.tsx (eg show label, show required validation)
describe('Form.DateInput', () => {
  function renderFormWithInput(inputProps?: Partial<FormDateInputProps>, customInitialValues?: FormValues) {
    const input = <FormDateInput name="endDate" label="End Date" {...inputProps} />;
    return renderForm(customInitialValues || initialValues, input);
  }

  afterEach(cleanup);

  it('handles undefined', () => {
    // NOTE: null triggers a console warning (but works)
    const { getFormProps, getByDisplayValue } = renderFormWithInput({}, { endDate: undefined });
    getByDisplayValue('');
    expect(getFormProps().values).toHaveProperty('endDate', undefined);
  });

  it('handles empty', () => {
    const { getFormProps, getByDisplayValue } = renderFormWithInput({}, { endDate: '' });
    getByDisplayValue('');
    expect(getFormProps().values).toHaveProperty('endDate', '');
  });

  it('input shows localized date but value has ISO standard format', () => {
    const { getFormProps, getByDisplayValue } = renderFormWithInput();
    getByDisplayValue('03/29/2019');
    expect(getFormProps().values).toHaveProperty('endDate', initialValues.endDate);
  });

  it('typing selects the correct date', () => {
    const { getByLabelText, getFormProps, getByDisplayValue } = renderFormWithInput();
    const newValue = '03/29/2019';
    fireEvent.change(getByLabelText('End Date'), { target: { value: newValue } });

    getByDisplayValue(newValue);
    expect(getFormProps().values).toHaveProperty('endDate', '2019-03-29');
  });

  it('typing in the format M/D/YYYY selects the correct date', () => {
    const { getByLabelText, getFormProps, getByDisplayValue } = renderFormWithInput();
    const newValue = '3/3/2019';
    fireEvent.change(getByLabelText('End Date'), { target: { value: newValue } });

    getByDisplayValue('03/03/2019');
    expect(getFormProps().values).toHaveProperty('endDate', '2019-03-03');
  });

  it('clicking day picker dropdown selects the correct date', () => {
    const { container, getByLabelText, getFormProps, getByDisplayValue } = renderFormWithInput();
    getByLabelText('End Date').focus();
    const dayButtonInDropdown = container.querySelector('.DayPicker-Day:not([aria-disabled="true"])');
    fireEvent.click(dayButtonInDropdown);

    getByDisplayValue('03/01/2019'); // first day should be May 1
    expect(getFormProps().values).toHaveProperty('endDate', '2019-03-01');
  });

  it('resets correctly', () => {
    const { getByLabelText, getByDisplayValue, getByText, getFormProps } = renderFormWithInput();

    // update input
    const newValue = '03/01/2019';
    fireEvent.change(getByLabelText('End Date'), { target: { value: newValue } });
    getByDisplayValue(newValue);
    expect(getFormProps().values).toHaveProperty('endDate', '2019-03-01');

    // reset the form
    const resetButton = getByText('Reset');
    fireEvent.click(resetButton);
    getByDisplayValue('03/29/2019');
    expect(getFormProps().values).toBe(initialValues);
  });

  describe('preserve time', () => {
    it('handles empty', () => {
      const { getFormProps, getByLabelText } = renderFormWithInput({
        preserveTime: true,
      });
      fireEvent.change(getByLabelText('End Date'), { target: { value: '' } });

      expect(getFormProps().values).toHaveProperty('endDate', '');
    });
    it('includes time', () => {
      const { getFormProps, getByLabelText } = renderFormWithInput({
        preserveTime: true,
      });
      fireEvent.change(getByLabelText('End Date'), { target: { value: '01/01/2019' } });

      const endDateFormValue = (getFormProps().values.endDate as unknown) as Date;
      expect(endDateFormValue.toISOString()).toBe('2019-01-01T00:00:00.000Z');
    });
  });
});
