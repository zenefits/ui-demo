import React, { Component } from 'react';

import { Form } from 'z-frontend-forms';

type DataFilterSectionProps = { label: string };

export default class DataFilterSection extends Component<DataFilterSectionProps> {
  static defaultProps = {
    pb: 1, // smaller than FormSection default
  };

  render() {
    return <Form.Section {...this.props} />;
  }
}
