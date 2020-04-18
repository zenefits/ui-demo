import React from 'react';
import { cleanup, fireEvent, wait } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { renderWithContext } from 'z-frontend-theme/test-utils/theme';

import { Form, FormCustomTileInputGroup } from '../../..';

interface FormValues {
  proteins: string[];
  radio: string;
}

const checkboxOptions = [
  { value: 'beef', label: 'Beef' },
  { value: 'chicken', label: 'Chicken' },
  { value: 'tofu', label: 'Tofu' },
];

const radioOptions = ['1', '2', '3', '4'];

const initialValues: FormValues = {
  proteins: [],
  radio: '1',
};

describe('FormCustomTileInputGroup', () => {
  function createForm(props: any = {}) {
    return (
      <Form<FormValues> onSubmit={props.onSubmit} initialValues={initialValues}>
        {formikProps => (
          <>
            {/* TODO: use formikTestUtils.renderForm instead to get values */}
            <pre data-testid="form-values">{JSON.stringify(formikProps.values)}</pre>
            <FormCustomTileInputGroup isCheckbox name="proteins">
              {TileInput =>
                checkboxOptions.map(option => <TileInput key={option.value} name={option.value} label={option.label} />)
              }
            </FormCustomTileInputGroup>
            <FormCustomTileInputGroup name="radio">
              {TileInput =>
                radioOptions.map(option => <TileInput key={option} label={option} value={option} name="radio" />)
              }
            </FormCustomTileInputGroup>
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
          proteins: ['chicken'],
          radio: '2',
        },
        expect.anything(),
      );
    });
  });

  interface FormNestedValues {
    nested: {
      radio: string;
    };
  }

  it('handles nested object values', () => {
    const wrapper = renderWithContext(
      <Form<FormNestedValues> onSubmit={() => {}} initialValues={{ nested: { radio: '2' } }}>
        <FormCustomTileInputGroup name="nested.radio">
          {TileInput =>
            radioOptions.map(option => <TileInput key={option} label={option} value={option} name="nested.radio" />)
          }
        </FormCustomTileInputGroup>
      </Form>,
    );
    const checkedInput = wrapper.container.querySelector(':checked');
    expect(checkedInput).toHaveAttribute('value', '2');
    expect(checkedInput).toHaveAttribute('checked');
  });
});
