import React from 'react';

import { Flex } from 'zbase';
import { styled, ColorString } from 'z-frontend-theme';

import { colors, styles } from './constants';

interface CalendarRowHeaderProps<TRow> {
  /**
   * Contains the data for the row
   */
  row: TRow;

  /**
   * A render prop to render row headers, which are the most left column
   */
  rowHeaderTemplate: (rowData: TRow) => React.ReactChild;

  bgColor: ColorString;
}

const RowHeaderContainer = styled(Flex)`
  min-height: ${styles.cellMinHeight};
`;

/**
 * A component to render a row header for Calendar component,
 */
class CalendarRowHeader<TCell, TRow extends { columns: TCell[]; height?: string }> extends React.Component<
  CalendarRowHeaderProps<TRow>
> {
  render() {
    const { row, rowHeaderTemplate, bgColor } = this.props;
    const containerStyle = row.height && { height: row.height };

    return (
      <RowHeaderContainer
        borderBottom
        borderRight
        borderColor={colors.border}
        align="center"
        bg={bgColor}
        style={containerStyle}
      >
        {rowHeaderTemplate(row)}
      </RowHeaderContainer>
    );
  }
}

export default CalendarRowHeader;
