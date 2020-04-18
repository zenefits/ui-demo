import React, { Component } from 'react';
import { getIn } from 'formik';

import Field from '../Field';
import SimpleSelect, { SharedSimpleSelectProps } from '../../select/SimpleSelect';
import FormFieldWrapper, { FormFieldProps } from '../FormFieldWrapper';

import SimpleSelectDisplay from '../../select/SimpleSelectDisplay';

type OwnProps = {
  /**
   * Use to toggle the component from edit to display but keep exact spacing, eg in an EditableTable.
   * @default false
   */
  displayOnly?: boolean;
};

class FormSimpleSelect<OptionValue> extends Component<
  SharedSimpleSelectProps<OptionValue> & FormFieldProps & OwnProps
> {
  render() {
    const {
      name,
      label,
      containerProps,
      optional,
      format,
      onChange,
      getOptionText,
      displayOnly,
      limitRerender,
      dependencies,
      helpText,
      ...rest
    } = this.props;
    return (
      <Field name={name} limitRerender={limitRerender} dependencies={dependencies}>
        {({ field, form, setFieldValueAndTouched }) => {
          const error: any = getIn(form.touched, name) && getIn(form.errors, name);
          return (
            <FormFieldWrapper
              name={name}
              label={label}
              helpText={helpText}
              error={error}
              format={format}
              containerProps={containerProps}
              optional={optional}
            >
              {displayOnly ? (
                <SimpleSelectDisplay value={field.value} getOptionText={getOptionText} {...rest} />
              ) : (
                <SimpleSelect
                  name={name}
                  error={error}
                  onChange={(option: OptionValue) => {
                    this.props.onChange && this.props.onChange(option);
                    setFieldValueAndTouched(field.name, option);
                  }}
                  value={field.value}
                  getOptionText={getOptionText}
                  {...rest}
                />
              )}
            </FormFieldWrapper>
          );
        }}
      </Field>
    );
  }
}

export default FormSimpleSelect;
