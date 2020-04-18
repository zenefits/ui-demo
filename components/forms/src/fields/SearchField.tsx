import React, { Component } from 'react';
// eslint-disable-next-line zenefits-custom-rules/import-filter
import { WrappedFieldProps } from 'redux-form';

import FieldWrapper, { FieldProps } from './FieldWrapper';
import SelectDeprecated, { SelectProps as SelectDeprecatedProps } from '../select/SelectDeprecated';

class SearchField extends Component<WrappedFieldProps & SelectDeprecatedProps> {
  static defaultProps = {
    simpleValue: true,
  };

  render() {
    const {
      input: { value, onChange },
      ...rest
    } = this.props;
    return <SelectDeprecated onChange={onChange} value={value} {...rest} />;
  }
}

export default (props: SelectDeprecatedProps & FieldProps) => {
  const { format, ...rest } = props;
  // null values will be converted to empty string by default which cause react select to display an "x" icon
  // reset the formatting here
  return <FieldWrapper<SelectDeprecatedProps> format={null} component={SearchField} {...rest} />;
};
