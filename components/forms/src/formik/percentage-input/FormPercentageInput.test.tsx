import React from 'react';
import { cleanup, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { FormPercentageInput } from '../../..';
import { PercentageInputProps } from '../../percentage-input/PercentageInput';
import { renderForm } from '../formikTestUtils';

interface FormValues {
  vitaminC: number;
}

const initialValues: FormValues = {
  vitaminC: 18,
};

// see also common tests under FormComponents.test.tsx (eg show label, show required validation)
describe('Form.PercentageInput', () => {
  function renderFormWithInput(inputProps?: Partial<PercentageInputProps>) {
    const input = <FormPercentageInput name="vitaminC" label="Vitamin C" {...inputProps} />;
    return renderForm(initialValues, input);
  }

  afterEach(cleanup);

  it('input shows formatted value with % suffix', () => {
    const { getByLabelText, getByDisplayValue } = renderFormWithInput();
    fireEvent.change(getByLabelText('Vitamin C'), { target: { value: 12 } });

    getByDisplayValue('12');
  });

  it('integerLimit', () => {
    const { getFormProps, getByDisplayValue, getByLabelText } = renderFormWithInput({ integerLimit: 2 });
    fireEvent.change(getByLabelText('Vitamin C'), { target: { value: '12345' } });

    getByDisplayValue('12');
    expect(getFormProps().values).toHaveProperty('vitaminC', 12);
  });

  it('allowDecimal', () => {
    const { getFormProps, getByDisplayValue, getByLabelText } = renderFormWithInput({ allowDecimal: true });
    fireEvent.change(getByLabelText('Vitamin C'), { target: { value: '123.45' } });

    getByDisplayValue('123.45');
    expect(getFormProps().values).toHaveProperty('vitaminC', 123.45);
  });

  it('typing', () => {
    const { getFormProps, getByDisplayValue, getByLabelText } = renderFormWithInput({
      allowNegative: true,
      allowDecimal: true,
    });
    const input = getByLabelText('Vitamin C');
    fireEvent.change(input, { target: { value: '-' } });
    fireEvent.change(input, { target: { value: '-1' } });
    getByDisplayValue('-1');
    expect(getFormProps().values).toHaveProperty('vitaminC', -1);

    fireEvent.change(input, { target: { value: '.' } });
    fireEvent.change(input, { target: { value: '.2' } });
    expect(getFormProps().values).toHaveProperty('vitaminC', 0.2);
  });

  describe('preserve formatted', () => {
    it('handles empty', () => {
      const { getFormProps, getByLabelText } = renderFormWithInput({
        preserveFormattedValue: true,
        allowNegative: true,
      });
      fireEvent.change(getByLabelText('Vitamin C'), { target: { value: null } });
      expect(getFormProps().values).toHaveProperty('vitaminC', '');
    });
    it('handles negative and decimal', () => {
      const { getFormProps, getByLabelText } = renderFormWithInput({
        preserveFormattedValue: true,
        allowNegative: true,
      });
      fireEvent.change(getByLabelText('Vitamin C'), { target: { value: '-12.67' } });
      expect(getFormProps().values).toHaveProperty('vitaminC', '-12.67');
    });
  });
});
