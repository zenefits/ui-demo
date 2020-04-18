// tslint:disable:jsx-key

import React from 'react';
import { fireEvent, wait } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import { MixedSchema } from 'yup';

import {
  Form,
  FormCheckboxGroup,
  FormDateInput,
  FormMaskedInput,
  FormMoneyInput,
  FormNumberInput,
  FormPercentageInput,
  FormPhoneInput,
  FormRadio,
  FormRadioGroup,
  FormSelect,
  FormSimpleSelect,
  FormTextarea,
  FormTextInput,
  FormTimeInput,
} from './../..';
import { renderForm, RenderFormResult } from './formikTestUtils';
import FormSelectInteractor from './select/FormSelect.interactor';

type FormValues = {
  name: string | string[];
};
enum inputTypes {
  input,
  select,
  radio,
  checkbox,
  selectComboBox,
}

const selectOptions = ['John', 'Sue', 'Mary'];

const groupOptions = [
  { value: '12', label: 'John' },
  { value: '31', label: 'Sue' },
  { value: '28', label: 'Mary' },
];

const commonProps = { 'data-testid': 'component-under-test', name: 'name', label: 'Label' };

type TestCase = {
  componentUnderTest: (props?: any) => React.ReactElement;
  inputType: inputTypes;
  updatedValue: string;
  initialValues?: FormValues;
  validationSchema?: { [V in keyof FormValues]?: MixedSchema };
};
type TestCaseItem = [string, TestCase];

const testCases: TestCaseItem[] = [
  [
    'FormDateInput',
    {
      componentUnderTest: (props: any) => <FormDateInput {...commonProps} {...props} />,
      inputType: inputTypes.input,
      updatedValue: '01/01/2020',
    },
  ],
  [
    'FormMaskedInput',
    {
      componentUnderTest: (props: any) => (
        <FormMaskedInput mask={[/\w/, /\w/, /\w/, /\w/, /\w/]} {...commonProps} {...props} />
      ),
      inputType: inputTypes.input,
      updatedValue: 'John',
    },
  ],
  [
    'FormMoneyInput',
    {
      componentUnderTest: (props: any) => <FormMoneyInput {...commonProps} {...props} />,
      inputType: inputTypes.input,
      updatedValue: '1234',
    },
  ],
  [
    'FormNumberInput',
    {
      componentUnderTest: (props: any) => <FormNumberInput {...commonProps} {...props} />,
      inputType: inputTypes.input,
      updatedValue: '1234',
    },
  ],
  [
    'FormPercentageInput',
    {
      componentUnderTest: (props: any) => <FormPercentageInput {...commonProps} {...props} />,
      inputType: inputTypes.input,
      updatedValue: '12',
    },
  ],
  [
    'FormPhoneInput',
    {
      componentUnderTest: (props: any) => <FormPhoneInput {...commonProps} {...props} />,
      inputType: inputTypes.input,
      updatedValue: '555-123-5555',
    },
  ],
  [
    'FormTextInput',
    {
      componentUnderTest: (props: any) => <FormTextInput {...commonProps} {...props} />,
      inputType: inputTypes.input,
      updatedValue: 'John',
    },
  ],
  [
    'FormTimeInput',
    {
      componentUnderTest: (props: any) => <FormTimeInput {...commonProps} {...props} />,
      inputType: inputTypes.input,
      updatedValue: '2:00 PM',
      validationSchema: { name: FormTimeInput.validationSchema },
    },
  ],
  [
    'FormTextArea',
    {
      componentUnderTest: (props: any) => <FormTextarea {...commonProps} {...props} />,
      inputType: inputTypes.input,
      updatedValue: 'John',
    },
  ],

  // groups
  [
    'FormRadioGroup',
    {
      componentUnderTest: (props: any) => (
        <FormRadioGroup {...commonProps} {...props}>
          {groupOptions.map(option => (
            <FormRadio key={option.value} label={option.label} value={option.value} />
          ))}
        </FormRadioGroup>
      ),
      inputType: inputTypes.radio,
      updatedValue: groupOptions[0].label,
    },
  ],
  [
    'FormCheckboxGroup',
    {
      componentUnderTest: (props: any) => (
        <FormCheckboxGroup {...commonProps} {...props}>
          {({ Checkbox }) =>
            groupOptions.map(option => <Checkbox key={option.value} name={option.value} label={option.label} />)
          }
        </FormCheckboxGroup>
      ),
      inputType: inputTypes.checkbox,
      initialValues: {
        name: [], // array is important for checkbox
      },
      updatedValue: groupOptions[0].label,
    },
  ],

  // select components
  [
    'FormSelect',
    {
      componentUnderTest: (props: any) => (
        <FormSelect<string> {...commonProps} {...props} getOptionText={o => o}>
          {({ SelectOption }) => selectOptions.map(option => <SelectOption key={option} option={option} />)}
        </FormSelect>
      ),
      inputType: inputTypes.selectComboBox,
      updatedValue: selectOptions[0],
    },
  ],
  [
    'FormSimpleSelect',
    {
      componentUnderTest: (props: any) => (
        <FormSimpleSelect<string> {...commonProps} {...props} getOptionText={o => o}>
          {({ SelectOption }) => selectOptions.map(option => <SelectOption key={option} option={option} />)}
        </FormSimpleSelect>
      ),
      inputType: inputTypes.select,
      updatedValue: selectOptions[0],
    },
  ],
];

