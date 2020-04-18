import React, { Component } from 'react';
import { getIn, FieldProps } from 'formik';

import Field from '../Field';
import FormFieldWrapper, { FormFieldProps } from '../FormFieldWrapper';
import CustomTileInput, { CustomTileInputProps } from '../../custom-tile-input/CustomTileInput';
import { getAriaInputProps } from '../formAccessibility';

export type FormCustomTileInputProps = CustomTileInputProps & FormFieldProps;

class FormCustomTileInput extends Component<FormCustomTileInputProps> {
  render() {
    const {
      name,
      value,
      label,
      isCheckbox,
      containerProps,
      optional,
      limitRerender,
      dependencies,
      disableError,
      'aria-label': ariaLabel,
      ...rest
    } = this.props;
    const fieldType = isCheckbox ? 'checkbox' : 'radio';
    return (
      <Field name={name} limitRerender={limitRerender} dependencies={dependencies} type={fieldType}>
        {({ field, form }: FieldProps) => {
          const error: any = getIn(form.touched, name) && getIn(form.errors, name);
          const formikValue = getIn(form.values, name);
          const isChecked = Boolean(isCheckbox ? formikValue : formikValue === value);
          return (
            <FormFieldWrapper
              fieldType={fieldType}
              name={name}
              label={label}
              error={error}
              containerProps={containerProps}
              optional={optional}
              disableError={disableError}
            >
              <CustomTileInput
                id={name}
                {...field}
                isCheckbox={isCheckbox}
                // TODO: why is it necessary to set value manually? (Formik is not connecting it to field.value.)
                // This is similar to why we're having to do this in FormRadio
                value={value}
                checked={isChecked}
                {...rest}
                // TODO: Add support for error state to CustomTileInput and uncomment.
                // hasError={Boolean(error)}
                {...getAriaInputProps(name, error, ariaLabel)}
                mb={0}
              />
            </FormFieldWrapper>
          );
        }}
      </Field>
    );
  }
}

export default FormCustomTileInput;
