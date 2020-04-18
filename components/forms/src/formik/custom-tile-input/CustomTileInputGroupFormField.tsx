import React, { FunctionComponent } from 'react';

import { Box } from 'zbase';

import FormFieldWrapper, { getLabelId, FormFieldProps } from '../FormFieldWrapper';
import CustomTileInputGroup, { CustomTileInputGroupProps } from './CustomTileInputGroup';

// This is the props type for FormCustomTileInputGroup.
// Normally this should be defined in the same file as the component.
// However, it is defined here to avoid dependency loop.
export type FormCustomTileInputGroupProps = FormFieldProps & CustomTileInputGroupProps;

export type FieldType = 'checkboxGroup' | 'radio';

export type Role = 'group' | 'radiogroup';

type CustomTileInputGroupFormFieldProps = Omit<FormCustomTileInputGroupProps, 'fieldType'> & {
  fieldType: FieldType;
  role: Role;
  error: string;
};

// This component is used inside FormCustomTileInputGroup to reduce code duplication.
const CustomTileInputGroupFormField: FunctionComponent<CustomTileInputGroupFormFieldProps> = props => {
  const {
    arrayHelpers,
    arrayValues,
    containerProps,
    dependencies,
    error,
    fieldType,
    format,
    isCheckbox,
    label,
    limitRerender,
    name,
    optional,
    role,
    ...rest
  } = props;
  return (
    <FormFieldWrapper
      fieldType={fieldType}
      name={name}
      label={label}
      error={error}
      containerProps={containerProps}
      optional={optional}
      format={format}
    >
      <Box role={role} aria-labelledby={getLabelId(name)}>
        <CustomTileInputGroup
          arrayHelpers={arrayHelpers}
          arrayValues={arrayValues}
          limitRerender={limitRerender}
          dependencies={dependencies}
          isCheckbox={isCheckbox}
          {...rest}
        />
      </Box>
    </FormFieldWrapper>
  );
};

export default CustomTileInputGroupFormField;
