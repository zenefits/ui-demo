import React from 'react';

import { Flex } from 'zbase';
import { styled, ColorString } from 'z-frontend-theme';

import CalendarRowHeader from './CalendarRowHeader';
import { colors, styles } from './constants';

interface CalendarRowHeadersProps<TRow> {
  /**
   * Contains the main data for the calendar
   */
  rows: TRow[];

  /**
   * A render prop to render the top-left corner cell
   */
  topLeftCellTemplate?: () => React.ReactChild;

  /**
   * A render prop to render row headers, which are the most left column
   */
  rowHeaderTemplate: (rowData: TRow) => React.ReactChild;
}

const TopLeftCellContainer = styled(Flex)`
  height: ${styles.topRowCellHeight};
  overflow: hidden;
`;

const RowHeadersColumnContainer = styled(Flex)`
  /**
   * most left column:
   * fixed width 223px including right border
   * right 7 columns:
   * use percentage 1 / 7 of available width, hold a min-width 151px
   * 151px * 7 = 1057px
   * 223 + 1057 = 1280
   * when window is smaller than 1280px, use horizontal scroll for the right 7 columns
   * i.e. min-width without horizontal scrolling is 1280px
   */
  min-width: ${styles.rowHeaderColumnMinWidth};
`;

/**
 * A component to render the most left column for Calendar component
 * it consists of two parts:
 * 1. the top left cell
 * 2. the row headers
 */
class CalendarRowHeaders<TCell, TRow extends { columns: TCell[] }> extends React.Component<
  CalendarRowHeadersProps<TRow>
> {
  render() {
    const { rows, rowHeaderTemplate, topLeftCellTemplate } = this.props;

    return (
      <RowHeadersColumnContainer column>
        <TopLeftCellContainer
          borderBottom
          borderRight
          borderColor={colors.border}
          align="center"
          bg={colors.rowBgLight}
        >
          {topLeftCellTemplate && topLeftCellTemplate()}
        </TopLeftCellContainer>

        {rows.map((row, index) => {
          const bgColor: ColorString = index % 2 ? colors.rowBgLight : colors.rowBgDark;
          return (
            <CalendarRowHeader<TCell, TRow>
              key={JSON.stringify(row)}
              row={row}
              rowHeaderTemplate={rowHeaderTemplate}
              bgColor={bgColor}
            />
          );
        })}
      </RowHeadersColumnContainer>
    );
  }
}

export default CalendarRowHeaders;
