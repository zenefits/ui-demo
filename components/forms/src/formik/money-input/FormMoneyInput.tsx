import React, { Component } from 'react';
import { getIn, FieldProps } from 'formik';

import Field from '../Field';
import FormFieldWrapper, { FormFieldProps } from '../FormFieldWrapper';
import MoneyInput, { MoneyInputProps } from '../../money-input/MoneyInput';
import MoneyInputDisplay from '../../money-input/MoneyInputDisplay';
import { getAriaInputProps } from '../formAccessibility';

type FormMoneyInputProps = MoneyInputProps &
  FormFieldProps & {
    /**
     * Use to toggle the component from edit to display but keep exact spacing, eg in an EditableTable.
     * @default false
     */
    displayOnly?: boolean;
  };

class FormMoneyInput extends Component<FormMoneyInputProps> {
  render() {
    const {
      name,
      format,
      label,
      containerProps,
      optional,
      displayOnly,
      limitRerender,
      dependencies,
      'aria-label': ariaLabel,
      ...rest
    } = this.props;
    return (
      <Field name={name} limitRerender={limitRerender} dependencies={dependencies}>
        {({ field, form }: FieldProps) => {
          const error: any = getIn(form.touched, name) && getIn(form.errors, name);
          return (
            <FormFieldWrapper
              name={name}
              format={format}
              label={label}
              error={error}
              containerProps={containerProps}
              optional={optional}
            >
              {displayOnly ? (
                <MoneyInputDisplay value={field.value} {...rest} />
              ) : (
                <MoneyInput
                  id={name}
                  {...field}
                  onChange={(value: number | string) => {
                    form.setFieldValue(name, value);
                  }}
                  {...rest}
                  hasError={Boolean(error)}
                  {...getAriaInputProps(name, error, ariaLabel)}
                  mb={0}
                />
              )}
            </FormFieldWrapper>
          );
        }}
      </Field>
    );
  }
}

export default FormMoneyInput;
