import React from 'react';
import { cleanup, fireEvent, wait } from 'react-testing-library';
import 'jest-dom/extend-expect';

import { renderWithContext } from 'z-frontend-theme/test-utils/theme';

import { Form } from '../Form';

interface FormValues {
  proteins: string[];
}

const options = [
  { value: 'beef', label: 'Beef' },
  { value: 'chicken', label: 'Chicken' },
  { value: 'tofu', label: 'Tofu' },
];

const initialValues: FormValues = {
  proteins: [],
};

describe('Form.CheckboxGroup', () => {
  function createForm(props: any = {}) {
    return (
      <Form<FormValues> onSubmit={props.onSubmit} initialValues={initialValues}>
        {formikProps => (
          <>
            <pre data-testid="form-values">{JSON.stringify(formikProps.values)}</pre>
            <Form.CheckboxGroup name="proteins" label="Proteins">
              {({ Checkbox }) =>
                options.map(option => <Checkbox key={option.value} name={option.value} label={option.label} />)
              }
            </Form.CheckboxGroup>
            <Form.Footer cancelText="Reset" cancelOnClick={formikProps.handleReset} primaryText="Save" />
          </>
        )}
      </Form>
    );
  }

  afterEach(cleanup);

  it('renders group label', () => {
    const wrapper = renderWithContext(createForm());
    wrapper.getByLabelText('Proteins');
  });

  it('renders checkboxes', () => {
    const wrapper = renderWithContext(createForm());
    wrapper.getByLabelText('Proteins');
    wrapper.getByLabelText('Beef');
    wrapper.getByLabelText('Chicken');
    wrapper.getByLabelText('Tofu');
  });

  it('submits checked values in array', async () => {
    const handleSubmit = jest.fn();
    const wrapper = renderWithContext(createForm({ onSubmit: handleSubmit }));

    const checkbox = wrapper.getByLabelText('Chicken');
    fireEvent.click(checkbox);

    const submitButton = wrapper.getByText('Save');
    fireEvent.click(submitButton);

    await wait(() => {
      expect(handleSubmit).toHaveBeenCalledWith(
        {
          proteins: ['chicken'],
        },
        expect.anything(),
      );
    });
  });

  it('resets correctly', async () => {
    const wrapper = renderWithContext(createForm());

    // check some boxes
    const checkbox = wrapper.getByLabelText('Tofu');
    fireEvent.click(checkbox);
    const checkbox2 = wrapper.getByLabelText('Chicken');
    fireEvent.click(checkbox2);
    expect(wrapper.getByTestId('form-values')).toHaveTextContent(JSON.stringify({ proteins: ['tofu', 'chicken'] }));

    // reset the form
    const resetButton = wrapper.getByText('Reset');
    fireEvent.click(resetButton);
    expect(wrapper.getByTestId('form-values')).toHaveTextContent(JSON.stringify(initialValues));
  });
});
