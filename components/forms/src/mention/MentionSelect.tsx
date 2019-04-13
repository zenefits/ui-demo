import React, { Component } from 'react';

import { color } from 'z-frontend-theme/utils';
import { styled } from 'z-frontend-theme';

import { SearchOption, SearchOptions } from '../search/SearchSelectDeprecated';

export type MentionOption = {
  id: string;
  menuLabel: string;
  tagLabel: string;
};

type MentionSelectProps = {
  suggestions: MentionOption[];
  selectedIndex?: number;
  onMentionClick?: (index: number) => void;
  onMentionHover?: (index: number) => void;
};

const MentionSelectContainer = styled(SearchOptions)`
  border-top: 1px solid ${color('secondary.b')}; /* override funky SearchOptions default */
`;

class MentionSelect extends Component<MentionSelectProps> {
  render() {
    const { suggestions, selectedIndex, onMentionClick, onMentionHover } = this.props;
    if (!suggestions.length) {
      return null;
    }

    return (
      <MentionSelectContainer s="small">
        {suggestions.map((suggestion, i) => (
          <SearchOption
            key={suggestion.id}
            s="small"
            onMouseEnter={() => onMentionHover(i)}
            selected={selectedIndex === i}
            onMouseDown={() => onMentionClick(i)}
          >
            {suggestion.menuLabel}
          </SearchOption>
        ))}
      </MentionSelectContainer>
    );
  }
}

export default MentionSelect;
