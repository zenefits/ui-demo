import React, { Component } from 'react';
import { getIn, FieldArray } from 'formik';

import { Box } from 'zbase';

import FormFieldWrapper, { getErrorId, getLabelId, FormFieldProps } from '../FormFieldWrapper';
import FormRadio from './FormRadio';

type FormRadioGroupProps = FormFieldProps & {
  /** The name shared among each radio option, which is submitted with the value as part of the form data. */
  name: string;
  /** The Form.Radio options to render. */
  children: React.ReactElement<FormRadio>[];
  /** Test ID to find the group container in tests */
  'data-testid'?: string;
  /** Are all child radio inputs disabled? */
  disabled?: boolean;
};

class FormRadioGroup extends Component<FormRadioGroupProps> {
  render() {
    const {
      name,
      label,
      children,
      containerProps,
      optional,
      helpText,
      format,
      'data-testid': dataTestId,
      ...rest
    } = this.props;
    return (
      <FieldArray
        name={name}
        render={({ form }) => {
          const error: any = getIn(form.touched, name) && getIn(form.errors, name);
          const extraChildProps = { name, role: 'radio', ...rest };
          return (
            <FormFieldWrapper
              name={name}
              label={label}
              helpText={helpText}
              error={error}
              format={format}
              containerProps={containerProps}
              fieldType="radio"
              optional={optional}
            >
              <Box
                role="radiogroup"
                aria-labelledby={getLabelId(name)}
                aria-describedby={error ? getErrorId(name) : null}
                data-testid={dataTestId}
              >
                {React.Children.map(children, child => {
                  return React.cloneElement(child as React.ReactElement<any>, extraChildProps);
                })}
              </Box>
            </FormFieldWrapper>
          );
        }}
      />
    );
  }
}

export default FormRadioGroup;
