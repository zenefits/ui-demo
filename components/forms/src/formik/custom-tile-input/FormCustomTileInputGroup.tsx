import React, { Component } from 'react';
import { Field, FieldProps } from 'formik';

import { Box } from 'zbase';

import FormFieldWrapper, { getLabelId, FormFieldProps } from '../FormFieldWrapper';
import CustomTileInputGroup, { CustomTileInputGroupProps } from './CustomTileInputGroup';

type FormCustomTileInputGroupProps = Partial<FormFieldProps> & CustomTileInputGroupProps;

class FormCustomTileInputGroup extends Component<FormCustomTileInputGroupProps> {
  render() {
    const { name, label, containerProps, optional, ...rest } = this.props;
    const fieldType = this.props.isCheckbox ? 'checkbox' : 'radio';
    const role = this.props.isCheckbox ? 'group' : 'radiogroup';

    return (
      <Field
        name={name}
        type={fieldType}
        render={({ field, form }: FieldProps) => {
          return (
            <FormFieldWrapper
              fieldType={fieldType}
              name={name}
              label={label}
              error={null}
              containerProps={containerProps}
              optional={optional}
            >
              <Box role={role} aria-labelledby={getLabelId(name)}>
                <CustomTileInputGroup {...rest} />
              </Box>
            </FormFieldWrapper>
          );
        }}
      />
    );
  }
}

export default FormCustomTileInputGroup;
