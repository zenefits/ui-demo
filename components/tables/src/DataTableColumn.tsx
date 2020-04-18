import React from 'react';

import { TextAlign } from 'zbase';

import { CellRenderFunction, CellStyles, HeaderRenderFunction } from './DataTableCell';
import { CellType } from './GridAccessibilityProvider';

export function getColumnKey<RowObject>(column: Column<RowObject>, columnIndex: number): string | number {
  if ((column as any).key === '.$data-table-status-column') {
    // TODO: find a better way to preserve this from EditableTable
    return 'data-table-status-column';
  }
  return (column.props.fieldKey as string) || columnIndex;
}

export type ColumnProps<RowObject> = {
  /**
   * Label for column header
   */
  headerLabel: string;
  /**
   * How to align cell content, eg right for numeric.
   */
  textAlign?: TextAlign;
  /**
   * Defined keyboard behavior for cell
   *
   * @default 'read-only'
   */
  contentType?: CellType;
  /**
   * Styles for column cells.
   */
  cellStyles?: CellStyles;
  /**
   * If false, column be scrolled off-screen
   * @default false
   */
  isFixed?: boolean;
  /**
   * Property of row object to map to
   */
  fieldKey?: keyof RowObject;
  /**
   * Should identical values for row[fieldKey] will be grouped into span cells
   * @default false
   */
  spanByFieldKey?: boolean;
  /**
   * Should sort be disabled if used within data manager
   */
  disableSort?: boolean;
  /**
   * This prop is for internal use only.  Do not override headers in product code
   */
  renderHeader?: HeaderRenderFunction<RowObject>;
  /**
   * Width of column
   */
  width?: number;
  children?: CellRenderFunction<RowObject>;
};

export default class Column<RowObject> extends React.Component<ColumnProps<RowObject>> {
  static displayName = 'Column';

  static defaultProps = {
    contentType: 'read-only',
    cellStyles: {
      px: 4, // align with column header
    },
  };

  // @ts-ignore
  render() {
    throw new Error('DataTable.Column should never be rendered.');
    return null;
  }
}
