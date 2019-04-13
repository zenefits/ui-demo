import React, { Component } from 'react';

import { Flex, Icon, TextBlock } from 'zbase';
import { styled, IconNameString } from 'z-frontend-theme';

import { OmniSearchSelectOption } from '../types';

import SearchInHelpCenterOption from './SearchInHelpCenterOption';

const leastCommonWidth = 14;

const StyledTextBlock = styled(TextBlock)`
  /* Overwrite .z2-navigation-container * { vertical-align: middle; } */
  * {
    vertical-align: baseline;
  }
`;

type CustomOptionProps = {
  /**
   * Function that transforms text into JSX with substring matching the current input in bold
   */
  withMatchEmphasis: (text: string) => JSX.Element;

  option: OmniSearchSelectOption;
};

class CustomOption extends Component<CustomOptionProps> {
  render() {
    const { option, withMatchEmphasis } = this.props;
    const { type, displayName } = option;

    let iconName: IconNameString = 'account-circle';

    if (type === 'action') {
      iconName = 'bookmark';
    } else if (type === 'help') {
      iconName = 'help-outline';
    }

    return type === 'helpCenter' ? (
      <SearchInHelpCenterOption searchString={option.searchString} withMatchEmphasis={withMatchEmphasis} />
    ) : (
      <Flex align="baseline">
        <Flex w={leastCommonWidth} justify="center" mr={2}>
          <Icon iconName={iconName} s="medium" />
        </Flex>
        <StyledTextBlock>{withMatchEmphasis(displayName)}</StyledTextBlock>
      </Flex>
    );
  }
}

export default CustomOption;
