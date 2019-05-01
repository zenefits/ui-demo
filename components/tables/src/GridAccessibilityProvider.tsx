import React from 'react';
import _ from 'lodash';
// @ts-ignore
import tabbable from 'tabbable';

import { Box, BoxProps } from 'zbase';

// % operator handles negative weirdly in js
const mod = (x: number, y: number) => (x + y) % y;

export const KEY_CODES = {
  ENTER: 13,
  ESC: 27,
  SPACEBAR: 32,
  TAB: 9,
  LEFT_ARROW: 37,
  UP_ARROW: 38,
  RIGHT_ARROW: 39,
  DOWN_ARROW: 40,
};

export type CellType = 'read-only' | 'editable';

export type HeaderType = 'row' | 'column';

export type CellParams = {
  columnIndex: number;
  rowIndex: number;
  contentType: CellType;
  headerType?: HeaderType;
  headerDescribes?: number[];
  refPropName?: string;
  colSpan?: number;
  rowSpan?: number;
};

type GridParams = {
  refPropName?: string;
};

export type GridState = {
  activeRowIndex: number;
  activeColumnIndex: number;
  editingActiveCell: boolean;
  hasFocus: boolean;
  latestUpdateTriggerEl?: HTMLElement;
};

type _GridState = {
  // Used to remember what the active column/row was before spanned rows are columns are entered
  // Is not exposed to consumers to avoid confusion with activeRowIndex/activeColumnIndex
  keyboardRowIndex: number;
  keyboardColumnIndex: number;
} & GridState;

type GridProps = {
  numRows: number;
  numColumns: number;
  disableMouseInteraction?: boolean;
};

const focusFirstElement = (el: HTMLElement) => {
  const focusableEls = tabbable(el);
  if (focusableEls.length === 0) {
    console.warn("Can't find an element to focus");
  } else {
    focusableEls[0].focus();
  }
};

const ariaRolesForHeaderType = {
  row: 'rowheader',
  column: 'columnheader',
};

const getGridNumber = (() => {
  let tableId = 1;
  return () => {
    tableId += 1;
    return tableId;
  };
})();

export const AccessibleGridContext = React.createContext<
  {
    getGridProps?: (options: GridParams) => BoxProps;
    getCellProps?: (options: CellParams) => BoxProps;
  } & _GridState
>({} as any);

type CellSpan = {
  rowStarts: number;
  rowEnds: number;
  columnStarts: number;
  columnEnds: number;
};

export default class GridAccessibilityProvider extends React.Component<GridProps, _GridState> {
  globalGridNumber: number;
  gridRef: React.RefObject<any>;
  cellRefs: React.RefObject<any>[][];
  fullRowHeaderCells: {
    [row: number]: number;
  };
  spannedCells: {
    [key: string]: CellSpan;
  };
  fullColumnHeaderCells: {
    [column: number]: number;
  };
  partialRowHeaderCells: {
    [row: number]: { headerIndex: number; describedColumns: number[] }[];
  };
  partialColumnHeaderCells: {
    [column: number]: { headerIndex: number; describedRows: number[] }[];
  };
  cellTypes: {
    [key: string]: CellType;
  };
  focusLoopTabListeners: {
    [key: string]: EventListener;
  };

  constructor(props: GridProps) {
    super(props);
    this.state = {
      activeRowIndex: 0,
      keyboardRowIndex: 0,
      activeColumnIndex: 0,
      keyboardColumnIndex: 0,
      editingActiveCell: false,
      hasFocus: false,
    };
    this.globalGridNumber = getGridNumber();
    this.gridRef = React.createRef();
    this.fullRowHeaderCells = {};
    this.fullColumnHeaderCells = {};
    this.partialRowHeaderCells = {};
    this.partialColumnHeaderCells = {};
    this.cellTypes = {};
    this.focusLoopTabListeners = {};
    this.spannedCells = {};
    this.resetRefs();
  }

  getCellType = (row: number, column: number) => this.cellTypes[`${row}-${column}`];
  setCellType = (type: CellType, row: number, column: number) => {
    this.cellTypes[`${row}-${column}`] = type;
  };

  resetRefs = () => {
    this.cellRefs = [];
    _.range(this.props.numRows).forEach(() => {
      const rowRefs: React.RefObject<any>[] = [];
      _.range(this.props.numColumns).forEach(() => {
        rowRefs.push(React.createRef());
      });
      this.cellRefs.push(rowRefs);
    });
  };

