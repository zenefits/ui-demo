import React, { Component } from 'react';

import { styled } from 'z-frontend-theme';
import { Input } from 'z-frontend-forms';
import { Box, TextBlock } from 'zbase';

const StyledList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

interface TocProps {
  children: any;
  searchTerm: string;
  onSearchTermChange: Function;
}

// override default to use our Input and style headings
// https://github.com/styleguidist/react-styleguidist/blob/master/src/client/rsg-components/TableOfContents/TableOfContentsRenderer.js
class TableOfContentsRenderer extends Component<TocProps> {
  render() {
    const { children, searchTerm, onSearchTermChange } = this.props;
    return (
      <Box>
        <Box mb={3}>
          <Input value={searchTerm} placeholder="Search" onChange={event => onSearchTermChange(event.target.value)} />
        </Box>
        <StyledList>
          {children.props.items.map(item => (
            <li key={item.name} data-testid="TableOfContentsSection">
              <TextBlock fontStyle="headings.s">{item.name}</TextBlock>
              {item.content}
            </li>
          ))}
        </StyledList>
      </Box>
    );
  }
}

export default TableOfContentsRenderer;
