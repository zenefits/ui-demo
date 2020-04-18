import React from 'react';
import { cleanup, fireEvent, RenderResult } from '@testing-library/react';

import { renderWithContext } from 'z-frontend-theme/test-utils/theme';

import { Form } from '../../..';
import FormMultiSelect, { FormMultiSelectProps } from './FormMultiSelect';
import { KEY_CODES } from '../../select/utils';

class FormMultiSelectInteractor {
  label: string;
  renderResult: RenderResult;
  name: string;
  debug: () => void;

  constructor(renderResult: RenderResult, name: string, label: string) {
    this.renderResult = renderResult;
    this.name = name;
    this.label = label;
    this.debug = renderResult.debug;
  }

  getControl = () => this.renderResult.getByLabelText(`Click or press enter to edit ${this.label}`);
  getInput = () => this.renderResult.container.querySelector('input');
  getOption = (optionText: string) => this.renderResult.container.querySelector(`[data-optionlabel=${optionText}]`);
  getOptionPill = (optionText: string) =>
    this.renderResult.queryByLabelText(`Remove ${optionText} from field: ${this.label}`);

  toggle = () => {
    const control = this.getControl();
    fireEvent.click(control);
  };
  type = (text: string) => {
    const input = this.getInput();
    fireEvent.change(input, { target: { value: text } });
  };
  removeOption = (option: string) => {
    fireEvent.click(this.getOptionPill(option));
  };

  assertIsOpen = () => this.renderResult.getByRole('listbox');
  assertIsClosed = () => expect(this.renderResult.queryByRole('listbox')).toBe(null);

  assertOptionIsShown = (optionText: string) => {
    expect(this.getOption(optionText)).not.toBeNull();
  };
  assertOptionIsNotShown = (optionText: string) => {
    expect(this.getOption(optionText)).toBeNull();
  };

  assertValueIsSelected = (optionText: string) => {
    expect(this.getOptionPill(optionText)).not.toBeNull();
  };
  assertValueIsUnselected = (optionText: string) => {
    expect(this.getOptionPill(optionText)).toBeNull();
  };
}

type OptionValue = { id: number; label: string };

const optionList: OptionValue[] = [
  { id: 0, label: 'Chicken' },
  { id: 1, label: 'Beef' },
  { id: 2, label: 'Fish' },
  { id: 3, label: 'Tofu' },
];

type FormValues = {
  entrees: OptionValue[];
};

const defaultSelected = [optionList[1], optionList[3]];
const defaultUnselected = [optionList[0], optionList[2]];

type ExampleProps = {
  fieldProps?: Partial<FormMultiSelectProps<OptionValue>>;
};

const FormMultiSelectExample = (props: ExampleProps) => (
  <Form<FormValues> onSubmit={() => {}} initialValues={{ entrees: defaultSelected }}>
    {({ values }) => (
      <>
        <FormMultiSelect<OptionValue> name="entrees" label="Entrees" getOptionText={o => o.label} {...props.fieldProps}>
          {({ SelectOption, multiOptionFilter }) =>
            multiOptionFilter(optionList).map(option => <SelectOption key={option.id} option={option} />)
          }
        </FormMultiSelect>
        <div>Form value: {values.entrees.length ? values.entrees.map(option => option.id).join(',') : 'null'}</div>
      </>
    )}
  </Form>
);

describe('FormMultiSelect', () => {
  afterEach(cleanup);

  it('shows menu on click', () => {
    const wrapper = renderWithContext(<FormMultiSelectExample />);
    const select = new FormMultiSelectInteractor(wrapper, 'entrees', 'Entrees');

    select.assertIsClosed();

    select.toggle();
    select.assertIsOpen();

    defaultUnselected.forEach(option => {
      select.assertOptionIsShown(option.label);
    });
    defaultSelected.forEach(option => {
      select.assertOptionIsNotShown(option.label);
    });

    select.toggle();
    select.assertIsClosed();
  });

  it('correct options are shown as selected', () => {
    const wrapper = renderWithContext(<FormMultiSelectExample />);
    const select = new FormMultiSelectInteractor(wrapper, 'entrees', 'Entrees');
    defaultSelected.forEach(option => {
      select.assertValueIsSelected(option.label);
    });
    defaultUnselected.forEach(option => {
      select.assertValueIsUnselected(option.label);
    });
  });

  it('option list can be filtered', () => {
    const wrapper = renderWithContext(<FormMultiSelectExample />);
    const select = new FormMultiSelectInteractor(wrapper, 'entrees', 'Entrees');

    select.toggle();
    select.type('Chi');
    select.assertOptionIsShown('Chicken');
    select.assertOptionIsNotShown('Fish');
  });

  it('option can be via keypress or click', () => {
    const wrapper = renderWithContext(<FormMultiSelectExample />);
    const select = new FormMultiSelectInteractor(wrapper, 'entrees', 'Entrees');

    select.assertValueIsUnselected('Chicken');
    select.assertValueIsUnselected('Fish');

    select.toggle();

    select.type('Chi');
    fireEvent.keyDown(select.getInput(), { keyCode: KEY_CODES.DOWN_ARROW });
    fireEvent.keyDown(select.getInput(), { key: 'Enter', keyCode: KEY_CODES.ENTER });
    select.assertValueIsSelected('Chicken');

    fireEvent.click(select.getOption('Fish'));
    select.assertValueIsSelected('Fish');
  });

  it('selected options can be removed', () => {
    const wrapper = renderWithContext(<FormMultiSelectExample />);
    const select = new FormMultiSelectInteractor(wrapper, 'entrees', 'Entrees');

    select.assertValueIsSelected('Beef');
    select.removeOption('Beef');
    select.assertValueIsUnselected('Beef');

    select.assertValueIsSelected('Tofu');
    select.removeOption('Tofu');
    select.assertValueIsUnselected('Beef');
  });
});
