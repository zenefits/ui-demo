import React from 'react';

import { BoxProps, TextAlign } from 'zbase';

import {
  getFieldSortedStatus,
  getNewOrderBy,
  FieldSortedStatus,
  SelectionContext,
  SortContext,
  UrlQueryParamsContext,
} from 'z-frontend-data-manager';
import { theme } from 'z-frontend-theme';

import { CellType, GridHelpers, HeaderType } from './GridAccessibilityProvider';
import DataTableColumnHeaderButton, { CaretType } from './DataTableColumnHeaderButton';

export type CellRenderFunction<RowObject> = (params: {
  isRowHovered: boolean;
  isActive: boolean;
  hasFocus: boolean;
  isSelected: boolean;
  rowIndex: number;
  columnIndex: number;
  rowKey?: string | number;
  onSelectRow?: () => void;
  onDeselectRow?: () => void;
  row?: RowObject;
}) => React.ReactNode;

export type CellStyles = {
  maxWidth?: number;
  minWidth?: number;
  maxHeight?: number;
  height?: number;
  minHeight?: number;
  pl?: number;
  pr?: number;
  px?: number;
  pt?: number;
  pb?: number;
  py?: number;
  textAlign?: TextAlign | TextAlign[];
};

export type CommonCellProps<RowObject> = {
  accessibilityHelpers: GridHelpers;
  children: React.ReactNode | CellRenderFunction<RowObject>;
  columnIndex: number;
  contentType?: CellType;
  eventListeners?: {
    onMouseOver: () => void;
    onMouseLeave: () => void;
  };
  row?: RowObject;
  rowIndex: number;
  rowKey?: string | number;
};

type GridCellProps<RowObject> = CommonCellProps<RowObject> & {
  isRowHovered?: boolean;
  rowSpan?: number;
  headerType?: HeaderType;
  height?: number;
  styles?: CellStyles;
  isSelected?: boolean;
  onSelectRow?: () => void;
  onDeselectRow?: () => void;
};

type AccessibilityCellState = {
  isActive: boolean;
  isSelected: boolean;
};

const getCellClass = (cellState: AccessibilityCellState) => {
  if (cellState.isActive) {
    return 'active';
  } else if (cellState.isSelected) {
    return 'selected';
  } else {
    return '';
  }
};

export const DEFAULT_CELL_HEIGHT = 51;
export const DEFAULT_CELL_WIDTH = 200;

function getPaddingInPixels(styles: CellStyles, propsToTry: (keyof CellStyles)[], fallback?: number) {
  const paddingProp: keyof CellStyles = propsToTry.find(prop => styles[prop] !== undefined);
  if (paddingProp) {
    return theme.space[styles[paddingProp] as number];
  }
  if (fallback) {
    return theme.space[fallback];
  }
}

export class Cell<RowObject> extends React.Component<GridCellProps<RowObject>> {
  render() {
    const {
      row,
      rowIndex,
      rowKey,
      columnIndex,
      accessibilityHelpers,
      isRowHovered,
      contentType,
      headerType,
      isSelected,
      rowSpan,
      onSelectRow,
      onDeselectRow,
      eventListeners,
      children,
    } = this.props;
    const styles = this.props.styles || {};

    const hasFocus = accessibilityHelpers.getCellState({ rowIndex, columnIndex }).isActive;
    const rowHasFocus = accessibilityHelpers.getRowState(rowIndex).hasFocus;
    const isActive = rowHasFocus || isRowHovered;

    // If using fixed height for cell, don't include padding by default
    const defaultPaddingY = styles.height || styles.maxHeight ? undefined : 3;
    const dynamicCellStyles = {
      minWidth: styles.minWidth,
      maxHeight: styles.maxHeight,
      paddingLeft: getPaddingInPixels(styles, ['pl', 'px']),
      paddingRight: getPaddingInPixels(styles, ['pr', 'px']),
      paddingTop: getPaddingInPixels(styles, ['py', 'py'], defaultPaddingY),
      paddingBottom: getPaddingInPixels(styles, ['pb', 'py'], defaultPaddingY),
      height: styles.height,
      textAlign: styles.textAlign,
      zIndex: headerType ? theme.zIndex.sticky : 0,
    };

    const cellElProps = {
      ...(accessibilityHelpers.getCellHtmlProps({ rowIndex, columnIndex, rowSpan, contentType }) as any),
      className: getCellClass({ isActive, isSelected }),
      style: dynamicCellStyles,
      ...eventListeners,
    };

    const cellBody =
      typeof children === 'function'
        ? (children as CellRenderFunction<RowObject>)({
            row,
            rowIndex,
            rowKey,
            columnIndex,
            isRowHovered,
            hasFocus,
            isActive,
            isSelected,
            onSelectRow,
            onDeselectRow,
          })
        : children;

    if (headerType) {
      return <th {...cellElProps}>{cellBody}</th>;
    } else {
      return <td {...cellElProps}>{cellBody}</td>;
    }
  }
}

