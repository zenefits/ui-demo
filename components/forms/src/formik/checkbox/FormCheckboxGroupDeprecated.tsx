import React, { Component } from 'react';

import { Box } from 'zbase';

import FormFieldWrapper, { getLabelId, FormFieldProps } from '../FormFieldWrapper';
import FormCheckbox from './FormCheckbox';

type FormCheckboxGroupProps = Partial<FormFieldProps> & {
  /** The Form.Checkbox options to render. */
  children: React.ReactElement<FormCheckbox> | React.ReactElement<FormCheckbox>[];
};

/**
 * @deprecated Please use Form.CheckboxGroup instead
 */
class FormCheckboxGroupDeprecated extends Component<FormCheckboxGroupProps> {
  render() {
    const { name, label, children, containerProps, optional, ...rest } = this.props;
    const extraChildProps = {
      containerProps: {
        mb: 1,
        ...containerProps,
      },
      ...rest,
    };
    return (
      <FormFieldWrapper
        name={name}
        label={label}
        error={null}
        containerProps={containerProps}
        fieldType="checkbox"
        optional={optional}
      >
        <Box role="group" aria-labelledby={getLabelId(name)}>
          {React.Children.map(children, child => {
            return React.cloneElement(child as React.ReactElement<any>, extraChildProps);
          })}
        </Box>
      </FormFieldWrapper>
    );
  }
}

export default FormCheckboxGroupDeprecated;
