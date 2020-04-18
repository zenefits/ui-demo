import React from 'react';

import { Flex } from 'zbase';
import { styled, ColorString } from 'z-frontend-theme';
import { DragAndDrop } from 'z-frontend-drag-and-drop';

import { CellPosition } from './interfaces';
import { colors, styles } from './constants';

interface CalendarRowProps<TCell, TRow> {
  row: TRow;

  /**
   * A render prop to render a cell
   */
  cellTemplate: (data: { cellData: TCell; rowData: TRow; cellPosition: CellPosition }) => React.ReactChild;

  bgColor: ColorString;

  onCellClick: (columnIndex: number) => any;

  /**
   * Number of columns to display
   */
  numberOfColumns: number;

  /**
   * Index of the row, not counting day header row, i.e. the first row with consumer content has index 0
   */
  rowIndex: number;
}

const CellContainer = styled(Flex)`
  min-height: ${styles.cellMinHeight};
  min-width: ${styles.cellMinWidth};
`;

/**
 * A component to render a row (excluding the row header) for Calendar component,
 */
class CalendarRow<TCell, TRow extends { columns: TCell[]; height?: string }> extends React.Component<
  CalendarRowProps<TCell, TRow>
> {
  render() {
    const { row, cellTemplate, bgColor, numberOfColumns, rowIndex } = this.props;

    const cellContainerStyle = row.height && { height: row.height };

    return (
      <Flex>
        {row.columns.map((cell, index) => {
          const cellPosition = { column: index, row: rowIndex };

          return (
            <DragAndDrop.Target key={JSON.stringify(cell)} data={cellPosition}>
              <CellContainer
                style={cellContainerStyle}
                bg={bgColor}
                w={1 / numberOfColumns}
                borderBottom
                borderRight
                borderColor={colors.border}
                onClick={() => this.props.onCellClick(index)}
              >
                {cell && cellTemplate({ cellPosition, cellData: cell, rowData: row })}
              </CellContainer>
            </DragAndDrop.Target>
          );
        })}
      </Flex>
    );
  }
}

export default CalendarRow;
