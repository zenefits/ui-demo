import React from 'react';
import userEvent from '@testing-library/user-event';
import { act, fireEvent } from '@testing-library/react';

import { renderWithContext } from 'z-frontend-theme/test-utils/theme';

import { Form } from '../Form';
import FormSearchSelect from './FormSearchSelect';
import FormSearchSelectInteractor from './FormSearchSelect.interactor';

type Option = {
  id: number;
  label: string;
};

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

type FormSearchSelectExampleState = {
  selectedValue: Option;
};

class FormSearchSelectExample extends React.Component<{}, FormSearchSelectExampleState> {
  state = {
    selectedValue: null as Option,
  };

  render() {
    return (
      <Form onSubmit={() => {}} initialValues={{ entree: '' }} validationSchema={defaultValidationSchema}>
        {({ values }) => (
          <>
            Selected id: {this.state.selectedValue && this.state.selectedValue.id}
            <FormSearchSelect<Option>
              name="entree"
              label="Entree"
              getOptionText={o => o.label}
              onSelect={selection => {
                this.setState({
                  selectedValue: selection,
                });
              }}
            >
              {({ SelectOption, basicOptionFilter }) =>
                basicOptionFilter(optionList).map(option => <SelectOption key={option.id} option={option} />)
              }
            </FormSearchSelect>
            <div>Form value: {values.entree ? values.entree : ''}</div>
          </>
        )}
      </Form>
    );
  }
}

const keys = {
  enter: { key: 'Enter', keyCode: 13, charCode: 13, code: 'Enter' },
  escape: { key: 'Escape', keyCode: 27, charCode: 27, code: 'Escape' },
  down: { key: 'ArrowDown', keyCode: 40, charCode: 40, code: 'ArrowDown' },
};

describe('FormSearchSelect', () => {
  it('Can be edited', async () => {
    const wrapper = renderWithContext(<FormSearchSelectExample />);
    const select = new FormSearchSelectInteractor(wrapper);

    select.expand();
    // use act to avoid:
    // Warning: An update to Formik inside a test was not wrapped in act
    await act(async () => {
      await userEvent.type(select.getInput(), 'Chi');
      select.isDropdownOpen();
      expect(select.getOption('Chicken')).toBeTruthy();
      expect(select.getOption('Beef')).toBeFalsy();
      userEvent.click(select.getOption('Chicken'));
      select.isDropdownClosed();
      wrapper.getByText('Form value: Chicken');
      wrapper.getByText('Selected id: 1');
    });
  });

  it('Allows selecting items by pressing enter', async () => {
    const wrapper = renderWithContext(<FormSearchSelectExample />);
    const select = new FormSearchSelectInteractor(wrapper);

    select.expand();
    await act(async () => {
      await userEvent.type(select.getInput(), 'Chi');
      fireEvent.keyDown(select.getInput(), keys.down);
      fireEvent.keyDown(select.getInput(), keys.enter);
      wrapper.getByText('Form value: Chicken');
      wrapper.getByText('Selected id: 1');
    });
  });

  it('Escape closes dropdown and collapses if field is empty', async () => {
    const wrapper = renderWithContext(<FormSearchSelectExample />);
    const select = new FormSearchSelectInteractor(wrapper);

    select.expand();
    await act(async () => {
      select.isExpanded();
      fireEvent.keyDown(select.getInput(), keys.escape);
      select.isCollapsed();
    });

    select.expand();
    await act(async () => {
      await userEvent.type(select.getInput(), 'Chi');
      fireEvent.keyDown(select.getInput(), keys.escape);
      select.isDropdownClosed();
    });
  });
});
