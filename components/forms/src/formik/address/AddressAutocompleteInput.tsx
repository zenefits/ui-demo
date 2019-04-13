import React, { Component } from 'react';
import { getIn, FormikConsumer } from 'formik';

import { Box } from 'zbase';

import AddressAutocomplete from './AddressAutocomplete';
import FormTextInput from '../text-input/FormTextInput';
import { AddressValue } from './addressUtils';
import AddressAutocompleteOptions from './AddressAutocompleteOptions';

type AddressAutocompleteInputProps = {
  name: string;
  addressName: string;
  /** Restrict results to specific country. */
  country?: string;
  includeName: boolean;
  includeLine2: boolean;
  label: string;
  placeholder: string;
};

class AddressAutocompleteInput extends Component<AddressAutocompleteInputProps> {
  state: {
    showSuggestions: false;
  };

  render() {
    const { name, addressName, country, includeLine2, includeName, ...rest } = this.props;
    return (
      <FormikConsumer>
        {formikProps => {
          const line1 = getIn(formikProps.values, name);
          const initialLine1 = getIn(formikProps.initialValues, name);
          const shouldFetchSuggestions = line1 !== initialLine1 && line1.length > 2;
          return (
            <AddressAutocomplete
              value={line1}
              country={country}
              onChange={(address: string) => {
                formikProps.setFieldValue(name, address);
              }}
              onError={(status, clearSuggestions) => {
                if (status !== 'ZERO_RESULTS') {
                  console.error(
                    `AddressAutocomplete: Google Maps geocoding failed with status ${status} for input "${line1}"`,
                  );
                }
                clearSuggestions();
              }}
              onSelect={(mapped: AddressValue) => {
                if (includeName && !mapped.name) {
                  mapped.name = '';
                }
                if (includeLine2 && !mapped.line2) {
                  mapped.line2 = '';
                }
                formikProps.setValues({
                  [addressName]: mapped,
                });
              }}
              shouldFetchSuggestions={shouldFetchSuggestions}
            >
              {({ getInputProps, suggestions, getSuggestionItemProps }) => (
                <Box style={{ position: 'relative' }}>
                  <FormTextInput name={name} {...rest} {...getInputProps({})} />
                  <AddressAutocompleteOptions
                    suggestions={suggestions}
                    getSuggestionItemProps={getSuggestionItemProps}
                  />
                </Box>
              )}
            </AddressAutocomplete>
          );
        }}
      </FormikConsumer>
    );
  }
}

export default AddressAutocompleteInput;
