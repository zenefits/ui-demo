import React, { useContext, Component } from 'react';
import { getIn, FieldArray, FieldArrayRenderProps } from 'formik';

import { Box } from 'zbase';

import FormFieldWrapper, { getErrorId, getLabelId, FormFieldProps } from '../FormFieldWrapper';
import FormCheckbox, { FormCheckboxProps } from './FormCheckbox';

type CheckboxParams = {
  Checkbox: React.FunctionComponent<FormCheckboxProps>;
};

type Context = {
  fieldArrayRenderProps?: FieldArrayRenderProps;
  formGroupProps?: Pick<
    FormFieldProps,
    'containerProps' | 'name' | 'fieldType' | 'manualLabelFocus' | 'dependencies' | 'fieldType'
  >;
  isValueArray?: boolean;
};

const FormCheckboxGroupPropsContext = React.createContext<Context>({});

type FormCheckboxGroupProps = Partial<FormFieldProps> & {
  /** The Form.Checkbox options to render. */
  children: (params: CheckboxParams) => React.ReactNode;
  /** Test ID to find the group container in tests */
  'data-testid'?: string;
  /** Are all child checkbox inputs disabled? */
  disabled?: boolean;
};

export function normalizeError(error: string): string {
  if (Array.isArray(error)) {
    // eg error will follow shape of value, so may become an array
    return error.map(error => error.trim()).join('. ');
  }
  return typeof error === 'string' ? error.trim() : error;
}

export type GetCheckboxOnChangeParams = {
  checkboxName: string;
  groupName?: string;
  arrayHelpers: FieldArrayRenderProps;
  arrayValues: any[];
};

export const getCheckboxOnChange = ({
  checkboxName,
  arrayHelpers,
  arrayValues,
  groupName,
}: GetCheckboxOnChangeParams) => (e: React.ChangeEvent<HTMLInputElement>) => {
  if (e.target.checked) {
    arrayHelpers.push(checkboxName);
  } else {
    const idx = arrayValues.indexOf(checkboxName);
    arrayHelpers.remove(idx);
  }

  if (groupName) {
    // above will updated touched, but have to manually do the group
    arrayHelpers.form.setFieldTouched(groupName, true, false);
  }
};

const Checkbox: React.FunctionComponent<FormCheckboxProps> = ({ name: checkboxName, ...rest }) => {
  const context = useContext(FormCheckboxGroupPropsContext);

  const {
    fieldArrayRenderProps: arrayHelpers,
    isValueArray,
    formGroupProps: { containerProps, name, ...restFormGroupProps },
  } = context;

  const defaultCheckboxProps: Partial<FormCheckboxProps> = {
    containerProps: {
      mb: 1, // small space between checkboxes
      ...containerProps,
    },
    ...restFormGroupProps,
  };

  const checkboxProps = {
    ...defaultCheckboxProps,
    // grouped checkbox has two labels: the group label and the checkbox label
    'aria-labelledby': `${getLabelId(name)} ${getLabelId(checkboxName)}`,
  };
  if (isValueArray) {
    const arrayValues: any[] = getIn(arrayHelpers.form.values, name);
    checkboxProps.onChange = getCheckboxOnChange({ checkboxName, arrayHelpers, arrayValues, groupName: name });
    checkboxProps.checked = arrayValues.includes(checkboxName);
  }

  return <FormCheckbox name={checkboxName} {...checkboxProps} {...rest} />;
};

class FormCheckboxGroup extends Component<FormCheckboxGroupProps> {
  render() {
    const {
      name,
      label,
      children,
      containerProps,
      optional,
      format,
      helpText,
      'data-testid': dataTestId,
      ...rest
    } = this.props;
    return (
      <FieldArray
        name={name}
        render={arrayHelpers => {
          const { form } = arrayHelpers;
          const isValueArray = Array.isArray(form.initialValues[name]); // is this a single field where checkbox values are items in the array?
          const error: string = normalizeError(getIn(form.touched, name) && getIn(form.errors, name));

          const params = {
            Checkbox,
          };

          return (
            <FormCheckboxGroupPropsContext.Provider
              value={{
                isValueArray,
                formGroupProps: { containerProps, name, ...rest },
                fieldArrayRenderProps: arrayHelpers,
              }}
            >
              <FormFieldWrapper
                name={name}
                label={label}
                helpText={helpText}
                error={isValueArray ? error : null} // if non value array, checkbox fields handle their own errors
                format={format}
                containerProps={containerProps}
                fieldType="checkboxGroup"
                optional={optional}
              >
                <Box
                  role="group"
                  aria-labelledby={getLabelId(name)}
                  aria-describedby={error ? getErrorId(name) : null}
                  data-testid={dataTestId}
                >
                  {children(params)}
                </Box>
              </FormFieldWrapper>
            </FormCheckboxGroupPropsContext.Provider>
          );
        }}
      />
    );
  }
}

export default FormCheckboxGroup;
