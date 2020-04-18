import React from 'react';
import { cleanup, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { FormNumberInput } from '../../..';
import { NumberInputProps } from '../../number-input/NumberInput';
import { renderForm } from '../formikTestUtils';

interface FormValues {
  age: number;
}

const initialValues: FormValues = {
  age: 18,
};

// see also common tests under FormComponents.test.tsx (eg show label, show required validation)
describe('FormNumberInput', () => {
  function renderFormWithInput(inputProps?: Partial<NumberInputProps>) {
    const input = <FormNumberInput name="age" label="Age" {...inputProps} />;
    return renderForm(initialValues, input);
  }

  afterEach(cleanup);

  it('input shows formatted value', () => {
    const { getByLabelText, getByDisplayValue } = renderFormWithInput();
    fireEvent.change(getByLabelText('Age'), { target: { value: 1234 } });

    getByDisplayValue('1,234');
  });

  it('input only allows number keys', () => {
    const { getFormProps, getByDisplayValue, getByLabelText } = renderFormWithInput();
    fireEvent.change(getByLabelText('Age'), { target: { value: 'abc123def!' } });

    getByDisplayValue('123');
    expect(getFormProps().values).toHaveProperty('age', 123);
  });

  it('integerLimit', () => {
    const { getFormProps, getByDisplayValue, getByLabelText } = renderFormWithInput({ integerLimit: 2 });
    fireEvent.change(getByLabelText('Age'), { target: { value: '12345' } });

    getByDisplayValue('12');
    expect(getFormProps().values).toHaveProperty('age', 12);
  });

  it('allowDecimal', () => {
    const { getFormProps, getByDisplayValue, getByLabelText } = renderFormWithInput({ allowDecimal: true });
    fireEvent.change(getByLabelText('Age'), { target: { value: '123.45' } });

    getByDisplayValue('123.45');
    expect(getFormProps().values).toHaveProperty('age', 123.45);
  });

  it('allowNegative (initial)', () => {
    const { getFormProps, getByDisplayValue, getByLabelText } = renderFormWithInput({ allowNegative: true });
    fireEvent.change(getByLabelText('Age'), { target: { value: '-12,345' } });

    getByDisplayValue('-12,345');
    expect(getFormProps().values).toHaveProperty('age', -12345);
  });

  it('typing', () => {
    const { getFormProps, getByDisplayValue, getByLabelText } = renderFormWithInput({
      allowNegative: true,
      allowDecimal: true,
    });
    const input = getByLabelText('Age');
    fireEvent.change(input, { target: { value: '-' } });
    fireEvent.change(input, { target: { value: '-1' } });
    getByDisplayValue('-1');
    expect(getFormProps().values).toHaveProperty('age', -1);

    fireEvent.change(input, { target: { value: '.' } });
    fireEvent.change(input, { target: { value: '.2' } });
    expect(getFormProps().values).toHaveProperty('age', 0.2);
  });

  it('form value is a number', () => {
    const { getFormProps, getByLabelText, getByDisplayValue } = renderFormWithInput();
    const newAge = 81;
    fireEvent.change(getByLabelText('Age'), { target: { value: newAge } });

    getByDisplayValue('81'); // user sees a string, but form value is a number
    const formValue = getFormProps().values.age;
    expect(typeof formValue).toBe('number');
    expect(formValue).toStrictEqual(newAge);
  });

  describe('preserve formatted', () => {
    it('handles empty', () => {
      const { getFormProps, getByLabelText } = renderFormWithInput({
        preserveFormattedValue: true,
        allowNegative: true,
      });
      fireEvent.change(getByLabelText('Age'), { target: { value: null } });
      expect(getFormProps().values).toHaveProperty('age', '');
    });
    it('handles negative and decimal', () => {
      const { getFormProps, getByLabelText } = renderFormWithInput({
        preserveFormattedValue: true,
        allowNegative: true,
      });
      fireEvent.change(getByLabelText('Age'), { target: { value: '-12,345.67' } });
      expect(getFormProps().values).toHaveProperty('age', '-12,345.67');
    });
  });
});
