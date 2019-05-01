import React, { Component } from 'react';

import { Form, FormCheckboxProps } from 'z-frontend-forms';

export default class TableCheckboxCell extends Component<FormCheckboxProps> {
  render() {
    return <Form.Checkbox containerProps={{ mb: 0 }} {...this.props} />;
  }
}
