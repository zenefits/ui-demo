import React, { StatelessComponent } from 'react';
import { WrappedFieldProps } from 'redux-form';

import FieldWrapper, { FieldProps } from './FieldWrapper';
import Select from '../Select';

export const FormSelect: StatelessComponent<WrappedFieldProps> = ({ input, ...rest }) => (
  <Select {...rest} {...input} />
);

// TODO: types
const SelectField: StatelessComponent<FieldProps & any> = props => <FieldWrapper component={FormSelect} {...props} />;

export default SelectField;
