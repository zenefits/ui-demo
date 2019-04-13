import React, { Component } from 'react';

import { styled } from 'z-frontend-theme';

import { SelectOptions } from '../../select/SelectOptions';
import { SearchOptionDeprecated } from '../../..';

const optionsContainerWidth = [1, 2 / 3, 2 / 3, 3 / 4];

const AddressSelectOptions = styled(SelectOptions)`
  top: 100%; /* overcome margin */
  right: 0;
`;

type AddressAutocompleteOptionsProps = {
  suggestions: any[];
  getSuggestionItemProps: Function;
};

class AddressAutocompleteOptions extends Component<AddressAutocompleteOptionsProps> {
  render() {
    const { suggestions, getSuggestionItemProps } = this.props;
    if (!suggestions.length) {
      return null;
    }

    return (
      <AddressSelectOptions s="medium" maxHeight={240} role="listbox" position="absolute" w={optionsContainerWidth}>
        {suggestions.map((suggestion: any) => {
          return (
            <SearchOptionDeprecated
              key={suggestion.id}
              s="small"
              selected={suggestion.active}
              {...getSuggestionItemProps(suggestion)}
            >
              {suggestion.description}
            </SearchOptionDeprecated>
          );
        })}
      </AddressSelectOptions>
    );
  }
}

export default AddressAutocompleteOptions;
