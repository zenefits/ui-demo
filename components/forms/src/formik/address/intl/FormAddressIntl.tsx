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

  /**
   * Should all inputs be disabled?
   * @default false
   */
  disabled?: boolean;
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
    const { autocomplete, name, includeCountry, includeLine2, includeName, disabled } = this.props;
    const addressPath = `${name}.line1`;
    const line1Props = {
      name: addressPath,
      label: 'Address Line 1',
      placeholder: '123 Main Street',
    };
    const commonProps = { disabled };
    return (
      <FormikConsumer>
        {formikProps => {
          const country = getIn(formikProps.values, `${name}.country`);
          return (
            <>
              {includeCountry && <FormAddressCountry name={`${name}.country`} {...commonProps} />}
              {includeName && <FormTextInput name={`${name}.name`} label="Name" {...commonProps} />}
              {autocomplete ? (
                <AddressAutocompleteInput
                  addressName={name}
                  includeLine2={includeLine2}
                  includeName={includeName}
                  country={country}
                  {...commonProps}
                  {...line1Props}
                />
              ) : (
                <FormTextInput {...commonProps} {...line1Props} />
              )}
              {includeLine2 && (
                <FormTextInput
                  name={`${name}.line2`}
                  label="Address Line 2"
                  placeholder="Apt or Suite Number"
                  optional
                  {...commonProps}
                />
              )}
              <FormTextInput name={`${name}.city`} label="City" {...commonProps} />
              <FormAddressState name={`${name}.state`} country={country} {...commonProps} />
              <FormAddressPostalCode name={`${name}.zip`} country={country} {...commonProps} />
            </>
          );
        }}
      </FormikConsumer>
    );
  }
}

export default FormAddressIntl;
