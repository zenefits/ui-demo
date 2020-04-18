import React from 'react';
import ReactDOM from 'react-dom';
import { compact, isEqual, range } from 'lodash';

import { SelectionContext } from 'z-frontend-data-manager';

import { Cell, CommonCellProps, DEFAULT_CELL_WIDTH } from './DataTableCell';
import Column, { getColumnKey } from './DataTableColumn';
import { compareGridStates, GridHelpers, GridState } from './GridAccessibilityProvider';
import { TableLayout } from './DataTable';

export type HoverProps = {
  onMouseOverRow: (rowIndex: number) => void;
  onMouseLeaveRow: (rowIndex: number) => void;
  hoveredRow: number;
  lastHoveredRow: number;
};
export type RowSpan = {
  index: number;
  key: string;
  spans: {
    [spanStartIndex: number]: {
      spanLength: number;
    };
  };

  // Used when iterating through rows to find span boundaries
  lastStart: number;
  lastKeyValue: any;
};

export type SpanStartsByRow = {
  columnsWithSpans: {
    [columnIndex: string]: boolean;
  };
  spanStarts: {
    [columnIndex: string]: {
      spanLength: number;
    };
  };
};

type HoverManagerProps = {
  gridState: GridState;
  children: (props: HoverProps) => React.ReactNode;
};

type HoverManagerState = {
  hoveredRow: number;
  lastGridState: GridState;
  lastHoveredRow: number;
};

export class RowHoverManager extends React.Component<HoverManagerProps, HoverManagerState> {
  constructor(props: HoverManagerProps) {
    super(props);
    this.state = {
      hoveredRow: -1,
      lastHoveredRow: -1,
      lastGridState: props.gridState,
    };
  }

  static getDerivedStateFromProps(props: HoverManagerProps, state: HoverManagerState) {
    const activeCellChanged =
      state.lastGridState.activeRowIndex !== props.gridState.activeRowIndex ||
      state.lastGridState.activeColumnIndex !== props.gridState.activeColumnIndex;
    const activeCellChangedByKeyBoardEvent = !props.gridState.latestUpdateTriggerEl;
    const { lastKeyDownIsTab } = props.gridState;

    // When last key down is tab, we don't reset hoveredRow to -1. This is to avoid an input such as TimeInput being
    // unmounted before its state is updated, which leads to the problem that tab autocomplete doesn't work.
    // When active cell changed by other keyboard events, such as arrow keys, we reset hoveredRow to -1 so that only one
    // cell, instead of one row, will have the gray background visual effect.
    if (activeCellChanged && activeCellChangedByKeyBoardEvent && !lastKeyDownIsTab) {
      return {
        lastGridState: props.gridState,
        hoveredRow: -1,
      };
    } else {
      return {
        lastGridState: props.gridState,
      };
    }
  }

  onMouseOverRow = (rowIndex: number) => {
    this.setState(state => ({
      hoveredRow: rowIndex,
      lastHoveredRow: state.hoveredRow,
    }));
  };

  onMouseLeaveRow = (rowIndex: number) => {
    this.setState(state => ({
      hoveredRow: null,
      lastHoveredRow: state.hoveredRow,
    }));
  };

  render() {
    return this.props.children({
      onMouseOverRow: this.onMouseOverRow,
      onMouseLeaveRow: this.onMouseLeaveRow,
      hoveredRow: this.state.hoveredRow,
      lastHoveredRow: this.state.lastHoveredRow,
    });
  }
}

function isRowSelected<RowObject>(row: RowObject, selectionContext: SelectionContext<RowObject>) {
  return Boolean(selectionContext && row && selectionContext.selections.has(row[selectionContext.selectionKey]));
}

// Exported for testing
export function gainedOrLostSpanHover<RowObject>(props: RowProps<RowObject>) {
  const hoveredRowChanged = props.hoverProps.hoveredRow !== props.hoverProps.lastHoveredRow;
  const rowHasOrHadHover = Object.values(props.rowSpanStartsForRow.spanStarts).some(spansForRow => {
    return range(props.rowIndex, props.rowIndex + spansForRow.spanLength).some(rowIndex => {
      return props.hoverProps.hoveredRow === rowIndex || props.hoverProps.lastHoveredRow === rowIndex;
    });
  });
  return hoveredRowChanged && rowHasOrHadHover;
}

