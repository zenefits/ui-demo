import React from 'react';

import { Flex } from 'zbase';

import CalendarRowHeaders from './CalendarRowHeaders';
import { CellClickEvent, CellTemplateParams, DropHandler } from './interfaces';
import CalendarMainContent from './CalendarMainContent';
import { colors } from './constants';

interface CalendarProps<TCell, TRow extends { columns: TCell[]; height?: string }, Source> {
  /**
   * The first day displayed on the calendar
   */
  startDate: Date;

  /**
   * Number of days to display, default is 7
   */
  numberOfDays?: number;

  /**
   * Contains the main data for the calendar
   */
  rows: TRow[];

  /**
   * A render prop to render the top-left corner cell
   */
  topLeftCellTemplate?: () => React.ReactChild;

  /**
   * A render prop to render a cell. only called when cellData and rowData are present
   */
  cellTemplate: (data: CellTemplateParams<TCell, TRow>) => React.ReactChild;

  /**
   * A render prop to render row headers, which are the most left column
   */
  rowHeaderTemplate: (rowData: TRow) => React.ReactChild;

  /**
   * Event occurs when an element is being dropped
   */
  onDrop?: DropHandler<Source>;

  onCellClick?: (cellClickEvent: CellClickEvent<TCell>) => void;
}

class Calendar<TCell, TRow extends { columns: TCell[]; height?: string }, Source = {}> extends React.Component<
  CalendarProps<TCell, TRow, Source>
> {
  static defaultProps = {
    numberOfDays: 7,
  };

  render() {
    const {
      rows,
      rowHeaderTemplate,
      cellTemplate,
      startDate,
      topLeftCellTemplate,
      onCellClick,
      onDrop,
      numberOfDays,
    } = this.props;
    return (
      <Flex width={1} borderColor={colors.border} borderTop>
        <CalendarRowHeaders
          rows={rows}
          rowHeaderTemplate={rowHeaderTemplate}
          topLeftCellTemplate={topLeftCellTemplate}
        />

        <CalendarMainContent
          startDate={startDate}
          numberOfDays={numberOfDays}
          cellTemplate={cellTemplate}
          rows={rows}
          onCellClick={onCellClick}
          onDrop={onDrop}
        />
      </Flex>
    );
  }
}

export default Calendar;
