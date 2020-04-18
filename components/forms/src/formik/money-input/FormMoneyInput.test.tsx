import React from 'react';
import { cleanup, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { FormMoneyInput } from '../../..';

import { renderForm } from '../formikTestUtils';
import { MoneyInputProps } from '../../money-input/MoneyInput';

interface FormValues {
  salary: number;
}

const initialValues: FormValues = {
  salary: 123,
};

// see also common tests under FormComponents.test.tsx (eg show label, show required validation)
describe('Form.MoneyInput', () => {
  function renderFormWithInput(inputProps?: Partial<MoneyInputProps>) {
    const input = <FormMoneyInput name="salary" label="Salary" {...inputProps} />;
    return renderForm(initialValues, input);
  }

  afterEach(cleanup);

  it('input shows formatted value with $ prefix', () => {
    const { getByLabelText, getByDisplayValue } = renderFormWithInput();
    fireEvent.change(getByLabelText('Salary'), { target: { value: 12 } });

    getByDisplayValue('12');
  });

  it('integerLimit', () => {
    const { getFormProps, getByDisplayValue, getByLabelText } = renderFormWithInput({ integerLimit: 2 });
    fireEvent.change(getByLabelText('Salary'), { target: { value: '12345' } });

    getByDisplayValue('12');
    expect(getFormProps().values).toHaveProperty('salary', 12);
  });

  it('allowDecimal', () => {
    const { getFormProps, getByDisplayValue, getByLabelText } = renderFormWithInput({ allowDecimal: true });
    fireEvent.change(getByLabelText('Salary'), { target: { value: '1234.56' } });

    getByDisplayValue('1,234.56');
    expect(getFormProps().values).toHaveProperty('salary', 1234.56);
  });

  it('typing', () => {
    const { getFormProps, getByDisplayValue, getByLabelText } = renderFormWithInput({
      allowNegative: true,
      allowDecimal: true,
    });
    const input = getByLabelText('Salary');
    fireEvent.change(input, { target: { value: '-' } });
    fireEvent.change(input, { target: { value: '-1' } });
    getByDisplayValue('-1');
    expect(getFormProps().values).toHaveProperty('salary', -1);

    fireEvent.change(input, { target: { value: '.' } });
    fireEvent.change(input, { target: { value: '.2' } });
    expect(getFormProps().values).toHaveProperty('salary', 0.2);
  });

  it('resets correctly', () => {
    const { getByLabelText, getByDisplayValue, getByText, getFormProps } = renderFormWithInput();

    // update input
    const newValue = 81;
    const input = getByLabelText('Salary');
    fireEvent.change(input, { target: { value: newValue } });
    getByDisplayValue(`${newValue}`);
    expect(getFormProps().values).toHaveProperty('salary', newValue);

    // reset the form
    const resetButton = getByText('Reset');
    fireEvent.click(resetButton);
    getByDisplayValue(`${initialValues.salary}`);
    expect(getFormProps().values).toBe(initialValues);
  });

  describe('preserve formatted', () => {
    it('handles empty', () => {
      const { getFormProps, getByLabelText } = renderFormWithInput({
        preserveFormattedValue: true,
      });
      fireEvent.change(getByLabelText('Salary'), { target: { value: null } });
      expect(getFormProps().values).toHaveProperty('salary', '');
    });
    it('handles negative and decimal', () => {
      const { getFormProps, getByLabelText } = renderFormWithInput({
        preserveFormattedValue: true,
        allowNegative: true,
      });
      fireEvent.change(getByLabelText('Salary'), { target: { value: '-12.67' } });
      expect(getFormProps().values).toHaveProperty('salary', '-12.67');
    });
  });
});
