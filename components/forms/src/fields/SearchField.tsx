import React, { Component } from 'react';

import FieldWrapper from './FieldWrapper';
import Select from '../Select';

class SearchField extends Component<any> {
  static defaultProps = {
    simpleValue: true,
  };
  render() {
    const { input: { value, onChange }, ...rest } = this.props;
    return <Select onChange={onChange} value={value} {...rest} />;
  }
}

// TODO(airat): fix types later
export default props => {
  const { format, ...rest } = props;
  // null values will be converted to empty string by default which cause react select to display an "x" icon
  // reset the formatting here
  return <FieldWrapper format={null} component={SearchField} {...rest} />;
};
