import React, { Component } from 'react';

import { Form } from 'z-frontend-forms';

import DataFilterSection from './DataFilterSection';
import DataFilterText from './DataFilterText';
import DataFilterCheckboxGroup from './DataFilterCheckboxGroup';
import DataFilterMultiSelect from './DataFilterMultiSelect';
import DataFilterDateRange from './DataFilterDateRange';
import UrlFilterSelect from '../url-filters/UrlFilterSelect';
import UrlFilterMultiSelect from '../url-filters/UrlFilterMultiSelect';
import UrlFilterText from '../url-filters/UrlFilterText';
import UrlFilterCheckboxGroup from '../url-filters/UrlFilterCheckboxGroup';
import UrlFilterDateRange from '../url-filters/UrlFilterDateRange';

export default class DataFilter extends Component<{}> {
  static Section = DataFilterSection;

  static Text = DataFilterText;

  static CheckboxGroup = DataFilterCheckboxGroup;

  static MultiSelect = DataFilterMultiSelect;

  static DateRange = DataFilterDateRange;

  static UrlFilterSelect = UrlFilterSelect;

  static UrlFilterMultiSelect = UrlFilterMultiSelect;

  static UrlFilterText = UrlFilterText;

  static UrlFilterCheckboxGroup = UrlFilterCheckboxGroup;

  static UrlFilterDateRange = UrlFilterDateRange;

  render() {
    return (
      // NOTE: the state generally lives in DataManager, but fields rely on this being present
      <Form initialValues={{}} onSubmit={() => {}}>
        {this.props.children}
      </Form>
    );
  }
}