export const getFixedTableRowId = (gridId: string, rowIndex: number) => `${gridId}-fixed-table-row-${rowIndex}`;

export type RowProps<RowObject> = {
  rowIndex: number;
  rowKey?: string | number;
  rowObject?: RowObject;
  gridState: GridState;
  gridId: string;
  fixedColumns?: Column<RowObject>[];
  fluidColumns: Column<RowObject>[];
  selectionContext: SelectionContext<RowObject>;
  accessibilityHelpers: GridHelpers;
  columnIndexOffset: number;
  cellHeight: number;
  hoverProps: HoverProps;
  isHovered: boolean;
  rowSpanStartsForRow?: SpanStartsByRow;
  tableLayout: TableLayout;
} & React.HTMLAttributes<HTMLTableRowElement>;

export default class Row<RowObject> extends React.Component<RowProps<RowObject>> {
  static areColumnsChanged<RowObject>(columnList1: Column<RowObject>[], columnList2: Column<RowObject>[]) {
    return (
      columnList1.length !== columnList2.length ||
      columnList1.some((nextColumn, i) => nextColumn.props.fieldKey !== columnList2[i].props.fieldKey)
    );
  }

  shouldComponentUpdate(nextProps: RowProps<RowObject>) {
    const rowObjectChanged = nextProps.rowObject !== this.props.rowObject;
    const rowIndexChanged = nextProps.rowIndex !== this.props.rowIndex;
    const hasOrLostHover = nextProps.isHovered !== this.props.isHovered;
    const hasOrLostSpanHover = gainedOrLostSpanHover(nextProps);

    // Rerender if the grid state has changed AND the change affects the current row
    const hasGridStateChanged = compareGridStates(this.props.gridState, nextProps.gridState);
    const hasOrLostKeyboardFocus =
      this.props.gridState.activeRowIndex === this.props.rowIndex ||
      nextProps.gridState.activeRowIndex === nextProps.rowIndex;
    const hasRelevantGridStateChange = hasGridStateChanged && hasOrLostKeyboardFocus;

    const hasOrLostSelection =
      isRowSelected(nextProps.rowObject, nextProps.selectionContext) !==
      isRowSelected(this.props.rowObject, this.props.selectionContext);

    const spansChanged = !isEqual(nextProps.rowSpanStartsForRow, this.props.rowSpanStartsForRow);
    const areFixedColumnsChanged = Row.areColumnsChanged<RowObject>(nextProps.fixedColumns, this.props.fixedColumns);
    const areFluidColumnsChanged = Row.areColumnsChanged<RowObject>(nextProps.fluidColumns, this.props.fluidColumns);

    if (
      rowObjectChanged ||
      rowIndexChanged ||
      hasOrLostHover ||
      hasRelevantGridStateChange ||
      hasOrLostSelection ||
      hasOrLostSpanHover ||
      spansChanged ||
      areFixedColumnsChanged ||
      areFluidColumnsChanged
    ) {
      return true;
    } else {
      return false;
    }
  }

  onSelectRow = () => {
    this.props.selectionContext.onSelect([this.props.rowObject]);
  };

  onDeselectRow = () => {
    this.props.selectionContext.onDeselect([this.props.rowObject]);
  };

  fillDefaultBaseCellStyles(column: Column<RowObject>, tableLayout: TableLayout) {
    const { cellStyles } = column.props;

    if (tableLayout === 'auto') {
      cellStyles.minWidth = cellStyles.minWidth || DEFAULT_CELL_WIDTH;
    }

    return cellStyles;
  }

