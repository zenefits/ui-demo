import React from 'react';

import { Flex } from 'zbase';
import { styled, ColorString } from 'z-frontend-theme';
import { DragAndDrop } from 'z-frontend-drag-and-drop';

import { CellClickEvent, CellPosition, DropHandler } from './interfaces';
import DayHeaderRow from './DayHeaderRow';
import CalendarRow from './CalendarRow';
import { colors } from './constants';

interface CalendarMainContentProps<TCell, TRow, Source> {
  /**
   * The first day displayed on the calendar
   */
  startDate: Date;

  /**
   * Number of days to display
   */
  numberOfDays: number;

  /**
   * Contains the main data for the calendar
   */
  rows: TRow[];

  /**
   * A render prop to render a cell
   */
  cellTemplate: (data: { cellData: TCell; rowData: TRow; cellPosition: CellPosition }) => React.ReactChild;

  /**
   * Event occurs when an element is being dropped
   */
  onDrop?: DropHandler<Source>;

  onCellClick?: (cellClickEvent: CellClickEvent<TCell>) => any;
}

const MainContentContainer = styled(Flex)`
  overflow-x: scroll;
`;

/**
 * A component to render all the things except the most left column of Calendar component
 * it consists of two parts:
 * 1. the top row to show days
 * 2. the actual body rows to display arbitrary content
 */
class CalendarMainContent<TCell, TRow extends { columns: TCell[] }, Source> extends React.Component<
  CalendarMainContentProps<TCell, TRow, Source>
> {
  static defaultProps = {
    // This default is used to avoid null check
    onDrop: () => {},
  };

  createOnCellClick = (rowIndex: number) => (columnIndex: number) => {
    this.props.onCellClick &&
      this.props.onCellClick({
        cellPosition: { row: rowIndex, column: columnIndex },
        cellData: this.props.rows[rowIndex].columns[columnIndex],
      });
  };

  onDrop = (source: any, target: { row: number; column: number }) => {
    this.props.onDrop({
      source,
      target,
    });
  };

  render() {
    const { rows, startDate, cellTemplate, numberOfDays } = this.props;

    return (
      <DragAndDrop onDrop={this.onDrop}>
        {() => (
          <MainContentContainer column flex="1">
            <DayHeaderRow startDate={startDate} numberOfDays={numberOfDays} />

            {rows.map((row, index) => {
              const bgColor: ColorString = index % 2 ? colors.rowBgLight : colors.rowBgDark;
              return (
                <CalendarRow<TCell, TRow>
                  key={index}
                  row={row}
                  cellTemplate={cellTemplate}
                  bgColor={bgColor}
                  onCellClick={this.createOnCellClick(index)}
                  numberOfColumns={numberOfDays}
                  rowIndex={index}
                />
              );
            })}
          </MainContentContainer>
        )}
      </DragAndDrop>
    );
  }
}

export default CalendarMainContent;