  shift = (direction: 'column' | 'row', offset: number) => {
    const { keyboardRowIndex, keyboardColumnIndex } = this.state;
    this.gridRef.current.focus();

    let shiftedPosition = (direction === 'column' ? keyboardColumnIndex : keyboardRowIndex) + offset;

    const currentCellSpan = this.spannedCells[`${keyboardRowIndex}-${keyboardColumnIndex}`];

    if (currentCellSpan) {
      const starts = direction === 'column' ? currentCellSpan.columnStarts : currentCellSpan.rowStarts;
      const ends = direction === 'column' ? currentCellSpan.columnEnds : currentCellSpan.rowEnds;

      while (shiftedPosition >= starts && shiftedPosition <= ends) {
        shiftedPosition += offset;
      }
    }

    const nextCellSpan =
      direction === 'column'
        ? this.spannedCells[`${keyboardRowIndex}-${shiftedPosition}`]
        : this.spannedCells[`${shiftedPosition}-${keyboardColumnIndex}`];

    const nextKeyboardRow = direction === 'row' ? mod(shiftedPosition, this.props.numRows) : keyboardRowIndex;
    const nextKeyboardColumn =
      direction === 'column' ? mod(shiftedPosition, this.props.numColumns) : keyboardColumnIndex;
    const nextActiveRow = nextCellSpan ? nextCellSpan.rowStarts : nextKeyboardRow;
    const nextActiveColumn = nextCellSpan ? nextCellSpan.columnStarts : nextKeyboardColumn;

    this.cellRefs[nextActiveRow][nextActiveColumn].current.scrollIntoView();

    this.setState(state => ({
      keyboardRowIndex: nextKeyboardRow,
      keyboardColumnIndex: nextKeyboardColumn,
      activeRowIndex: nextActiveRow,
      activeColumnIndex: nextActiveColumn,
      latestUpdateTriggerEl: null,
    }));
  };

  shiftRow = (offset: number) => this.shift('row', offset);
  shiftColumn = (offset: number) => this.shift('column', offset);

  getGridId = () => `accessible-grid-${this.globalGridNumber}`;
  getRowId = (row: number) => `accessible-grid-${this.globalGridNumber}-row-${row}`;
  getCellId = (row: number, column: number) => `accessible-grid-${this.globalGridNumber}-cell-${row}-${column}`;

  getOwnedCellIdsForRow = (row: number) =>
    _.range(this.props.numColumns)
      .map(col => this.getCellId(row, col))
      .join(' ');

  getGridRowIds = () =>
    _.range(this.props.numRows)
      .map(row => this.getRowId(row))
      .join(' ');

  getHeaderIdsForCell = (row: number, column: number) => {
    const headers: string[] = [];
    if (this.fullRowHeaderCells[row]) {
      headers.push(this.getCellId(row, this.fullRowHeaderCells[row]));
    }
    if (this.fullColumnHeaderCells[column]) {
      headers.push(this.getCellId(this.fullColumnHeaderCells[column], column));
    }
    if (this.partialRowHeaderCells[row]) {
      this.partialRowHeaderCells[row]
        .filter(header => header.describedColumns.includes(column))
        .forEach(header => headers.push(this.getCellId(row, header.headerIndex)));
    }
    if (this.partialColumnHeaderCells[column]) {
      this.partialColumnHeaderCells[column]
        .filter(header => header.describedRows.includes(row))
        .forEach(header => headers.push(this.getCellId(header.headerIndex, column)));
    }
    return headers.join(' ');
  };

  getGridProps = (options: GridParams): BoxProps => {
    const refPropName = options.refPropName || 'ref';
    const { activeRowIndex, activeColumnIndex, hasFocus } = this.state;

    const gridElProps = {
      id: this.getGridId(),
      role: 'grid',
      [refPropName]: this.gridRef,
      tabIndex: 0,
      onFocus: () => {
        this.setState({
          hasFocus: true,
        });
      },
      onKeyDown: this.onGridKeyDown as any,
      'aria-owns': this.getGridRowIds(),
    };

    if (hasFocus) {
      gridElProps['aria-activedescendant'] = this.getCellId(activeRowIndex, activeColumnIndex);
    }

    return gridElProps;
  };