export type HeaderRenderFunction<RowObject> = (params: {
  rows: RowObject[];
  selectionContext: SelectionContext<RowObject>;
}) => React.ReactNode;

export type GridHeaderProps<RowObject> = {
  rowIndex: number;
  columnIndex: number;
  label: string;
  accessibilityHelpers: GridHelpers;
  rows?: RowObject[];
  disableSort?: boolean;
  fieldKey?: keyof RowObject;
  sorting?: SortContext<RowObject>;
  /**
   * Whether to update sorting by updating url. In the future this might be the only way to update sorting.
   */
  isSortingUpdatedByUrl?: boolean;
  selectionContext?: SelectionContext<RowObject>;
  children?: HeaderRenderFunction<RowObject>;
  height: number;
  key?: number | string;
} & BoxProps;

export class ColumnHeader<RowObject> extends React.Component<GridHeaderProps<RowObject>> {
  render() {
    const {
      rows,
      selectionContext,
      rowIndex,
      columnIndex,
      textAlign,
      fieldKey,
      sorting,
      disableSort,
      label,
      accessibilityHelpers,
      isSortingUpdatedByUrl,
      height,
      children,
    } = this.props;

    const shouldSort = sorting && !disableSort;
    const shouldSortByUpdatingUrl = isSortingUpdatedByUrl && !disableSort;
    let cellBody;
    let paddingX: number;

    if (children) {
      cellBody = children({ rows, selectionContext });
    } else if (shouldSort) {
      const config = sorting.config[0];
      const sortingActive = config && config.key === fieldKey;
      const isAscending = sortingActive && config.isAscending;
      const caretType: CaretType = sortingActive ? (isAscending ? 'up' : 'down') : '';
      const handleSort = () => {
        // If sorting isn't active, sort ascending, otherwise swap sort order
        const changedIsAscending = !sortingActive || !isAscending;
        sorting.onChange({ 0: { key: fieldKey as string, isAscending: changedIsAscending } });
      };

      cellBody = <DataTableColumnHeaderButton text={label} caretType={caretType} onClick={handleSort} />;
      paddingX = 3; // Button includes some padding
    } else if (shouldSortByUpdatingUrl) {
      cellBody = (
        <UrlQueryParamsContext.Consumer>
          {({ queryParams, updateQueryParams }) => {
            const newOrderBy: string[] = getNewOrderBy(queryParams, fieldKey as string);
            const { sorted, direction }: FieldSortedStatus = getFieldSortedStatus(queryParams, fieldKey as string);
            const caretType: CaretType = sorted ? (direction === 'asc' ? 'up' : 'down') : '';
            const onClick = () => updateQueryParams({ order_by: newOrderBy, currentPage: 1 });

            return <DataTableColumnHeaderButton text={label} caretType={caretType} onClick={onClick} />;
          }}
        </UrlQueryParamsContext.Consumer>
      );
      paddingX = 3; // Button includes some padding
    } else {
      cellBody = label;
      paddingX = 4; // align with td (generous to accommodate inputs)
    }

    const styles = {
      height,
      textAlign,
      px: paddingX,
      minWidth: 48,
    };
    return (
      <Cell<RowObject>
        rowIndex={rowIndex}
        columnIndex={columnIndex}
        accessibilityHelpers={accessibilityHelpers}
        styles={styles}
        contentType={shouldSort ? 'action' : 'read-only'}
        headerType="column"
      >
        {cellBody}
      </Cell>
    );
  }
}
