import React, { Component } from 'react';
import { getIn, FormikConsumer } from 'formik';

import FormTextInput from '../../text-input/FormTextInput';
import { getEmptyValue, getValidationSchema } from '../addressUtils';

import FormAddressCountry from './FormAddressCountry';
import FormAddressState from './FormAddressState';
import FormAddressPostalCode from './FormAddressPostalCode';
import AddressAutocompleteInput from '../AddressAutocompleteInput';

export type FormAddressIntlProps = {
  /**
   * Key used in initialValues for address object.
   */
  name: string;

  /**
   * Include field for country?
   * @default true
   */
  includeCountry?: boolean;

  /**
   * Include field for street address line 2?
   * @default true
   */
  includeLine2?: boolean;

  /**
   * Include field for recipient name?
   * @default false
   */
  includeName?: boolean;

  /**
   * Should autocomplete address based on line 1 using Google Maps Geocoder service?
   * @default false
   */
  autocomplete?: boolean;
};

class FormAddressIntl extends Component<FormAddressIntlProps> {
  static getEmptyValue = getEmptyValue;
  static getValidationSchema = getValidationSchema;

  static defaultProps = {
    includeCountry: true,
    includeLine2: true,
    includeName: false,
  };

  render() {
    const { autocomplete, name, includeCountry, includeLine2, includeName } = this.props;
    const addressPath = `${name}.line1`;
    const line1Props = {
      name: addressPath,
      label: 'Address Line 1',
      placeholder: '123 Main Street',
    };
    return (
      <FormikConsumer>
        {formikProps => {
          const country = getIn(formikProps.values, `${name}.country`);
          return (
            <>
              {includeCountry && <FormAddressCountry name={`${name}.country`} />}
              {includeName && <FormTextInput name={`${name}.name`} label="Name" />}
              {autocomplete ? (
                <AddressAutocompleteInput
                  addressName={name}
                  includeLine2={includeLine2}
                  includeName={includeName}
                  country={country}
                  {...line1Props}
                />
              ) : (
                <FormTextInput {...line1Props} />
              )}
              {includeLine2 && (
                <FormTextInput
                  name={`${name}.line2`}
                  label="Address Line 2"
                  placeholder="Apt or Suite Number"
                  optional
                />
              )}
              <FormTextInput name={`${name}.city`} label="City" />
              <FormAddressState name={`${name}.state`} country={country} />
              <FormAddressPostalCode name={`${name}.zip`} country={country} />
            </>
          );
        }}
      </FormikConsumer>
    );
  }
}

export default FormAddressIntl;
