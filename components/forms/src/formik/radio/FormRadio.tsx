import React, { Component } from 'react';
import { getIn, Field, FieldProps } from 'formik';

import Radio, { RadioProps } from '../../radio/Radio';

type FormRadioProps = RadioProps & {
  /**
   * The name of the control, which is submitted with the control's value as part of the form data.
   * Usually provided by the enclosing Form.RadioGroup.
   */
  name?: string;
  /** Human-friendly label for the radio button. */
  label: string;
  /** The value of the control, which is submitted with the control's name as part of the form data. */
  value: string;
};

class FormRadio extends Component<FormRadioProps> {
  render() {
    const { name, value, ...rest } = this.props;
    return (
      <Field
        name={name}
        type="radio"
        render={({ field, form }: FieldProps) => {
          // TODO: why is it necessary to set value manually? (Formik is not connecting it to field.value.)
          return <Radio {...field} {...rest} value={value} checked={getIn(form.values, name) === value} />;
        }}
      />
    );
  }
}

export default FormRadio;