  render() {
    const {
      fixedColumns,
      fluidColumns,
      cellHeight,
      rowObject,
      rowIndex,
      rowKey,
      selectionContext,
      accessibilityHelpers,
      hoverProps,
      isHovered,
      rowSpanStartsForRow,
      tableLayout,
      gridId,
    } = this.props;
    const isSelected = isRowSelected(rowObject, selectionContext);

    /**
     * @param addMouseEventListeners - Whether to add mouseenter or mouseleave event listeners to cells. These event
     * listeners are used to set which row is being hovered. Ideally they should be put on the row level (<tr>), which
     * is what we did for fluid columns on the right. However, for fixed columns, <tr> is a React portal where row body
     * is put into, so adding event listeners on the <tr> doesn't work. Therefore we have to put them on cells.
     */
    const getRowBody = (columns: Column<RowObject>[], columnIndexOffset = 0, addMouseEventListeners: boolean = false) =>
      compact(
        columns.map((column, i) => {
          const columnIndex = i + columnIndexOffset;
          const commonCellProps: CommonCellProps<RowObject> = {
            accessibilityHelpers,
            rowIndex,
            columnIndex,
            rowKey,
            row: rowObject,
            children: column.props.children || rowObject[column.props.fieldKey],
            contentType: column.props.contentType,
          };
          if (addMouseEventListeners) {
            commonCellProps.eventListeners = {
              onMouseOver: () => hoverProps.onMouseOverRow(rowIndex),
              onMouseLeave: () => hoverProps.onMouseLeaveRow(rowIndex),
            };
          }

          const columnHasSpan = rowSpanStartsForRow.columnsWithSpans[columnIndex];
          if (columnHasSpan) {
            if (columns.length === 1) {
              throw new Error('A spanned column may not be the only column or the only fixed column in a table');
            }

            const spanForCell = rowSpanStartsForRow.spanStarts[columnIndex];
            if (spanForCell) {
              const isSpanHovered = range(rowIndex, rowIndex + spanForCell.spanLength).some(
                rowIndex => hoverProps.hoveredRow === rowIndex,
              );

              return (
                <Cell<RowObject>
                  {...commonCellProps}
                  key={column.props.fieldKey as string}
                  rowSpan={spanForCell.spanLength}
                  isRowHovered={isSpanHovered}
                  styles={{
                    ...this.fillDefaultBaseCellStyles(column, tableLayout),
                    maxHeight: cellHeight * spanForCell.spanLength,
                    textAlign: column.props.textAlign,
                  }}
                />
              );
            } else {
              return null;
            }
          } else {
            return (
              <Cell<RowObject>
                {...commonCellProps}
                key={getColumnKey<RowObject>(column, columnIndex)}
                isSelected={isSelected}
                isRowHovered={isHovered}
                onSelectRow={this.onSelectRow}
                onDeselectRow={this.onDeselectRow}
                styles={{
                  ...this.fillDefaultBaseCellStyles(column, tableLayout),
                  height: cellHeight,
                  textAlign: column.props.textAlign,
                }}
              />
            );
          }
        }),
      );

    const fixedRowBody = getRowBody(fixedColumns, 0, true);
    const fluidRowBody = getRowBody(fluidColumns, fixedColumns.length);

    const rowClasses = [];
    if (isHovered) {
      rowClasses.push('hovered');
    }
    if (isSelected) {
      rowClasses.push('selected');
    }

    return (
      <>
        {fixedColumns.length > 0 && (
          <FixedTableRowPortal gridId={gridId} rowIndex={rowIndex}>
            {fixedRowBody}
          </FixedTableRowPortal>
        )}
        <tr
          role="none"
          className={rowClasses.join(' ')}
          // Using onMouseOver instead of onMouseEnter because with onMouseEnter spanned cells' background color
          // doesn't update correctly
          onMouseOver={() => hoverProps.onMouseOverRow(rowIndex)}
          onMouseLeave={() => hoverProps.onMouseLeaveRow(rowIndex)}
          // onmouseover must be accompanied by onfocus for accessibility.
          // https://achecker.ca/checker/suggestion.php?id=107
          onFocus={() => hoverProps.onMouseOverRow(rowIndex)}
        >
          {fluidRowBody}
        </tr>
      </>
    );
  }
}

class FixedTableRowPortal extends React.Component<{ gridId: string; rowIndex: number }> {
  render() {
    return ReactDOM.createPortal(
      this.props.children,
      document.getElementById(getFixedTableRowId(this.props.gridId, this.props.rowIndex)),
    );
  }
}
