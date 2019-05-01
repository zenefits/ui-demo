import React, { Component } from 'react';
import { getIn, Field, FieldProps } from 'formik';

import FormFieldWrapper, { getErrorId, getLabelId, FormFieldProps } from '../FormFieldWrapper';
import CustomTileInput, { CustomTileInputProps } from '../../custom-tile-input/CustomTileInput';

export type FormCustomTileInputProps = CustomTileInputProps & FormFieldProps;

class FormCustomTileInput extends Component<FormCustomTileInputProps> {
  render() {
    const { name, value, label, containerProps, optional, ...rest } = this.props;
    const fieldType = this.props.isCheckbox ? 'checkbox' : 'radio';

    return (
      <Field
        name={name}
        type={fieldType}
        render={({ field, form }: FieldProps) => {
          const error: any = getIn(form.touched, name) && getIn(form.errors, name);
          return (
            <FormFieldWrapper
              fieldType={fieldType}
              name={name}
              label={label}
              error={error}
              containerProps={containerProps}
              optional={optional}
            >
              <CustomTileInput
                id={name}
                {...field}
                {...rest}
                // TODO: why is it necessary to set value manually? (Formik is not connecting it to field.value.)
                // This is similar to why we're having to do this in FormRadio
                value={value}
                checked={this.props.isCheckbox ? form.values[name] : form.values[name] === value}
                // TODO: Add support for error state to CustomTileInput and uncomment.
                // hasError={Boolean(error)}
                aria-labelledby={getLabelId(name)}
                aria-describedby={error ? getErrorId(name) : null}
                mb={0}
              />
            </FormFieldWrapper>
          );
        }}
      />
    );
  }
}

export default FormCustomTileInput;
