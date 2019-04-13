import React, { Component } from 'react';

import { Flex, TextBlock } from 'zbase';

type SearchInHelpCenterOptionProps = {
  searchString: string;

  withMatchEmphasis: (text: string) => JSX.Element;
};

class SearchInHelpCenterOption extends Component<SearchInHelpCenterOptionProps> {
  render() {
    const { searchString, withMatchEmphasis } = this.props;

    return (
      <Flex>
        <TextBlock>{withMatchEmphasis(`Search ${searchString} in help center`)}</TextBlock>
      </Flex>
    );
  }
}
export default SearchInHelpCenterOption;
