import React, { Component } from 'react';
import { getIn, FieldArray, FieldProps } from 'formik';

import Field from '../Field';
import { normalizeError } from '../checkbox/FormCheckboxGroup';
import CustomTileInputGroupField, {
  FieldType,
  FormCustomTileInputGroupProps,
  Role,
} from './CustomTileInputGroupFormField';

class FormCustomTileInputGroup extends Component<FormCustomTileInputGroupProps> {
  render() {
    const { name, limitRerender, dependencies, isCheckbox } = this.props;
    const fieldType: FieldType = isCheckbox ? 'checkboxGroup' : 'radio';
    const role: Role = isCheckbox ? 'group' : 'radiogroup';

    return isCheckbox ? (
      <FieldArray
        name={name}
        render={arrayHelpers => {
          const { form } = arrayHelpers;

          if (!Array.isArray(getIn(form.initialValues, name))) {
            console.error('When FormCustomTileInputGroup is used in checkbox mode, initial value should be an array.');
            return null;
          }

          const error: string = normalizeError(getIn(form.touched, name) && getIn(form.errors, name));
          const arrayValues: any[] = getIn(form.values, name);

          return (
            <CustomTileInputGroupField
              {...this.props}
              arrayHelpers={arrayHelpers}
              arrayValues={arrayValues}
              error={error}
              fieldType={fieldType}
              role={role}
            />
          );
        }}
      />
    ) : (
      <Field name={name} limitRerender={limitRerender} dependencies={dependencies} type={fieldType}>
        {({ field, form }: FieldProps) => {
          const error: string = getIn(form.touched, name) && getIn(form.errors, name);
          return <CustomTileInputGroupField {...this.props} error={error} fieldType={fieldType} role={role} />;
        }}
      </Field>
    );
  }
}

export default FormCustomTileInputGroup;