  getCellProps = (params: CellParams): BoxProps => {
    // NOTE: HEADERS MUST BE RENDERED BEFORE THE CELLS THEY DESCRIBE
    const { rowIndex, columnIndex, headerType, headerDescribes, contentType, rowSpan, colSpan } = params;
    const refPropName = params.refPropName || 'ref';

    const ariaRole = headerType ? ariaRolesForHeaderType[headerType] : 'gridcell';
    if (headerType === 'row') {
      if (headerDescribes) {
        this.partialRowHeaderCells[rowIndex].push({ headerIndex: columnIndex, describedColumns: headerDescribes });
      } else {
        this.fullRowHeaderCells[rowIndex] = columnIndex;
      }
    } else if (headerType === 'column') {
      if (headerDescribes) {
        this.partialColumnHeaderCells[columnIndex].push({ headerIndex: rowIndex, describedRows: headerDescribes });
      } else {
        this.fullColumnHeaderCells[columnIndex] = rowIndex;
      }
    }

    // Keep track of all the cell that are in spans and where they start and end
    if (rowSpan || colSpan) {
      const rowSpanEnd = rowSpan ? rowIndex + rowSpan - 1 : rowIndex;
      const colSpanEnd = colSpan ? columnIndex + colSpan - 1 : columnIndex;
      const span: CellSpan = {
        columnStarts: columnIndex,
        columnEnds: colSpanEnd,
        rowStarts: rowIndex,
        rowEnds: rowSpanEnd,
      };

      for (let x = rowIndex; x <= rowSpanEnd; x += 1) {
        for (let y = columnIndex; y <= colSpanEnd; y += 1) {
          this.spannedCells[`${x}-${y}`] = span;
        }
      }
    }

    this.setCellType(contentType, rowIndex, columnIndex);

    return {
      role: ariaRole,
      [refPropName]: this.cellRefs[rowIndex][columnIndex],
      id: this.getCellId(rowIndex, columnIndex),
      'aria-describedby': this.getHeaderIdsForCell(rowIndex, columnIndex),
      onMouseDown: (e: React.MouseEvent) => {
        if (this.props.disableMouseInteraction) {
          e.stopPropagation();
          e.preventDefault();
          return;
        }

        if (contentType !== 'read-only') {
          e.stopPropagation();
          e.preventDefault();
        }

        this.setState({
          hasFocus: true,
          activeColumnIndex: columnIndex,
          activeRowIndex: rowIndex,
          keyboardColumnIndex: columnIndex,
          keyboardRowIndex: rowIndex,
          editingActiveCell: contentType === 'editable',
          latestUpdateTriggerEl: e.target as any,
        });
      },
      onKeyDown: (e: React.KeyboardEvent) => {
        if (contentType === 'editable' && this.state.editingActiveCell) {
          const focusableEls = tabbable(this.cellRefs[rowIndex][columnIndex].current);
          if (e.keyCode === KEY_CODES.TAB) {
            e.preventDefault();
            const NO_FOCUSABLE_ELEMENTS_WARNING =
              'There is a focus loop in your dom tree, but none of the contained elements can receive focus';
            if (focusableEls.length === 0) {
              console.warn(NO_FOCUSABLE_ELEMENTS_WARNING);
            } else {
              const currentFocusIndex: number = Array.from(focusableEls).indexOf(document.activeElement as HTMLElement);
              const nextFocusIndex: number = (currentFocusIndex + (e.shiftKey ? -1 : 1)) % focusableEls.length;
              focusableEls[nextFocusIndex].focus();
            }
          }
        }
      },
    };
  };

  onGridKeyDown = (e: KeyboardEvent) => {
    const { activeRowIndex, activeColumnIndex, editingActiveCell } = this.state;
    if (!editingActiveCell) {
      switch (e.keyCode) {
        case KEY_CODES.LEFT_ARROW:
          this.shiftColumn(-1);
          break;
        case KEY_CODES.RIGHT_ARROW:
          this.shiftColumn(1);
          break;
        case KEY_CODES.UP_ARROW:
          this.shiftRow(-1);
          break;
        case KEY_CODES.DOWN_ARROW:
          this.shiftRow(1);
          break;
        case KEY_CODES.ENTER:
          if (this.getCellType(activeRowIndex, activeColumnIndex) === 'editable') {
            this.setState({
              editingActiveCell: true,
              latestUpdateTriggerEl: null,
            });
          }
          break;
        case KEY_CODES.TAB:
          e.preventDefault();
          this.findNextTabbableElement().focus();

          this.setState({
            hasFocus: false,
          });
      }
    } else if (e.keyCode === KEY_CODES.ESC) {
      this.setState({
        editingActiveCell: false,
      });

      this.gridRef.current.focus();
    }
  };

