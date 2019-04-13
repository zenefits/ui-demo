import React, { Component } from 'react';

import { Form } from 'z-frontend-forms';

import DataFilterSection from './DataFilterSection';
import DataFilterText from './DataFilterText';
import DataFilterCheckboxGroup from './DataFilterCheckboxGroup';
import DataFilterDateRange from './DataFilterDateRange';

type DataFilterContainerProps = {};

export default class DataFilter extends Component<DataFilterContainerProps> {
  static Section = DataFilterSection;
  static Text = DataFilterText;
  static CheckboxGroup = DataFilterCheckboxGroup;
  static DateRange = DataFilterDateRange;

  render() {
    return (
      // NOTE: the state generally lives in DataManager, but fields rely on this being present
      <Form initialValues={{}} onSubmit={() => {}}>
        {this.props.children}
      </Form>
    );
  }
}