// TODO: these are bugs that should be fixed
const skippedTests: { [key: string]: boolean } = {
  'FormTimeInput - shows/clears validation errors on input': true, // does not update validation properly on blur
  'FormSelect - shows a label': true, // "Found a label with the text of: Label, however no form control was found associated to that label"
};

function skippableTest(testName: string, body: jest.ProvidesCallback) {
  const fn = skippedTests[testName] ? it.skip : it;
  return fn(testName, body);
}

async function updateInputValue(renderResult: RenderFormResult<FormValues>, testCase: TestCase) {
  const element = renderResult.getByTestId('component-under-test');
  if (testCase.inputType === inputTypes.input) {
    await userEvent.type(element, testCase.updatedValue);
    // eg FormTimeInput requires 'enter' key for some reason
    fireEvent.keyDown(element, { key: 'Enter', keyCode: 13, which: 13 });
  } else if ([inputTypes.radio, inputTypes.checkbox].includes(testCase.inputType)) {
    userEvent.click(renderResult.getByLabelText(testCase.updatedValue));
  } else if (testCase.inputType === inputTypes.select) {
    userEvent.selectOptions(element, testCase.updatedValue);
  } else if (testCase.inputType === inputTypes.selectComboBox) {
    const select = new FormSelectInteractor(renderResult, 'Label');
    select.open();
    userEvent.click(select.getOption(testCase.updatedValue));
  } else {
    throw new Error('unknown input type - not sure how to update value');
  }
}

const defaultInitialValues = {
  name: '',
};

describe.each(testCases)('%s', (componentName, testCase) => {
  const ComponentUnderTest = testCase.componentUnderTest;
  const initialValues = testCase.initialValues || defaultInitialValues;

  skippableTest(`${componentName} - shows a label`, () => {
    const { getByLabelText } = renderForm<FormValues>(initialValues, <ComponentUnderTest />);
    getByLabelText('Label');
  });

  skippableTest(`${componentName} - supports data-testid`, () => {
    const { getByTestId } = renderForm<FormValues>(initialValues, <ComponentUnderTest />);
    getByTestId(commonProps['data-testid']);
  });

  skippableTest(`${componentName} - supports disabled`, () => {
    const { getByTestId, debug } = renderForm<FormValues>(initialValues, <ComponentUnderTest disabled />);
    const element = getByTestId(commonProps['data-testid']);
    if ([inputTypes.radio, inputTypes.checkbox].includes(testCase.inputType)) {
      const radioInputs = element.querySelectorAll('input');
      radioInputs.forEach(radio => expect(radio).toBeDisabled());
      return;
    }

    if (!element.hasAttribute('disabled')) {
      debug();
    }
    // not using toBeDisabled() because it requires an actual form element, but some of our components are divs etc
    expect(element).toHaveAttribute('disabled');
  });

  skippableTest(`${componentName} - updates form value`, async () => {
    const wrapper = renderForm<FormValues>(initialValues, <ComponentUnderTest />);
    const { getFormProps } = wrapper;

    // update value and verify it changed
    updateInputValue(wrapper, testCase);
    await wait(() => {
      expect(getFormProps().values.name).not.toEqual(initialValues.name);
    });
  });

  skippableTest(`${componentName} - resets value correctly`, async () => {
    const wrapper = renderForm<FormValues>(initialValues, <ComponentUnderTest />);
    const { getByText, getFormProps } = wrapper;

    updateInputValue(wrapper, testCase);
    await wait(() => {
      expect(getFormProps().values).not.toEqual(initialValues);
    });

    // reset the form
    userEvent.click(getByText('Reset'));
    await wait(() => {
      expect(getFormProps().values).toEqual(initialValues);
    });
  });

  skippableTest(`${componentName} - shows/clears validation errors on input`, async () => {
    const wrapper = renderForm<FormValues>(initialValues, <ComponentUnderTest />, {
      validationSchema: testCase.validationSchema || {
        name: Form.Yup.string().required(),
      },
    });
    const { findByRole, queryAllByRole, getByTestId, getByLabelText } = wrapper;

    // no validation errors initially
    expect(queryAllByRole('alert')).toHaveLength(0);

    // touch or clear input to trigger validation error
    if (testCase.inputType === inputTypes.input) {
      const input = getByTestId('component-under-test');
      input.focus();
      input.blur();
    } else if (testCase.inputType === inputTypes.radio) {
      const firstRadio = getByTestId('component-under-test').querySelector('input');
      firstRadio.focus();
      firstRadio.blur();
    } else if (testCase.inputType === inputTypes.checkbox) {
      // check then uncheck
      userEvent.click(getByLabelText(testCase.updatedValue));
      userEvent.click(getByLabelText(testCase.updatedValue));
    } else if (testCase.inputType === inputTypes.select) {
      const select = getByTestId('component-under-test');
      userEvent.selectOptions(select, testCase.updatedValue);
      userEvent.selectOptions(select, '');
    } else if (testCase.inputType === inputTypes.selectComboBox) {
      const select = new FormSelectInteractor(wrapper, 'Label');
      select.open();
      userEvent.click(select.getOption(testCase.updatedValue));
      userEvent.click(await select.getClearButton());
    }
    await findByRole('alert');

    // now enter valid value
    updateInputValue(wrapper, testCase);

    await wait(() => {
      expect(queryAllByRole('alert')).toHaveLength(0);
    });
  });
});
