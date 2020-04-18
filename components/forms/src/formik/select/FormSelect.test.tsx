import React from 'react';
import userEvent from '@testing-library/user-event';
import { fireEvent } from '@testing-library/react';

import { renderWithContext } from 'z-frontend-theme/test-utils/theme';

import { Form } from '../Form';
import FormSelect from './FormSelect';
import FormSelectInteractor from './FormSelect.interactor';

// Default example
const optionList = [
  { id: 1, label: 'Chicken' },
  { id: 2, label: 'Beef' },
  { id: 3, label: 'Tofu' },
];

const defaultValidationSchema = {
  entree: Form.Yup.object()
    .nullable(true)
    .required('Entree is a required field.'),
};

const FormSelectExample = (fieldProps: any) => (
  <Form onSubmit={() => {}} initialValues={{ entree: null }} validationSchema={defaultValidationSchema}>
    {({ values }) => (
      <>
        <FormSelect<{ id: number; label: string }>
          name="entree"
          label="Entree"
          getOptionText={o => o.label}
          {...fieldProps}
        >
          {({ SelectOption, basicOptionFilter }) =>
            basicOptionFilter(optionList).map(option => <SelectOption key={option.id} option={option} />)
          }
        </FormSelect>
        <div>Form value: {values.entree ? values.entree.id : 'null'}</div>
      </>
    )}
  </Form>
);

// see also common tests under FormComponents.test.tsx (eg show label, show required validation)
describe('FormSelect', () => {
  it('Can be edited', async () => {
    const wrapper = renderWithContext(<FormSelectExample />);
    const select = new FormSelectInteractor(wrapper, 'Entree');

    select.open();
    select.isOpen();
    optionList.forEach(option => select.getOption(option.label));

    await userEvent.type(select.getInput(), 'Chi');
    expect(select.getOption('Chicken')).toBeTruthy();
    expect(select.getOption('Beef')).toBeFalsy();

    userEvent.click(select.getOption('Chicken'));
    expect(select.getOption('Beef')).toBeFalsy();
    select.isClosed();
    select.wrapper.getByText('Form value: 1');
  });

  it('Allows selecting items by pressing enter', async () => {
    const wrapper = renderWithContext(<FormSelectExample />);
    const select = new FormSelectInteractor(wrapper, 'Entree');

    select.open();
    await userEvent.type(select.getInput(), 'Chi');
    fireEvent.keyDown(select.getInput(), { key: 'ArrowDown', keyCode: 40, charCode: 40, code: 'ArrowDown' });
    fireEvent.keyDown(select.getInput(), { key: 'Enter', keyCode: 13, charCode: 13, code: 'Enter' });

    select.wrapper.getByText('Form value: 1');
  });

  it('Typing on control opens dropdown and populates input', async () => {
    const wrapper = renderWithContext(<FormSelectExample />);
    const select = new FormSelectInteractor(wrapper, 'Entree');

    await userEvent.type(select.getControl(), 'Chi');
    select.isOpen();
  });

  it('Escape closes input', () => {
    const wrapper = renderWithContext(<FormSelectExample />);
    const select = new FormSelectInteractor(wrapper, 'Entree');

    select.open();
    fireEvent.keyDown(select.getInput(), { key: 'Escape', keyCode: 27, charCode: 27, code: 'Escape' });

    select.isClosed();
    select.wrapper.getByText('Form value: null');
  });
});
