import React, { StatelessComponent } from 'react';

import { FlexProps } from 'zbase';

import FormError from './error/FormError';
import FieldRow from './FieldRow';
import { FormFieldType, FormInputWrapper, FormLabel } from './FormLabel';
import { getErrorId, getLabelId } from './FormFieldWrapper';

export type FormGroupProps = {
  /** HTML id for group node  */
  id: string;
  /** Human-friendly label for the group. */
  label: string;
  /** Utility props to pass through to the container. */
  containerProps?: FlexProps;
  /** Which kind of input is being wrapped (to help determine layout). */
  fieldType?: FormFieldType;
  error?: string;
  optional?: boolean;
};

/** Component that groups multiple inputs together in a single row. */
const FormGroup: StatelessComponent<FormGroupProps> = ({
  children,
  id,
  error,
  label,
  containerProps,
  fieldType,
  optional,
}) => (
  <FieldRow
    {...containerProps}
    data-fieldrow-test-marker
    role="group"
    aria-labelledby={getLabelId(id)}
    aria-describedby={error && getErrorId(id)}
  >
    <FormLabel id={getLabelId(id)} htmlFor={id} fieldType={fieldType} optional={optional}>
      {label}
    </FormLabel>
    <FormInputWrapper label={label}>
      {children}
      {error && <FormError mt="2px" id={getErrorId(id)} textDefault={error} />}
    </FormInputWrapper>
  </FieldRow>
);

export default FormGroup;
