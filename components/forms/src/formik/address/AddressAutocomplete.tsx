import React, { Component, ReactNode } from 'react';
import PlacesAutocomplete, { geocodeByAddress } from 'react-places-autocomplete';
// @ts-ignore
import Script from 'react-load-script';

import { Box } from 'zbase';

import { geocodeToAddressValue, AddressValue } from './addressUtils';

export const GOOGLE_PLACES_API_URL =
  'https://maps.googleapis.com/maps/api/js?client=gme-zenefits&v=3.exp&libraries=places';

interface AddressAutocompleteProps {
  children: (...args: any[]) => ReactNode;
  value: string;
  onChange: (value: string) => void;
  onSelect?: (mappedAddress: AddressValue) => void;
  onError?: (status: string, clearSuggestions: Function) => void;
  shouldFetchSuggestions?: boolean;
  /** Country to restrict results to. */
  country?: string;
}

class AddressAutocomplete extends Component<AddressAutocompleteProps> {
  state = {
    scriptLoaded: false,
    scriptError: false,
  };

  handleScriptLoad = () => this.setState({ scriptLoaded: true });
  handleScriptError = () => this.setState({ scriptError: true });

  handleSelect = async (address: string, placeId?: string) => {
    // fetch again to get components of address
    // NOTE: `placeId` is null when user hits Enter key with no suggestion item selected
    const result = await geocodeByAddress(address);
    this.props.onSelect(geocodeToAddressValue(result));
  };

  render() {
    const { children, country, onSelect, ...rest } = this.props;
    const { scriptError, scriptLoaded } = this.state;

    const options: any = {
      types: ['geocode'], // https://developers.google.com/places/supported_types#table3
    };
    if (country) {
      options.componentRestrictions = {
        country,
      };
    }

    const showAutocomplete = window.__WITHIN_EMBER_APP__ || (!scriptError && scriptLoaded);

    return (
      <Box>
        {!window.__WITHIN_EMBER_APP__ && (
          <Script url={GOOGLE_PLACES_API_URL} onLoad={this.handleScriptLoad} onError={this.handleScriptError} />
        )}
        {showAutocomplete && (
          // types are outdated: https://github.com/DefinitelyTyped/DefinitelyTyped/pull/24259#issuecomment-416515205
          // @ts-ignore
          <PlacesAutocomplete onSelect={this.handleSelect} searchOptions={options} {...rest}>
            {children}
          </PlacesAutocomplete>
        )}
      </Box>
    );
  }
}

export default AddressAutocomplete;
