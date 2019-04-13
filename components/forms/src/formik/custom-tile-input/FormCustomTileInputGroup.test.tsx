import React from 'react';
import { cleanup, fireEvent, wait } from 'react-testing-library';
import 'jest-dom/extend-expect';

import { renderWithContext } from 'z-frontend-theme/test-utils/theme';

import { Form } from '../Form';

interface FormValues {
  chicken: boolean;
  beef: boolean;
  tofu: boolean;
  radio: string;
}

const checkboxOptions = [
  { value: 'beef', label: 'Beef' },
  { value: 'chicken', label: 'Chicken' },
  { value: 'tofu', label: 'Tofu' },
];

const radioOptions = ['1', '2', '3', '4'];

const initialValues: FormValues = {
  chicken: false,
  beef: false,
  tofu: false,
  radio: '1',
};

describe('Form.CustomTileInputGroup', () => {
  function createForm(props: any = {}) {
    return (
      <Form<FormValues> onSubmit={props.onSubmit} initialValues={initialValues}>
        {formikProps => (
          <>
            <pre data-testid="form-values">{JSON.stringify(formikProps.values)}</pre>
            <Form.CustomTileInputGroup isCheckbox>
              {TileInput =>
                checkboxOptions.map(option => <TileInput key={option.value} name={option.value} label={option.label} />)
              }
            </Form.CustomTileInputGroup>
            <Form.CustomTileInputGroup>
              {TileInput =>
                radioOptions.map(option => <TileInput key={option} label={option} value={option} name="radio" />)
              }
            </Form.CustomTileInputGroup>
            <Form.Footer primaryText="Save" />
          </>
        )}
      </Form>
    );
  }

  afterEach(cleanup);

  it('renders checkboxes', () => {
    const wrapper = renderWithContext(createForm());
    wrapper.getByText('Beef');
    wrapper.getByText('Chicken');
    wrapper.getByText('Tofu');
  });

  it('renders radios', () => {
    const wrapper = renderWithContext(createForm());
    wrapper.getByText('1');
    wrapper.getByText('2');
    wrapper.getByText('3');
    wrapper.getByText('4');
  });

  it('submits checked values', async () => {
    const handleSubmit = jest.fn();
    const wrapper = renderWithContext(createForm({ onSubmit: handleSubmit }));

    const checkbox = wrapper.getByText('Chicken');
    fireEvent.click(checkbox);

    const radio = wrapper.getByText('2');
    fireEvent.click(radio);

    const submitButton = wrapper.getByText('Save');
    fireEvent.click(submitButton);

    await wait(() => {
      expect(handleSubmit).toHaveBeenCalledWith(
        {
          chicken: true,
          tofu: false,
          beef: false,
          radio: '2',
        },
        expect.anything(),
      );
    });
  });
});
