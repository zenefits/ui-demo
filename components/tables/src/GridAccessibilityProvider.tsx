import React from 'react';
import { isEqual, range } from 'lodash';
// @ts-ignore
import tabbable from 'tabbable';

import { BoxProps } from 'zbase';

// % operator handles negative weirdly in js
const mod = (x: number, y: number) => (x + y) % y;

export const KEY_CODES = {
  ENTER: 13,
  SHIFT: 16,
  ESC: 27,
  SPACEBAR: 32,
  TAB: 9,
  LEFT_ARROW: 37,
  UP_ARROW: 38,
  RIGHT_ARROW: 39,
  DOWN_ARROW: 40,
};

export type CellType = 'read-only' | 'single-input' | 'single-checkbox' | 'action';
const actionableCellTypes: CellType[] = ['single-input', 'single-checkbox', 'action'];
const immediatelyFocusedCellTypes: CellType[] = ['single-input', 'single-checkbox'];
const cellTypesWithEditMode: CellType[] = ['single-input', 'action'];

export type HeaderType = 'row' | 'column';

export type CellParams = {
  columnIndex: number;
  rowIndex: number;
  contentType: CellType;
  headerType?: HeaderType;
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
  // Whether the focus is inside grid
  hasFocus: boolean;
  latestUpdateTriggerEl?: HTMLElement;
  primedForSkip: boolean;
  // Whether the last key down is Tab key
  lastKeyDownIsTab: boolean;
};

// Used externally to determine if rerenders should be blocked
export const compareGridStates = (grid1: GridState, grid2: GridState) => {
  const gridStateKeys: (keyof GridState)[] = ['activeRowIndex', 'activeColumnIndex', 'editingActiveCell', 'hasFocus'];
  return gridStateKeys.some(property => grid1[property] !== grid2[property]);
};

type _GridState = {
  // Used to remember what the active column/row was before spanned rows are columns are entered
  // Is not exposed to consumers to avoid confusion with activeRowIndex/activeColumnIndex
  keyboardRowIndex: number;
  keyboardColumnIndex: number;
  /**
   * Used in cell onBlur handler to decide whether it's changing focus to another row.
   * @initial null
   * It's set right before manually triggering .blur() when tabbing.
   * It's reset to null after blur event.
   *  */
  nextActiveRowIndex?: number;
} & GridState;

export type OnLeaveRowEdit = (rowIndex: number) => void;

