import React, { Component } from 'react';
import { getIn, FieldArray } from 'formik';

import { Box } from 'zbase';

import FormFieldWrapper, { getErrorId, getLabelId, FormFieldProps } from '../FormFieldWrapper';
import FormCheckbox, { FormCheckboxProps } from './FormCheckbox';

type CheckboxParams = {
  Checkbox: React.FunctionComponent<FormCheckboxProps>;
};

type FormCheckboxGroupProps = Partial<FormFieldProps> & {
  /** The Form.Checkbox options to render. */
  children: (params: CheckboxParams) => React.ReactNode;
};

function normalizeError(error: string): string {
  if (Array.isArray(error)) {
    // eg error will follow shape of value, so may become an array
    return error.map(error => error.trim()).join('. ');
  }
  return typeof error === 'string' ? error.trim() : error;
}

class FormCheckboxGroup extends Component<FormCheckboxGroupProps> {
  render() {
    const { name, label, children, containerProps, optional, format, ...rest } = this.props;
    return (
      <FieldArray
        name={name}
        render={arrayHelpers => {
          const form = arrayHelpers.form;
          const isValueArray = Array.isArray(form.initialValues[name]); // is this a single field where checkbox values are items in the array?
          const error: string = normalizeError(getIn(form.touched, name) && getIn(form.errors, name));

          const defaultCheckboxProps: Partial<FormCheckboxProps> = {
            containerProps: {
              mb: 1, // small space between checkboxes
              ...containerProps,
            },
            ...rest,
          };

          const params = {
            Checkbox: ({ name: checkboxName, ...rest }: FormCheckboxProps) => {
              const checkboxProps = {
                ...defaultCheckboxProps,
                // grouped checkbox has two labels: the group label and the checkbox label
                'aria-labelledby': `${getLabelId(name)} ${getLabelId(checkboxName)}`,
              };
              if (isValueArray) {
                const arrayValue: any[] = getIn(form.values, name);
                checkboxProps.onChange = (e: any) => {
                  // NOTE: touched[name] is showing up as an array, but fixing this causes error in FieldArray
                  // form.setFieldTouched(name, true);
                  // (looks like it may be fixed by upgrading formik)
                  if (e.target.checked) {
                    arrayHelpers.push(checkboxName);
                  } else {
                    const idx = arrayValue.indexOf(checkboxName);
                    arrayHelpers.remove(idx);
                  }
                };
                checkboxProps.checked = arrayValue.includes(checkboxName);
              }

              return <FormCheckbox name={checkboxName} {...checkboxProps} {...rest} />;
            },
          };
          return (
            <FormFieldWrapper
              name={name}
              label={label}
              error={isValueArray ? error : null} // if non value array, checkbox fields handle their own errors
              format={format}
              containerProps={containerProps}
              fieldType="checkboxGroup"
              optional={optional}
            >
              <Box role="group" aria-labelledby={getLabelId(name)} aria-describedby={error ? getErrorId(name) : null}>
                {children(params)}
              </Box>
            </FormFieldWrapper>
          );
        }}
      />
    );
  }
}

export default FormCheckboxGroup;
