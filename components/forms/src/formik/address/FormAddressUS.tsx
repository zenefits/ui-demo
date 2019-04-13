import React, { Component } from 'react';

import { getEmptyValue, getValidationSchema, AddressHelperOptions, AddressValue } from './addressUtils';
import FormAddressIntl, { FormAddressIntlProps } from './intl/FormAddressIntl';

type FormAddressUSProps = FormAddressIntlProps;

class FormAddressUS extends Component<FormAddressUSProps> {
  static getEmptyValue = function(options: AddressHelperOptions = {}): AddressValue {
    const withCountry = { ...options, country: 'US' };
    return getEmptyValue(withCountry);
  };

  static getValidationSchema = getValidationSchema;

  render() {
    return <FormAddressIntl includeCountry={false} {...this.props} />;
  }
}

export default FormAddressUS;
