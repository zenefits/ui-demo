import React from 'react';
import { cleanup, fireEvent } from '@testing-library/react';

import { renderWithContext } from 'z-frontend-theme/test-utils/theme';

import { Form } from './Form';
import Field from './Field';

interface FormValues {
  field: string;
  fastField: string;
  dependentFastField: string;
}

describe('Field', () => {
  afterEach(cleanup);

  let mockedLimitedRenderEffect = jest.fn();
  let mockedDependentRenderEffect = jest.fn();
  function createForm(formLimitRender: boolean = false, fieldLimitRenderOverride?: boolean) {
    return (
      <Form<FormValues>
        onSubmit={() => {}}
        limitRerender={formLimitRender}
        initialValues={{
          field: 'oldField',
          fastField: 'oldFastField',
          dependentFastField: 'oldDependentFastField',
        }}
      >
        <Field name="field" limitRerender={fieldLimitRenderOverride}>
          {({ field, form: { values } }) => (
            <input data-testid="field" aria-label={`Field: ${values.field}:${values.fastField}`} {...field} />
          )}
        </Field>
        <Field limitRerender name="fastField">
          {({ field, form: { values } }) => {
            mockedLimitedRenderEffect();

            return (
              <input data-testid="fastField" aria-label={`FastField: ${values.field}:${values.fastField}`} {...field} />
            );
          }}
        </Field>
        <Field limitRerender dependencies={['field']} name="dependentFastField">
          {({ field, form: { values } }) => {
            mockedDependentRenderEffect();

            return (
              <input
                data-testid="dependentFastField"
                aria-label={`DependentFastField: ${values.field}:${values.fastField}:${values.dependentFastField}`}
                {...field}
              />
            );
          }}
        </Field>
      </Form>
    );
  }

  it('by default always re-renders a field', () => {
    const wrapper = renderWithContext(createForm());
    const fastFieldInput = wrapper.getByTestId('fastField');

    const newVal = 'newFastField';
    fireEvent.change(fastFieldInput, { target: { value: newVal } });

    wrapper.getByLabelText('Field: oldField:newFastField');
  });

  it('only re-renders fastFields when relevant slice changes', () => {
    mockedLimitedRenderEffect = jest.fn();
    const wrapper = renderWithContext(createForm());

    const field = wrapper.getByTestId('field');

    const newVal = 'newField';
    fireEvent.change(field, { target: { value: newVal } });

    wrapper.getByLabelText('FastField: oldField:oldFastField');
    wrapper.getByLabelText('Field: newField:oldFastField');

    expect(mockedLimitedRenderEffect.mock.calls.length).toBe(1);
  });

  it('only re-renders fastFields with dependencies when specified dependencies change', () => {
    mockedDependentRenderEffect = jest.fn();
    const wrapper = renderWithContext(createForm());

    const field = wrapper.getByTestId('field');
    const newFieldVal = 'newField';
    fireEvent.change(field, { target: { value: newFieldVal } });

    wrapper.getByLabelText('DependentFastField: newField:oldFastField:oldDependentFastField');
    expect(mockedDependentRenderEffect.mock.calls.length).toBe(2);

    const fastField = wrapper.getByTestId('fastField');
    const newFastFieldVal = 'newFastField';
    fireEvent.change(fastField, { target: { value: newFastFieldVal } });

    wrapper.getByLabelText('DependentFastField: newField:oldFastField:oldDependentFastField');
    wrapper.getByLabelText('FastField: newField:newFastField');
    expect(mockedDependentRenderEffect.mock.calls.length).toBe(2);
  });

  it('can set limitRerender form level', () => {
    const wrapper = renderWithContext(createForm(true));
    const fastFieldInput = wrapper.getByTestId('fastField');

    const newVal = 'newFastField';
    fireEvent.change(fastFieldInput, { target: { value: newVal } });

    wrapper.getByLabelText('Field: oldField:oldFastField');
  });

  it('overrides form level limitRerender with field level', () => {
    const wrapper = renderWithContext(createForm(true, false));
    const fastFieldInput = wrapper.getByTestId('fastField');

    const newVal = 'newFastField';
    fireEvent.change(fastFieldInput, { target: { value: newVal } });

    wrapper.getByLabelText('Field: oldField:newFastField');
  });
});
