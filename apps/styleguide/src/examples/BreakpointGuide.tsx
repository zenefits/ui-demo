import React, { Component } from 'react';

import { styled, theme } from 'z-frontend-theme';
import { color } from 'z-frontend-theme/utils';

const TableWithBorders = styled.table`
  border-collapse: collapse;

  td,
  th {
    border: 1px solid ${color('grayscale.black')};
  }
`;

class BreakpointGuide extends Component {
  render() {
    return (
      <TableWithBorders cellSpacing="0" cellPadding="10">
        <thead>
          <tr>
            {Object.keys(theme.breakpoints).map(key => (
              <th key={key}>{key}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            {Object.keys(theme.breakpoints).map(key => (
              <td key={key}>{16 * theme.breakpoints[key]}px</td>
            ))}
          </tr>
        </tbody>
      </TableWithBorders>
    );
  }
}

export default BreakpointGuide;
