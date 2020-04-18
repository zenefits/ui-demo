import React, { Component } from 'react';

import {
  getEmptyValue,
  getValidationSchema,
  AddressHelperOptions,
  AddressValidationOptions,
  AddressValue,
} from './addressUtils';
import FormAddressIntl, { FormAddressIntlProps } from './intl/FormAddressIntl';

type FormAddressUSProps = FormAddressIntlProps;

class FormAddressUS extends Component<FormAddressUSProps> {
  static getEmptyValue = (options: AddressHelperOptions = {}): AddressValue => {
    const withCountry = { ...options, country: 'US' };
    return getEmptyValue(withCountry);
  };

  static getValidationSchema = (namePrefix: string, options: AddressValidationOptions = {}) =>
    getValidationSchema(namePrefix, { ...options, includeCountry: false });

  render() {
    return <FormAddressIntl includeCountry={false} {...this.props} />;
  }
}

export default FormAddressUS;
