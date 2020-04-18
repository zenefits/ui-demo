import React from 'react';
import { fireEvent, wait } from '@testing-library/react';

import { renderWithContext } from 'z-frontend-theme/test-utils/theme';

import { Form } from '../Form';
import FormDaysOfWeekSelect from './FormDaysOfWeekSelect';

describe('FormDaysOfWeekSelect', () => {
  it('can select multiple dates with behaviour checkbox', async () => {
    const initialValue = [false, false, false, false, false, false, false];
    const onSubmit = jest.fn(() => Promise.resolve());

    const { getByText } = renderWithContext(
      <Form onSubmit={onSubmit} initialValues={{ 'days-of-week': initialValue }}>
        {formikProps => (
          <>
            <FormDaysOfWeekSelect name="days-of-week" label="Days of Week" behavior="checkbox" />
            <Form.Footer primaryText="Save" cancelText="Reset" cancelOnClick={formikProps.handleReset} />
          </>
        )}
      </Form>,
    );

    const monday = getByText('M');
    const wednesday = getByText('W');
    const saveButton = getByText('Save');

    fireEvent.click(monday);
    fireEvent.click(wednesday);

    // submits expected value
    const newValue1 = [true, false, true, false, false, false, false];
    fireEvent.click(saveButton);
    await wait(() => expect(onSubmit).toHaveBeenCalledWith({ 'days-of-week': newValue1 }, expect.anything()));

    // unchecks the selected value when clicking again
    fireEvent.click(monday);
    const newValue2 = [false, false, true, false, false, false, false];
    fireEvent.click(saveButton);
    await wait(() => expect(onSubmit).toHaveBeenCalledWith({ 'days-of-week': newValue2 }, expect.anything()));
  });

  it('can select only one date with behaviour radio', async () => {
    const initialValue = 3;
    const onSubmit = jest.fn(() => Promise.resolve());

    const { getByText } = renderWithContext(
      <Form onSubmit={onSubmit} initialValues={{ 'days-of-week': initialValue }}>
        {formikProps => (
          <>
            <FormDaysOfWeekSelect name="days-of-week" label="Days of Week" behavior="radio" />
            <Form.Footer primaryText="Save" cancelText="Reset" cancelOnClick={formikProps.handleReset} />
          </>
        )}
      </Form>,
    );

    const monday = getByText('M');
    const saveButton = getByText('Save');

    fireEvent.click(monday);
    // submits expected value
    fireEvent.click(saveButton);
    await wait(() => expect(onSubmit).toHaveBeenCalledWith({ 'days-of-week': 0 }, expect.anything()));
  });
});
