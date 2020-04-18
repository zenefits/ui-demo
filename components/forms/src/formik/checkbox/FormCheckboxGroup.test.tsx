import React from 'react';
import { cleanup, fireEvent, wait } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { FormCheckboxGroup } from '../../..';
import { renderForm } from '../formikTestUtils';

const options = [
  { value: 'beef', label: 'Beef' },
  { value: 'chicken', label: 'Chicken' },
  { value: 'tofu', label: 'Tofu' },
];

const CheckboxGroupExample = () => (
  <FormCheckboxGroup name="proteins" label="Proteins">
    {({ Checkbox }) => options.map(option => <Checkbox key={option.value} name={option.value} label={option.label} />)}
  </FormCheckboxGroup>
);

// see also common tests under FormComponents.test.tsx (eg show label, show required validation)
describe('Form.CheckboxGroup', () => {
  afterEach(cleanup);

  it('renders all checkboxes', () => {
    const wrapper = renderForm({}, <CheckboxGroupExample />);
    wrapper.getByLabelText('Proteins');
    wrapper.getByLabelText('Beef');
    wrapper.getByLabelText('Chicken');
    wrapper.getByLabelText('Tofu');
  });

  it('submits checked values as booleans', async () => {
    const onSubmit = jest.fn();
    const initialValues = {
      beef: false,
      chicken: false,
      tofu: false,
    };
    const { getByLabelText, getByText } = renderForm<{ beef: boolean; chicken: boolean; tofu: boolean }>(
      initialValues,
      <CheckboxGroupExample />,
      { onSubmit },
    );

    fireEvent.click(getByLabelText('Chicken'));
    fireEvent.click(getByLabelText('Tofu'));
    fireEvent.click(getByText('Save'));

    await wait(() => {
      expect(onSubmit).toHaveBeenCalledWith(
        {
          beef: false,
          chicken: true,
          tofu: true,
        },
        expect.anything(),
      );
    });
  });

  it('submits checked values in array', async () => {
    const onSubmit = jest.fn();
    const { getByLabelText, getByText } = renderForm<{ proteins: string[] }>(
      { proteins: [] },
      <CheckboxGroupExample />,
      { onSubmit },
    );

    fireEvent.click(getByLabelText('Chicken'));
    fireEvent.click(getByLabelText('Tofu'));
    fireEvent.click(getByText('Save'));

    await wait(() => {
      expect(onSubmit).toHaveBeenCalledWith(
        {
          proteins: ['chicken', 'tofu'],
        },
        expect.anything(),
      );
    });
  });
});
