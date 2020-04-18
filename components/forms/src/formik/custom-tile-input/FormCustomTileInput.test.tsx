import React from 'react';
import { fireEvent, wait } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { TextBlock } from 'zbase';
import { renderWithContext } from 'z-frontend-theme/test-utils/theme';

import { Form } from '../Form';
import FormCustomTileInput from '../custom-tile-input/FormCustomTileInput';

const featureOptions = [
  {
    label: 'Time off',
    value: 'pto',
  },
  {
    label: 'Payroll',
    value: 'pyp',
  },
  {
    label: 'Performance management',
    value: 'talent',
  },
];

describe('FormCustomTileInput', () => {
  it('can select multiple tiles with checkbox', async () => {
    const initialValues = { pto: false, pyp: false, talent: false };
    const onSubmit = jest.fn(values => {
      return Promise.resolve();
    });

    const { getByText } = renderWithContext(
      <Form onSubmit={onSubmit} initialValues={initialValues}>
        {formikProps => {
          return (
            <>
              {featureOptions.map(option => (
                <FormCustomTileInput name={option.value} isCheckbox key={option.value} value={option.value}>
                  <TextBlock p={3}>{option.label}</TextBlock>
                </FormCustomTileInput>
              ))}
              <Form.Footer primaryText="Save" cancelText="Reset" cancelOnClick={formikProps.handleReset} />
            </>
          );
        }}
      </Form>,
    );

    const payrollTile = getByText('Payroll');
    const timeOffTile = getByText('Time off');
    const saveButton = getByText('Save');
    const resetButton = getByText('Reset');

    fireEvent.click(payrollTile);
    fireEvent.click(timeOffTile);

    // submits expected value
    const newValue1 = { pto: true, pyp: true, talent: false };
    fireEvent.click(saveButton);
    await wait(() => expect(onSubmit).toHaveBeenCalledWith(newValue1, expect.anything()));

    // unchecks the selected value when clicking again
    fireEvent.click(payrollTile);
    const newValue2 = { pto: true, pyp: false, talent: false };
    fireEvent.click(saveButton);
    await wait(() => expect(onSubmit).toHaveBeenCalledWith(newValue2, expect.anything()));

    // should reset the values
    fireEvent.click(resetButton);
    fireEvent.click(saveButton);
    await wait(() => expect(onSubmit).toHaveBeenCalledWith(initialValues, expect.anything()));
  });

  it('can select can only one tile', async () => {
    const initialValues = { product: 'pyp' };
    const onSubmit = jest.fn(() => Promise.resolve());

    const { getByText } = renderWithContext(
      <Form onSubmit={onSubmit} initialValues={initialValues}>
        {formikProps => {
          return (
            <>
              {featureOptions.map(option => (
                <FormCustomTileInput name="product" key={option.value} value={option.value}>
                  <TextBlock p={3}>{option.label}</TextBlock>
                </FormCustomTileInput>
              ))}
              <Form.Footer primaryText="Save" cancelText="Reset" cancelOnClick={formikProps.handleReset} />
            </>
          );
        }}
      </Form>,
    );

    const timeOffTile = getByText('Time off');
    const saveButton = getByText('Save');
    const resetButton = getByText('Reset');

    fireEvent.click(timeOffTile);

    // submits expected value
    fireEvent.click(saveButton);
    await wait(() => expect(onSubmit).toHaveBeenCalledWith({ product: 'pto' }, expect.anything()));

    // should reset the values
    fireEvent.click(resetButton);
    fireEvent.click(saveButton);
    await wait(() => expect(onSubmit).toHaveBeenCalledWith({ ...initialValues }, expect.anything()));
  });
});