  findNextTabbableElement() {
    const tabbableGridElements = tabbable(this.gridRef.current);
    const allTabbableElements = tabbable(document.body);
    let nextTabbableIndex: number;

    if (tabbableGridElements.length > 0) {
      const lastTabbableGridElement = tabbableGridElements[tabbableGridElements.length - 1];
      nextTabbableIndex = allTabbableElements.indexOf(lastTabbableGridElement) + 1;
    } else {
      nextTabbableIndex = allTabbableElements.indexOf(this.gridRef.current) + 1;
    }

    return allTabbableElements[nextTabbableIndex < allTabbableElements.length ? nextTabbableIndex : 0];
  }

  shouldComponentUpdate(nextProps: GridProps) {
    if (this.props.numRows !== nextProps.numRows || this.props.numColumns !== nextProps.numColumns) {
      this.resetRefs();
    }

    return true;
  }

  handleClickAway = (e: MouseEvent) => {
    // Grid will have pseudo focus when one of it's child elements has true focus, so we can't rely on blur for this
    // functionality
    if (!this.gridRef.current.contains(e.target)) {
      this.setState({
        hasFocus: false,
        editingActiveCell: false,
      });
    }
  };

  // In the case where a cell was entered by clicking a focusable element within the cell, we don't want to take
  // focus away from that element.
  wasLatestUpdateTriggerFocusable = () => {
    const { activeRowIndex, activeColumnIndex, latestUpdateTriggerEl } = this.state;
    const allTabbableElementsInCell = tabbable(this.cellRefs[activeRowIndex][activeColumnIndex].current);
    return allTabbableElementsInCell.includes(latestUpdateTriggerEl);
  };

  focusActiveCell = () => {
    const { activeRowIndex, activeColumnIndex, editingActiveCell, latestUpdateTriggerEl } = this.state;
    const activeCellType = this.getCellType(activeRowIndex, activeColumnIndex);

    const shouldFocusChild = activeCellType === 'editable' && editingActiveCell;

    if (shouldFocusChild) {
      if (!this.wasLatestUpdateTriggerFocusable()) {
        focusFirstElement(this.cellRefs[activeRowIndex][activeColumnIndex].current);
      } else if (document.activeElement !== latestUpdateTriggerEl) {
        // Clicking an element that is focusable doesn't always focus it
        latestUpdateTriggerEl.focus();
      }
    }
  };

  componentDidMount() {
    document.body.addEventListener('click', this.handleClickAway);
  }

  componentWillUnmount() {
    document.body.removeEventListener('click', this.handleClickAway);
  }

  componentDidUpdate(prevProps: GridProps, prevState: _GridState) {
    const { activeRowIndex, activeColumnIndex, hasFocus, editingActiveCell } = this.state;
    if (
      hasFocus !== prevState.hasFocus ||
      activeRowIndex !== prevState.activeRowIndex ||
      activeColumnIndex !== prevState.activeColumnIndex ||
      editingActiveCell !== prevState.editingActiveCell
    ) {
      this.focusActiveCell();
    }
  }

  render() {
    const { children } = this.props;

    // Since header info is populated during render, the headers to be rendered first
    // TO-DO see if there is a way around this, maybe manually update dom with correct aria tags on update
    this.fullRowHeaderCells = {};
    this.fullColumnHeaderCells = {};
    this.partialRowHeaderCells = {};
    this.partialColumnHeaderCells = {};
    this.spannedCells = {};

    return (
      <AccessibleGridContext.Provider
        value={{
          getGridProps: this.getGridProps,
          getCellProps: this.getCellProps,
          ...this.state,
        }}
      >
        {children}

        {/* The aria spec requires cells to be owned by rows.  Requiring users to specify the elements with row accessibility
          markup as part of this API seems redundant because the row information is provided on each cell.  Instead we can create
          the necessary row mark-up automatically and be unopinionate about how API consumers visually lay out their cells  */}
        {_.range(this.props.numRows).map(row => (
          <Box key={row} id={this.getRowId(row)} role="row" aria-owns={this.getOwnedCellIdsForRow(row)} />
        ))}
      </AccessibleGridContext.Provider>
    );
  }
}
