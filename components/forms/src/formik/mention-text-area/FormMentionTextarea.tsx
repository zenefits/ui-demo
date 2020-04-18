import React, { Component } from 'react';
import { getIn, FieldProps } from 'formik';

import Field from '../Field';
import MentionTextarea, { MentionTextareaProps } from '../../mention/MentionTextarea';
import FormFieldWrapper, { FormFieldProps } from '../FormFieldWrapper';
import { getAriaInputProps } from '../formAccessibility';

type FormMentionTextareaProps = MentionTextareaProps & FormFieldProps;

class FormMentionTextarea extends Component<FormMentionTextareaProps> {
  render() {
    const {
      name,
      label,
      containerProps,
      optional,
      limitRerender,
      dependencies,
      'aria-label': ariaLabel,
      ...rest
    } = this.props;
    return (
      <Field
        name={name}
        limitRerender={limitRerender}
        // This is a hacky solution to force rerender for use cases when options change asynchronously
        // (eg. when loading finishes) without noticeably impacting performance when there are many options
        limitRerenderWatched={this.props.options.slice(0, 10)}
        dependencies={dependencies}
      >
        {({ field, form }: FieldProps) => {
          const error: any = getIn(form.touched, name) && getIn(form.errors, name);
          // deliberately using `defaultValue`, not `value`
          // use dynamic key to "reset" uncontrolled component (underlying RichEditor relies heavily on DOM)
          // see "fully uncontrolled with key" https://reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html#recommendation-fully-uncontrolled-component-with-a-key
          const key = `${name}-${form.submitCount}`;
          const defaultValue = field.value;
          return (
            <FormFieldWrapper
              name={name}
              label={label}
              error={error}
              containerProps={containerProps}
              manualLabelFocus
              optional={optional}
            >
              <MentionTextarea
                key={key}
                id={name}
                name={name}
                defaultValue={defaultValue}
                onChange={(value: string) => form.setFieldValue(name, value)} // treat as custom because synthetic DOM event `e` not exposed
                onBlur={() => form.setFieldTouched(name, true)} // treat as custom because synthetic DOM event `e` not exposed
                {...rest}
                hasError={Boolean(error)}
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

export default FormMentionTextarea;
