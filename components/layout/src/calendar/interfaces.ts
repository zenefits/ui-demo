/**
 * {row: 0, column: 0} represents the top-left cell not counting the days row and row headers column
 */
export interface CellPosition {
  row: number;
  column: number;
}

/**
 * Drag and drop event for Calendar component
 */
export interface DropEvent<Source> {
  source: Source;
  target: CellPosition;
}

export interface CellClickEvent<TCell> {
  cellPosition: CellPosition;
  cellData: TCell;
}

export interface CellTemplateParams<TCell, TRow extends { columns: TCell[]; height?: string }> {
  cellData: TCell;
  rowData: TRow;
  cellPosition: CellPosition;
}

export type DropHandler<Source> = (dropEvent: DropEvent<Source>) => void;