type GridProps = {
  numRows: number;
  numColumns: number;
  disableMouseInteraction?: boolean;
  onLeaveRowEdit?: OnLeaveRowEdit;
  gridId?: string;
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

export type GetGridAccessibilityHtmlProps = (options: GridParams) => BoxProps;
export type GetCellAccessibilityHtmlProps = (options: CellParams) => BoxProps;
export type GetCellState = (
  cell: CellPosition,
) => {
  isActive: boolean;
  isEditing: boolean;
};
type GetRowState = (rowIndex: number) => { hasFocus: boolean };

export type GridHelpers = {
  getGridHtmlProps: GetGridAccessibilityHtmlProps;
  getCellHtmlProps: GetCellAccessibilityHtmlProps;
  getCellState: GetCellState;
  getRowState: GetRowState;
};

type GridContext = GridState & {
  helpers: GridHelpers;
};

export const AccessibleGridHelpersContext = React.createContext<GridHelpers>({} as any);
export const AccessibleGridStateContext = React.createContext<GridContext>({} as any);

type CellSpan = {
  rowStarts: number;
  rowEnds: number;
  columnStarts: number;
  columnEnds: number;
};

type CellPosition = {
  rowIndex: number;
  columnIndex: number;
};

const getBoundedNumber = (n: number, lowerBound: number, upperBound: number) =>
  Math.max(lowerBound, Math.min(n, upperBound));

export default class GridAccessibilityProvider extends React.Component<GridProps, _GridState> {
  globalGridNumber: number;

  gridRef: React.RefObject<any>;

  rowHeaderCells: Set<string>[];

  columnHeaderCells: Set<string>[];

  // Used to track which cell indexes are the start of spans
  spannedCells: {
    [key: string]: CellSpan;
  };

  // Uses to point cells included in spans to their object in spannedCells
  // type: {
  //   serialized cell position: serialized span start cell position
  // }
  spanReferences: {
    [key: string]: string;
  };

  cellTypes: {
    [key: string]: CellType;
  };

  focusLoopTabListeners: {
    [key: string]: EventListener;
  };

  static getDerivedStateFromProps(props: GridProps, state: _GridState) {
    return {
      activeRowIndex: getBoundedNumber(state.activeRowIndex, 0, props.numRows - 1),
      keyboardRowIndex: getBoundedNumber(state.keyboardRowIndex, 0, props.numRows - 1),
      activeColumnIndex: getBoundedNumber(state.activeColumnIndex, 0, props.numColumns - 1),
      keyboardColumnIndex: getBoundedNumber(state.keyboardColumnIndex, 0, props.numColumns - 1),
    };
  }

  constructor(props: GridProps) {
    super(props);
    this.state = {
      activeRowIndex: 0,
      keyboardRowIndex: 0,
      activeColumnIndex: 0,
      keyboardColumnIndex: 0,
      editingActiveCell: false,
      hasFocus: false,
      primedForSkip: false,
      lastKeyDownIsTab: false,
      nextActiveRowIndex: null,
    };
    this.globalGridNumber = getGridNumber();
    this.gridRef = React.createRef();
    this.rowHeaderCells = range(props.numRows).map(i => new Set());
    this.columnHeaderCells = range(props.numColumns).map(i => new Set());
    this.cellTypes = {};
    this.focusLoopTabListeners = {};
    this.spannedCells = {};
    this.spanReferences = {};
  }

  getCellType = (cell: CellPosition) => this.cellTypes[`${cell.rowIndex}-${cell.columnIndex}`];

  getActiveCellType = () =>
    this.getCellType({ rowIndex: this.state.activeRowIndex, columnIndex: this.state.activeColumnIndex });

  setCellType = (cell: CellPosition, type: CellType) => {
    this.cellTypes[`${cell.rowIndex}-${cell.columnIndex}`] = type;
  };

  static focusFirstMaxRetries = 20;

  focusFirstRetries = 0;

  focusFirstTimeout: number;

  focusFirstElement = (el: HTMLElement) => {
    clearTimeout(this.focusFirstTimeout);

    if (!el) {
      return;
    }

    const focusableEls = tabbable(el);

    // If the element isn't on the dom yet, poll until the element is there (or until we hit max retries)
    if (focusableEls.length === 0) {
      this.focusFirstRetries += 1;
      if (this.focusFirstRetries < GridAccessibilityProvider.focusFirstMaxRetries) {
        this.focusFirstTimeout = setTimeout(() => {
          this.focusFirstElement(el);
        }, 100);
      }
    } else {
      this.focusFirstRetries = 0;
      focusableEls[0].focus();
    }
  };

  shift = (direction: 'column' | 'row', offset: number) => {
    clearTimeout(this.focusFirstTimeout);

    const { keyboardRowIndex, keyboardColumnIndex } = this.state;

    this.gridRef.current.focus();

    let shiftedPosition = (direction === 'column' ? keyboardColumnIndex : keyboardRowIndex) + offset;

    const currentCellSpan = this.getCellSpan({ rowIndex: keyboardRowIndex, columnIndex: keyboardColumnIndex });

    if (currentCellSpan) {
      const starts = direction === 'column' ? currentCellSpan.columnStarts : currentCellSpan.rowStarts;
      const ends = direction === 'column' ? currentCellSpan.columnEnds : currentCellSpan.rowEnds;

      while (shiftedPosition >= starts && shiftedPosition <= ends) {
        shiftedPosition += offset;
      }
    }

    const nextCellSpan =
      direction === 'column'
        ? this.getCellSpan({ rowIndex: keyboardRowIndex, columnIndex: shiftedPosition })
        : this.getCellSpan({ rowIndex: shiftedPosition, columnIndex: keyboardColumnIndex });

    const nextKeyboardRow = direction === 'row' ? mod(shiftedPosition, this.props.numRows) : keyboardRowIndex;
    const nextKeyboardColumn =
      direction === 'column' ? mod(shiftedPosition, this.props.numColumns) : keyboardColumnIndex;
    const nextActiveRow = nextCellSpan ? nextCellSpan.rowStarts : nextKeyboardRow;
    const nextActiveColumn = nextCellSpan ? nextCellSpan.columnStarts : nextKeyboardColumn;

    // getActiveCelEl does not currently work in cypress
    this.getActiveCellEl() && this.getActiveCellEl().scrollIntoView({ behavior: 'smooth' });

    const cellType = this.getCellType({ rowIndex: nextActiveRow, columnIndex: nextActiveColumn });
    if (immediatelyFocusedCellTypes.includes(cellType)) {
      this.focusActiveCell();
    }

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

  getGridId = () => this.props.gridId || `accessible-grid-${this.globalGridNumber}`;

  getRowId = (row: number) => `${this.getGridId()}-row-${row}`;

  getCellId = (cell: CellPosition) => `${this.getGridId()}-cell-${cell.rowIndex}-${cell.columnIndex}`;

  getOwnedCellIdsForRow = (rowIndex: number) =>
    range(this.props.numColumns)
      .map(columnIndex => this.getCellId({ rowIndex, columnIndex }))
      .join(' ');

  getGridRowIds = () =>
    range(this.props.numRows)
      .map(row => this.getRowId(row))
      .join(' ');

  serializeCell = (cell: CellPosition) => `${cell.rowIndex}-${cell.columnIndex}`;

  deserializeCell = (serializedCell: string) => {
    return {
      rowIndex: parseInt(serializedCell.split('-')[0], 10),
      columnIndex: parseInt(serializedCell.split('-')[1], 10),
    };
  };

  getHeaderIdsForCell = (row: number, column: number) => {
    const headers: string[] = [];
    if (this.rowHeaderCells[row].size) {
      this.rowHeaderCells[row].forEach(serializedCell => {
        headers.push(this.getCellId(this.deserializeCell(serializedCell)));
      });
    }
    if (this.columnHeaderCells[column].size) {
      this.rowHeaderCells[row].forEach(serializedCell => {
        headers.push(this.getCellId(this.deserializeCell(serializedCell)));
      });
    }
    return headers.join(' ');
  };

  getCellSpan = (cell: CellPosition) => {
    const spanPosition = this.spanReferences[this.serializeCell(cell)];
    return spanPosition && this.spannedCells[spanPosition];
  };

  getGridHtmlProps = (options: GridParams): BoxProps => {
    const refPropName = options.refPropName || 'ref';
    const { activeRowIndex, activeColumnIndex, hasFocus } = this.state;

    const gridElProps = {
      id: this.getGridId(),
      role: 'grid',
      [refPropName]: this.gridRef,
      tabIndex: 0,
      onMouseDown: (e: React.MouseEvent) => {
        if (this.props.disableMouseInteraction) {
          // Avoid triggering the focus event
          e.preventDefault();
        }
      },
      onFocus: (e: React.FocusEvent) => {
        if (e.target === this.gridRef.current) {
          this.setState({
            hasFocus: true,
          });
        }
      },
      onKeyDown: this.onGridKeyDown as any,
      'aria-owns': this.getGridRowIds(),
    };

    if (hasFocus) {
      gridElProps['aria-activedescendant'] = this.getCellId({
        rowIndex: activeRowIndex,
        columnIndex: activeColumnIndex,
      });
    }

    return gridElProps;
  };

  getCellHtmlProps = (
    params: CellParams,
  ): BoxProps & {
    rowSpan?: number;
    colSpan?: number;
    'data-is-cell': true;
    'data-cell-content-type': CellType;
    'data-cell-row-index': number;
    'data-cell-column-index': number;
  } => {
    // NOTE: HEADERS MUST BE RENDERED BEFORE THE CELLS THEY DESCRIBE
    const { rowIndex, columnIndex, headerType, contentType, rowSpan, colSpan } = params;

    const serializedCell = this.serializeCell({ rowIndex, columnIndex });

    const ariaRole = headerType ? ariaRolesForHeaderType[headerType] : 'gridcell';
    if (headerType === 'row') {
      this.rowHeaderCells[rowIndex].add(this.serializeCell({ rowIndex, columnIndex }));
    } else {
      this.columnHeaderCells[columnIndex].add(this.serializeCell({ rowIndex, columnIndex }));
    }

    const existingSpan = this.spannedCells[serializedCell];
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

      if (!isEqual(span, existingSpan)) {
        this.spannedCells[serializedCell] = span;

        for (let x = rowIndex; x <= rowSpanEnd; x += 1) {
          for (let y = columnIndex; y <= colSpanEnd; y += 1) {
            this.spanReferences[this.serializeCell({ rowIndex: x, columnIndex: y })] = serializedCell;
          }
        }
      }
    } else {
      if (existingSpan) {
        // This cell no longer has a span, so remove it from our object
        this.spannedCells[serializedCell] = null;
      }

      const spanForCell = this.getCellSpan({ rowIndex, columnIndex });
      if (spanForCell) {
        // Check to make sure cell is still in the right span
        if (
          spanForCell.rowStarts < rowIndex ||
          spanForCell.rowEnds > rowIndex ||
          spanForCell.columnStarts < columnIndex ||
          spanForCell.columnEnds > columnIndex
        ) {
          this.spanReferences[serializedCell] = null;
        }
      }
    }

    this.setCellType({ rowIndex, columnIndex }, contentType);

    return {
      rowSpan,
      colSpan,
      role: ariaRole,
      id: this.getCellId({ rowIndex, columnIndex }),
      'aria-describedby': this.getHeaderIdsForCell(rowIndex, columnIndex),
      'data-cell-content-type': contentType,
      'data-is-cell': true,
      'data-cell-row-index': rowIndex,
      'data-cell-column-index': columnIndex,
      onClick: (e: React.MouseEvent) => {
        if (this.props.disableMouseInteraction) {
          return;
        }

        this.setState({
          hasFocus: true,
          activeColumnIndex: columnIndex,
          activeRowIndex: rowIndex,
          keyboardColumnIndex: columnIndex,
          keyboardRowIndex: rowIndex,
          editingActiveCell: actionableCellTypes.includes(contentType),
          latestUpdateTriggerEl: e.target as any,
        });
      },
      onBlur: (e: React.FocusEvent) => {
        const { nextActiveRowIndex, activeRowIndex } = this.state;

        let shouldCallLeaveRowEdit = false;
        // relatedTarget is the target receiving focus.
        if (e.relatedTarget) {
          const cellPosition = this.findCellPositionForElement(e.relatedTarget as HTMLElement);
          if (cellPosition) {
            shouldCallLeaveRowEdit = cellPosition.rowIndex !== activeRowIndex;
          } else {
            shouldCallLeaveRowEdit = true;
          }
        } else if (!nextActiveRowIndex || (nextActiveRowIndex && nextActiveRowIndex !== activeRowIndex)) {
          // Existing nextActiveRowIndex means the blur is manually triggered by calling .blur() after Tab key pressed.
          // Therefore there is no relatedTarget to the event.
          shouldCallLeaveRowEdit = true;
        }

        shouldCallLeaveRowEdit && this.props.onLeaveRowEdit && this.props.onLeaveRowEdit(this.state.activeRowIndex);
      },
    };
  };

  getCellState = (cell: CellPosition) => {
    const isActive =
      this.state.hasFocus &&
      this.state.activeRowIndex === cell.rowIndex &&
      this.state.activeColumnIndex === cell.columnIndex;
    return {
      isActive,
      isEditing: isActive && this.state.editingActiveCell,
    };
  };

  getRowState = (rowIndex: number) => {
    return {
      hasFocus: this.state.activeRowIndex === rowIndex,
    };
  };

  onGridKeyDown = (e: KeyboardEvent) => {
    const { editingActiveCell, primedForSkip } = this.state;
    const cellType = this.getActiveCellType();

    if (this.props.numRows === 0 || this.props.numColumns === 0) {
      return;
    }

    if (e.keyCode === KEY_CODES.ESC) {
      this.setState({
        primedForSkip: true,
      });
    } else if (e.keyCode !== KEY_CODES.SHIFT) {
      this.setState({
        primedForSkip: false,
      });
    }

    if (e.keyCode === KEY_CODES.TAB) {
      this.setState({ lastKeyDownIsTab: true });
    } else {
      this.setState({ lastKeyDownIsTab: false });
    }

    if (e.keyCode === KEY_CODES.TAB) {
      e.preventDefault();

      if (primedForSkip) {
        if (e.getModifierState('Shift')) {
          this.focusPreviousTabbableElementOutsideTable();
        } else {
          this.focusNextTabbableElementOutsideTable();
        }

        this.setState({
          hasFocus: false,
        });
      } else {
        this.focusNextTabbableElementInTable(e.getModifierState('Shift'));
      }
    } else if (!editingActiveCell) {
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
          if (cellTypesWithEditMode.includes(cellType)) {
            this.setState({
              editingActiveCell: true,
              latestUpdateTriggerEl: null,
            });
          }
          break;
        default:
          if (cellType === 'single-input' && e.keyCode !== KEY_CODES.ESC) {
            // After doing a keystroke, arrow keys won't work as normal
            this.setState({ editingActiveCell: true });
          }
      }
    } else if (e.keyCode === KEY_CODES.ESC) {
      this.setState({
        editingActiveCell: false,
      });

      this.gridRef.current.focus();
    }
  };

  getPreviousCell(cell: CellPosition) {
    const { numColumns } = this.props;
    const atFirstRow = cell.rowIndex === 0;
    const atFirstColumn = cell.columnIndex === 0;

    if (atFirstRow && atFirstColumn) {
      return { rowIndex: -1, columnIndex: -1 };
    } else if (atFirstColumn) {
      return { rowIndex: cell.rowIndex - 1, columnIndex: numColumns - 1 };
    } else {
      return { rowIndex: cell.rowIndex, columnIndex: cell.columnIndex - 1 };
    }
  }

  findCellPositionForElement = (el: HTMLElement) => {
    let { parentElement } = el;
    while (parentElement && !parentElement.matches('[data-is-cell]')) {
      // eslint-disable-next-line prefer-destructuring
      parentElement = parentElement.parentElement;
    }

    if (parentElement) {
      return {
        rowIndex: parseInt(parentElement.dataset.cellRowIndex, 10),
        columnIndex: parseInt(parentElement.dataset.cellColumnIndex, 10),
      };
    } else {
      return null;
    }
  };

  getNextCell(cell: CellPosition) {
    const { numRows, numColumns } = this.props;
    const atLastRow = cell.rowIndex === numRows - 1;
    const atLastColumn = cell.columnIndex === numColumns - 1;

    if (atLastRow && atLastColumn) {
      return { rowIndex: -1, columnIndex: -1 };
    } else if (atLastColumn) {
      return { rowIndex: cell.rowIndex + 1, columnIndex: 0 };
    } else {
      return { rowIndex: cell.rowIndex, columnIndex: cell.columnIndex + 1 };
    }
  }

  getPreviousActionableCell(): CellPosition {
    let previousPosition = this.getPreviousCell({
      rowIndex: this.state.activeRowIndex,
      columnIndex: this.state.activeColumnIndex,
    });

    while (previousPosition.rowIndex !== -1 && !actionableCellTypes.includes(this.getCellType(previousPosition))) {
      previousPosition = this.getPreviousCell(previousPosition);
    }

    return previousPosition;
  }

  getNextActionableCell(): CellPosition {
    let nextPosition = this.getNextCell({
      rowIndex: this.state.activeRowIndex,
      columnIndex: this.state.activeColumnIndex,
    });

    while (nextPosition.rowIndex !== -1 && !actionableCellTypes.includes(this.getCellType(nextPosition))) {
      nextPosition = this.getNextCell(nextPosition);
    }

    return nextPosition;
  }

  focusPreviousTabbableElementOutsideTable() {
    const tabbableGridElements = tabbable(this.gridRef.current);
    const allTabbableElements = tabbable(document.body);
    let previousTabbableIndex: number;

    if (tabbableGridElements.length > 0) {
      const firstTabbableGridElement = tabbableGridElements[0];
      // Have to subtract 2 because grid isn't included in tabbableGridElements
      previousTabbableIndex = allTabbableElements.indexOf(firstTabbableGridElement) - 2;
    } else {
      previousTabbableIndex = allTabbableElements.indexOf(this.gridRef.current) - 1;
    }

    const previousElementOutsideTable =
      allTabbableElements[previousTabbableIndex < allTabbableElements.length ? previousTabbableIndex : 0];
    if (previousElementOutsideTable) {
      previousElementOutsideTable.focus();
    }
  }

  /**
   * isPrevious: When true, focus the previous tabbable element in table instead of the next.
   */
  focusNextTabbableElementInTable(isPrevious?: boolean) {
    // When focus is in an editable cell with one or more tabbable element, and we aren't currently focusing the last (first if
    // isPrevious is true) one, then focus the next (previous if isPrevious is true) element in the cell
    const allTabbableElementsInCell = tabbable(this.getActiveCellEl());
    const indexDelta = isPrevious ? -1 : 1;
    const nextTabbableElementInCell =
      allTabbableElementsInCell[allTabbableElementsInCell.indexOf(document.activeElement) + indexDelta];
    if (window.document.activeElement === nextTabbableElementInCell) {
      nextTabbableElementInCell.focus();
    }

    // Otherwise, find the next actionable cell and focus it
    const { rowIndex: nextRowIndex, columnIndex: nextColumnIndex } = isPrevious
      ? this.getPreviousActionableCell()
      : this.getNextActionableCell();
    if (nextRowIndex === -1) {
      // TODO: focusPreviousTabbableElementOutsideTable and focusNextTabbableElementOutsideTable are similar. Consider
      // abstract them to one function, similar to isPrevious in focusNextTabbableElementInTable.
      isPrevious ? this.focusPreviousTabbableElementOutsideTable() : this.focusNextTabbableElementOutsideTable();
    } else {
      const nextState: Partial<_GridState> = {
        activeRowIndex: nextRowIndex,
        activeColumnIndex: nextColumnIndex,
        keyboardRowIndex: nextRowIndex,
        keyboardColumnIndex: nextColumnIndex,
        latestUpdateTriggerEl: null,
        nextActiveRowIndex: null,
      };

      if (nextRowIndex !== this.state.activeRowIndex) {
        // Moving focus to a different row. Need to call .blur explicitly before setting the new focus.
        // Otherwise TimeInput will not get onBlur event before unmounting when hovering is on another row.
        this.setState({ nextActiveRowIndex: nextRowIndex }, () => {
          blurActiveElement();
          this.setState(nextState as _GridState);
        });
      } else {
        // Moving focus in the same row. Not necessary to manually call .blur. Inputs will not be unmounted.
        this.setState(nextState as _GridState);
      }
    }
  }

  focusNextTabbableElementOutsideTable() {
    const tabbableGridElements = tabbable(this.gridRef.current);
    const allTabbableElements = tabbable(document.body);
    let nextTabbableIndex: number;

    if (tabbableGridElements.length > 0) {
      const lastTabbableGridElement = tabbableGridElements[tabbableGridElements.length - 1];
      nextTabbableIndex = allTabbableElements.indexOf(lastTabbableGridElement) + 1;
    } else {
      nextTabbableIndex = allTabbableElements.indexOf(this.gridRef.current) + 1;
    }

    const nextElementOutsideTable =
      allTabbableElements[nextTabbableIndex < allTabbableElements.length ? nextTabbableIndex : 0];

    nextElementOutsideTable.focus();
  }

  handleClickAway = (e: MouseEvent) => {
    // Grid will have pseudo focus when one of it's child elements has true focus, so we can't rely on blur for this
    // functionality
    if (this.gridRef.current && !this.gridRef.current.contains(e.target)) {
      this.setState({
        latestUpdateTriggerEl: null,
        hasFocus: false,
        editingActiveCell: false,
      });
    }
  };

  getActiveCellEl = () => {
    return document.getElementById(
      this.getCellId({
        rowIndex: this.state.activeRowIndex,
        columnIndex: this.state.activeColumnIndex,
      }),
    );
  };

  // In the case where a cell was entered by clicking a focusable element within the cell, we don't want to take
  // focus away from that element.
  wasLatestUpdateTriggerFocusable = () => {
    // getActiveCellEl fails in cypress
    if (!this.getActiveCellEl()) {
      return false;
    }
    const allTabbableElementsInCell = tabbable(this.getActiveCellEl());
    return allTabbableElementsInCell.includes(this.state.latestUpdateTriggerEl);
  };

  focusActiveCell = () => {
    const { editingActiveCell, latestUpdateTriggerEl } = this.state;
    const activeCellType = this.getActiveCellType();

    const shouldFocusChild =
      immediatelyFocusedCellTypes.includes(activeCellType) || (activeCellType === 'action' && editingActiveCell);

    if (shouldFocusChild) {
      if (!this.wasLatestUpdateTriggerFocusable()) {
        this.focusFirstElement(this.getActiveCellEl());
      } else if (document.activeElement !== latestUpdateTriggerEl) {
        // Clicking an element that is focusable doesn't always focus it
        latestUpdateTriggerEl.focus();
      }
    }
  };

  resizeHeaderCellMap() {
    if (this.props.numRows > this.rowHeaderCells.length) {
      range(this.rowHeaderCells.length, this.props.numRows).forEach(() => {
        this.rowHeaderCells.push(new Set());
      });
    } else if (this.props.numRows < this.rowHeaderCells.length) {
      this.rowHeaderCells = this.rowHeaderCells.slice(0, this.props.numRows);
    }

    if (this.props.numColumns > this.columnHeaderCells.length) {
      range(this.columnHeaderCells.length, this.props.numColumns).forEach(() => {
        this.columnHeaderCells.push(new Set());
      });
    } else if (this.props.numColumns < this.columnHeaderCells.length) {
      this.columnHeaderCells = this.columnHeaderCells.slice(0, this.props.numColumns);
    }
  }

  componentDidMount() {
    document.addEventListener('click', this.handleClickAway);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClickAway);
  }

  componentDidUpdate(prevProps: GridProps, prevState: _GridState) {
    const { activeRowIndex, activeColumnIndex, hasFocus, editingActiveCell } = this.state;

    const hasFocusShifted =
      (hasFocus && !prevState.hasFocus) ||
      activeRowIndex !== prevState.activeRowIndex ||
      activeColumnIndex !== prevState.activeColumnIndex ||
      (editingActiveCell && !prevState.editingActiveCell);

    const isTableEmpty = this.props.numRows === 0 || this.props.numColumns === 0;

    if (hasFocusShifted && !isTableEmpty) {
      this.focusActiveCell();
    }
  }

  render() {
    const { children } = this.props;

    this.resizeHeaderCellMap();

    // Since header info is populated during render, the headers to be rendered first
    // TO-DO see if there is a way around this, maybe manually update dom with correct aria tags on update
    const helpers = {
      getCellHtmlProps: this.getCellHtmlProps,
      getGridHtmlProps: this.getGridHtmlProps,
      getCellState: this.getCellState,
      getRowState: this.getRowState,
    };

    return (
      <>
        <AccessibleGridStateContext.Provider value={{ ...this.state, helpers }}>
          <AccessibleGridHelpersContext.Provider value={helpers}>{children}</AccessibleGridHelpersContext.Provider>
        </AccessibleGridStateContext.Provider>

        {/* The aria spec requires cells to be owned by rows.  Requiring users to specify the elements with row accessibility
          markup as part of this API seems redundant because the row information is provided on each cell.  Instead we can create
          the necessary row mark-up automatically and be unopinionate about how API consumers visually lay out their cells  */}
        {range(this.props.numRows).map(row => (
          <div key={row} id={this.getRowId(row)} role="row" aria-owns={this.getOwnedCellIdsForRow(row)} />
        ))}
      </>
    );
  }
}

function blurActiveElement() {
  document.activeElement && (document.activeElement as HTMLElement).blur();
}
