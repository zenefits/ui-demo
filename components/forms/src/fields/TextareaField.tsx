import React, { StatelessComponent } from 'react';
import { WrappedFieldProps } from 'redux-form';

import FieldWrapper, { FieldProps } from './FieldWrapper';
import Textarea, { TextareaProps } from '../Textarea';

const WrappedTextarea: StatelessComponent<WrappedFieldProps> = ({ input, ...rest }) => (
  <Textarea {...rest} {...input} />
);

const TextareaField: StatelessComponent<FieldProps & TextareaProps> = props => (
  <FieldWrapper type="text" {...props} component={WrappedTextarea} />
);

export default TextareaField;
