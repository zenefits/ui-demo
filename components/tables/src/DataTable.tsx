import React from 'react';
import { isFragment } from 'react-is';
import { debounce, range } from 'lodash';

import { widthHelper, Box, Flex, FlexProps, Table as HtmlTable } from 'zbase';
import {
  DataManagerContext,
  DataManagerRenderProps,
  GenericDataManagerContext,
  RowSelectionContext,
  SelectionContext,
} from 'z-frontend-data-manager';
import { styled, ThemeInterface } from 'z-frontend-theme';
import { color, fontSizes, fontStyles, px, space, zIndex } from 'z-frontend-theme/utils';
import { EmptyState, LoadingSpinner } from 'z-frontend-elements';
import { throwInDevelopment } from 'z-frontend-app-bootstrap';

import GridAccessibilityProvider, {
  AccessibleGridStateContext,
  CellType,
  GridHelpers,
  GridState,
  OnLeaveRowEdit,
} from './GridAccessibilityProvider';
import Row, { getFixedTableRowId, HoverProps, RowHoverManager, RowProps, RowSpan } from './DataTableRow';
import Column, { getColumnKey } from './DataTableColumn';
import { ColumnHeader, DEFAULT_CELL_HEIGHT, DEFAULT_CELL_WIDTH, GridHeaderProps } from './DataTableCell';
import RowSelectionColumn, {
  generateRowSelectionColumn,
  DEFAULT_SELECT_COLUMN_WIDTH,
} from './DataTableRowSelectionColumn';
import IconColumn, { generateIconColumn } from './DataTableIconColumn';
import DataTableMoneyColumn, { generateDataTableMoneyColumn } from './DataTableMoneyColumn';
import DataTableBulkMenu, { RenderBulkActions } from './data-table/DataTableBulkMenu';
import { DEFAULT_STATUS_COLUMN_WIDTH } from './editable-table/columns/EditableTableStatusColumn';

type TableSectionProps = {
  position?: 'left' | 'right';
  showSeparation?: boolean;
};

export type TableLayout = 'auto' | 'fixed';

export type SpanStartsForAllRows = {
  columnsWithSpans: {
    [columnIndex: string]: boolean;
  };
  spanStarts: {
    [rowIndex: string]: {
      [columnIndex: string]: {
        spanLength: number;
      };
    };
  };
};

// Using z-index: sticky + 1 to show box-shadow because <th>s have "sticky" z-index (1020)
const getPositionalStyles = (props: TableSectionProps & { theme: ThemeInterface }) =>
  props.position === 'left'
    ? `
        scrollbar-width: none;
        z-index: ${zIndex('sticky')(props) + 1};
        -ms-overflow-style: none;
        &::-webkit-scrollbar {
          width: 0;
          height: 0;
        }
      `
    : '';

const TableSection = styled(Box)<TableSectionProps>`
  overflow-x: ${props => (props.position === 'right' ? 'auto' : 'hidden')};
  overflow-y: auto;
  ${getPositionalStyles};
  ${props => (props.showSeparation ? `box-shadow: 2px 0px 2px ${color('grayscale.f')(props)}` : '')};
`;

// Set z-index to 1 in order to create a stacking context. We want this so that it will appear under TopNav
const OuterWrapper = styled(Flex)<{ hasFocus: boolean }>`
  position: relative;
  z-index: 1;

  &:focus {
    outline: none;
  }
`;

const StyledHtmlTable = styled(HtmlTable._Table)<{ isEditing: boolean; cellHeight: number; headerHeight: number }>`
  border-collapse: collapse;
  table-layout: ${props => props.tableLayout};

  & th {
    position: sticky;
    padding: 0;
    top: 0;
    background-color: ${color('grayscale.white')};
    box-shadow: 0 1px ${color('grayscale.f')};
    vertical-align: middle;
    ${fontStyles('controls.s')};
    color: ${color('grayscale.d')};
    height: ${props => px(props.headerHeight)};
    white-space: nowrap;
    text-overflow: ellipsis;
    text-align: left;
  }

  & th button.header-button {
    max-width: 100%;

    .header-button__content-container {
      display: flex;
      align-items: center;
    }

    .header-button__content {
      min-width: 0;
      overflow: hidden;
      flex-grow: 1;
      text-overflow: ellipsis;
      line-height: normal;
    }

    i {
      flex-grow: 0;
    }
  }

  & td {
    vertical-align: middle;
    padding-left: ${space(3)};
    padding-right: ${space(3)};
    height: ${props => px(props.cellHeight)};
    ${fontStyles('paragraphs.m')};
    overflow: hidden;
    align-items: center;
    ${props => (props.cellHeight ? 'white-space: nowrap;' : '')}
    text-overflow: ellipsis;
  }

  .error-popover-section {
    margin-bottom: ${space(2)};
  }

  .error-popover-section:last-child {
    margin-bottom: 0;
  }

  .error-popover-list {
    margin: 0;
    padding-left: ${space(4)};
  }

  .error-popover-label {
    ${fontStyles('controls.s')}
  }

  & td[rowspan] {
    border-right: solid ${color('grayscale.f')} 1px;
    border-left: solid ${color('grayscale.f')} 1px;
  }

  & td[rowspan]:last-child {
    border-right: none;
  }

  & td[rowspan]:first-child {
    border-left: none;
  }

  & th.active,
  & td.active {
    background-color: ${color('grayscale.g')};
  }

  & th.selected,
  & td.selected {
    background-color: ${color('secondary.c')};
  }

  & tr {
    border-bottom: solid 1px ${color('grayscale.f')};
  }

  caret-color: ${props => (props.isEditing ? color('grayscale.c') : 'transparent')};

  & input:focus,
  & select:focus {
    ${props => (!props.isEditing ? 'box-shadow: none' : '')}
  }

  .data-table-ellipsis-container {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .data-table-icon {
    font-family: ${props => props.theme.iconFont};
    font-size: ${fontSizes(1)};
    font-style: normal;
    font-weight: ${props => props.theme.weights[0]};
    color: ${props => props.theme.colors['grayscale.d']};
    display: inline-block;
    cursor: default;
  }

  & .icon-header-wrapper {
    display: flex;
    justify-content: center;
    font-size: ${fontSizes(1)};
  }

  & .icon-header-tooltip-wrapper {
    padding: ${space(2)};
  }

  & .icon-header-tooltip-target-wrapper {
    padding: ${space(1)};
  }

  & .icon-column-popover-target {
    cursor: pointer;
  }

  & .wrap-text {
    white-space: normal;
  }

  & .deleted-cell-content {
    text-decoration: line-through;
  }

  & .disabled-icon {
    color: ${color('grayscale.f')};
  }

  .data-table-selection-column {
    line-height: 1;

    label {
      line-height: 1;
    }
  }

  .data-table-selection-column-header,
  .data-table-status-column-header {
    padding: 0 0 0 ${space(4)};
  }
`;

export type SharedTableProps<RowObject> = {
  /**
   * Row data for the table.
   * If not provided, this will pull row data from any wrapping DataManager
   * */
  rows?: RowObject[];
  /**
   * Height for each cell.  Only needed using fixed columns.
   * Defaults to 48 when using fixed columns and undefined otherwise
   * */
  cellHeight?: number;
  /**
   * Height for each header.
   * @default 48
   * */
  headerHeight?: number;
  /**
   * Should clicking cell trigger keyboard navigation.
   * @default false
   * */
  shouldClickActivateTable?: boolean;
  /**
   * Can be used to specified alternative dom id for grid wrapper
   */
  gridId?: string;
  /**
   * Function to return a primary key for your row. This is needed in EditableTable where we need to uniquely identify a row when updating
   * This will usually be something like (row, rowIndex) => row.id
   *
   * @default (row, rowIndex) => rowIndex
   */
  getRowKey?: (row: RowObject, rowIndex: number) => string | number;
  /** Override default empty state component. */
  emptyRender?: () => React.ReactNode;
  /** Specify actions available when rows are selected. */
  bulkActions?: RenderBulkActions;
  /**
   * Sets the `table-layout` css prop for the table. In `auto` mode columns will expand/contract with the content. In fixed mode column widths will always stay static.
   * NOTE: If fixed is set and you are using percentage widths most columns need a specified width. Columns such as RowSelectionColumn and EditableTableStatusColumn are always the same width and as such don't need one.
   * EditableTable is always fixed.
   * @default 'auto'
   */
  tableLayout?: TableLayout;
} & FlexProps;

export type TableProps<RowObject, CustomRowProps = {}> = {
  CustomRowComponent?: React.ComponentClass<RowProps<RowObject> & CustomRowProps>;
  customRowProps?: CustomRowProps;
  onLeaveRowEdit?: OnLeaveRowEdit;
} & SharedTableProps<RowObject>;

function calculateBulkMenuOffset(columns: any[]): number {
  const columnNames = columns.map(column => column.key);
  const hasStatusColumn = columnNames.includes('data-table-status-column');
  const hasRowSelectionColumn = columnNames.includes('data-table-selection-column');
  let offset = 0;
  if (hasStatusColumn) {
    offset += DEFAULT_STATUS_COLUMN_WIDTH;
  }
  if (hasRowSelectionColumn) {
    offset += DEFAULT_SELECT_COLUMN_WIDTH;
  }
  return offset;
}

let nextIncrementedInteger = 0;
const generateAutoIncrementedId = () => {
  nextIncrementedInteger += 1;
  return `z-frontend-data-table-${nextIncrementedInteger}`;
};

const flattenReactFragment = (element: JSX.Element): JSX.Element[] => {
  if (isFragment(element)) {
    const childElements = React.Children.toArray(element.props.children) as JSX.Element[];
    return childElements.reduce((flattenedChildren, child) => {
      return flattenedChildren.concat(flattenReactFragment(child));
    }, []);
  } else {
    return [element];
  }
};

export const flattenFragmentsInChildren = (childrenArray: JSX.Element[]) =>
  childrenArray.reduce((flattenedChildren, child) => {
    return flattenedChildren.concat(flattenReactFragment(child));
  }, []);

type RowPortalsReadyProps = {
  numRows: number;
  // if disabled (there are no fixed rows), will always be true
  disabled: boolean;
  children: (arePortalsReady: boolean) => React.ReactNode;
};

type RowPortalsReadyState = {
  arePortalsReady: boolean;
  lastNumRows: number;
};
// Used to track if portals on fixed side are ready for rows to be loaded into them
// Once it mounts, it will set boolean to true to indicate portals are ready
// If new number of rows passed in, boolean will be set back to false until dom is updated
class RowPortalsReadyManager extends React.Component<RowPortalsReadyProps, RowPortalsReadyState> {
  constructor(props: RowPortalsReadyProps) {
    super(props);
    this.state = {
      lastNumRows: props.numRows,
      arePortalsReady: false,
    };
  }

  static getDerivedStateFromProps(props: RowPortalsReadyProps, state: RowPortalsReadyState) {
    if (props.numRows > state.lastNumRows) {
      return {
        arePortalsReady: false,
        lastNumRows: props.numRows,
      };
    } else {
      return {
        lastNumRows: props.numRows,
      };
    }
  }

  setPortalsReady() {
    if (!this.state.arePortalsReady) {
      this.setState({
        arePortalsReady: true,
      });
    }
  }

  componentDidUpdate() {
    this.setPortalsReady();
  }

  componentDidMount() {
    this.setPortalsReady();
  }

  render() {
    return this.props.children(this.state.arePortalsReady);
  }
}

export default class DataTable<RowObject, CustomRowProps = {}> extends React.Component<
  TableProps<RowObject, CustomRowProps>
> {
  static Row = Row;

  static Column = Column;

  static RowSelectionColumn = RowSelectionColumn;

  static IconColumn = IconColumn;

  static MoneyColumn = DataTableMoneyColumn;

  static ColumnTypeNames = [
    Column.displayName,
    RowSelectionColumn.displayName,
    IconColumn.displayName,
    DataTableMoneyColumn.displayName,
  ];

  fixedTableSection: React.RefObject<HTMLDivElement>;

  fixedTableBody: React.RefObject<HTMLTableSectionElement>;

  fluidTableSection: React.RefObject<HTMLDivElement>;

  fluidTable: React.RefObject<HTMLTableElement>;

  gridId: string;

  static defaultProps = {
    shouldClickActivateTable: false,
    headerHeight: 48,
    border: true,
    getRowKey: (rowObj: any, rowIndex: number) => rowIndex,
    tableLayout: 'auto',
  };

  constructor(props: TableProps<RowObject>) {
    super(props);

    this.gridId = props.gridId || generateAutoIncrementedId();
    this.fixedTableSection = React.createRef<HTMLDivElement>();
    this.fixedTableBody = React.createRef<HTMLTableSectionElement>();
    this.fluidTableSection = React.createRef<HTMLDivElement>();
    this.fluidTable = React.createRef<HTMLTableElement>();
  }

  // eslint-disable-next-line func-names
  static getRowSpans = function<RowObject>(rows: RowObject[], columns: Column<RowObject>[]): SpanStartsForAllRows {
    const rowSpans: { [columnIndex: number]: RowSpan } = columns.reduce(
      (rowSpans: { [col: number]: RowSpan }, column, i) => {
        if (column.props.spanByFieldKey && column.props.fieldKey) {
          rowSpans[i] = {
            index: i,
            spans: {},
            key: column.props.fieldKey as string,
            lastStart: -1,
            lastKeyValue: undefined,
          };
        }
        return rowSpans;
      },
      {},
    );

    Object.values<RowSpan>(rowSpans).forEach(rowSpan => {
      rows.forEach((row: any, i: number) => {
        const keyValueForRow = row[rowSpan.key];
        // Header will be row index 0
        const rowIndex = i + 1;
        if (rowIndex === 1) {
          rowSpan.lastStart = 1;
          rowSpan.lastKeyValue = keyValueForRow;
        } else if (keyValueForRow !== rowSpan.lastKeyValue) {
          rowSpan.spans[rowSpan.lastStart] = { spanLength: rowIndex - rowSpan.lastStart };
          rowSpan.lastStart = rowIndex;
          rowSpan.lastKeyValue = keyValueForRow;
        }
      });

      rowSpan.spans[rowSpan.lastStart] = { spanLength: rows.length + 1 - rowSpan.lastStart };
    });

    return Object.entries(rowSpans).reduce(
      (spansByRow, [columnIndex, rowSpan]) => {
        Object.entries(rowSpan.spans).forEach(([rowIndex, span]) => {
          spansByRow.spanStarts[rowIndex] = spansByRow.spanStarts[rowIndex] || {};
          spansByRow.spanStarts[rowIndex][columnIndex] = span;
          spansByRow.columnsWithSpans[columnIndex] = true;
        });
        return spansByRow;
      },
      { spanStarts: {}, columnsWithSpans: {} } as SpanStartsForAllRows,
    );
  };

  getTableRows(params: {
    rows: RowObject[];
    fixedColumns: Column<RowObject>[];
    fluidColumns: Column<RowObject>[];
    gridState: GridState;
    gridId: string;
    columnIndexOffset?: number;
    selectionContext?: SelectionContext<RowObject>;
    accessibilityHelpers?: GridHelpers;
    cellHeight?: number;
    contentType?: CellType;
    hoverProps: HoverProps;
  }) {
    const {
      rows,
      fixedColumns,
      fluidColumns,
      gridId,
      gridState,
      accessibilityHelpers,
      selectionContext,
      cellHeight,
      hoverProps,
    } = params;

    const columnIndexOffset = params.columnIndexOffset || 0;
    const Row: React.ComponentClass<RowProps<RowObject>> = this.props.CustomRowComponent || (DataTable.Row as any);

    const spanStarts = DataTable.getRowSpans<RowObject>(rows, fixedColumns.concat(fluidColumns));

    return rows.map((rowObject, rowIndex) => (
      <Row
        key={this.props.getRowKey(rowObject, rowIndex)}
        rowKey={this.props.getRowKey(rowObject, rowIndex)}
        rowObject={rowObject}
        rowIndex={rowIndex + 1}
        fixedColumns={fixedColumns}
        fluidColumns={fluidColumns}
        gridState={gridState}
        gridId={gridId}
        selectionContext={selectionContext}
        accessibilityHelpers={accessibilityHelpers}
        columnIndexOffset={columnIndexOffset}
        cellHeight={cellHeight}
        hoverProps={hoverProps}
        isHovered={hoverProps.hoveredRow === rowIndex + 1}
        rowSpanStartsForRow={{
          columnsWithSpans: spanStarts.columnsWithSpans,
          spanStarts: spanStarts.spanStarts[rowIndex + 1] || {},
        }}
        tableLayout={this.props.tableLayout}
        {...this.props.customRowProps}
      />
    ));
  }

  hideDismissableChildrenOnScroll = (tableSectionEl: HTMLDivElement) => {
    Array.from(tableSectionEl.getElementsByClassName('z-dismiss-on-scroll')).forEach(el => {
      (el as HTMLDivElement).style.display = 'none';
    });
  };

  syncTableScroll() {
    const leftSectionEl = this.fixedTableSection.current;
    let leftScrollCallbackEnabled = true;
    const enableLeftScrollCallback = debounce(() => {
      leftScrollCallbackEnabled = true;
    }, 100);

    const rightSectionEl = this.fluidTableSection.current;
    let rightScrollCallbackEnabled = true;
    const enableRightScrollCallback = debounce(() => {
      rightScrollCallbackEnabled = true;
    }, 100);

    leftSectionEl.addEventListener('scroll', (e: any) => {
      if (leftScrollCallbackEnabled) {
        rightScrollCallbackEnabled = false;
        rightSectionEl.scrollTop = leftSectionEl.scrollTop;
        enableRightScrollCallback();
      }

      this.hideDismissableChildrenOnScroll(leftSectionEl);
    });

    rightSectionEl.addEventListener('scroll', (e: any) => {
      if (rightScrollCallbackEnabled) {
        leftScrollCallbackEnabled = false;
        leftSectionEl.scrollTop = rightSectionEl.scrollTop;
        enableLeftScrollCallback();
      }

      this.hideDismissableChildrenOnScroll(rightSectionEl);
    });
  }

  componentDidMount() {
    if (this.fixedTableSection.current) {
      this.syncTableScroll();
    }
  }

  validateProps(
    displayData: RowObject[],
    genericContextData: RowObject[],
    childrenArray: JSX.Element[],
    numFixedLeftColumns: number,
  ) {
    const { rows: propRows, tableLayout } = this.props;

    if (!displayData && !propRows && !genericContextData) {
      throw new Error(
        'You must pass row data either using DataManager context or rows prop or GenericDataManager context.',
      );
    }
    if (genericContextData && genericContextData === propRows) {
      throwInDevelopment('Do not pull table data from both GenericDataManager context and rows props');
    }
    if (genericContextData && genericContextData === displayData) {
      throwInDevelopment(
        'Do not pull table data from both GenericDataManager context and DataManager Context use GenericDataManager context instead',
      );
    }
    if (displayData && displayData === propRows) {
      throwInDevelopment('Do not pull table data from both DataManager and rows props');
    }

    const rows = propRows || displayData || genericContextData;
    if (!rows) {
      throw new Error('You must pass in row data to DataTable or wrap it in a DataManager');
    }

    if (tableLayout === 'fixed') {
      const colsWithoutWidth = childrenArray.filter(child => {
        return !child.props.width || child.props.isFixed;
      });

      const colHasPercentageWidth = childrenArray.some(child => {
        return child.props.width && child.props.width <= 1;
      });

      if (colsWithoutWidth.length && colHasPercentageWidth) {
        throwInDevelopment(
          `When using table-layout: fixed and percentage widths all columns must have a width. Please specify widths for columns: ${colsWithoutWidth
            .map(col => col.props.fieldKey)
            .join(',')}`,
        );
      }
    }

    if (numFixedLeftColumns && tableLayout !== 'fixed') {
      throwInDevelopment('Must use fixed layout when using fixed columns');
    }

    const hasRowSpans = childrenArray.some(child => {
      return child.props.spanByFieldKey;
    });
    if (hasRowSpans && tableLayout !== 'fixed') {
      throwInDevelopment('Must use fixed layout when using row spans');
    }
  }

  getWidthForCol(column: Column<RowObject>) {
    if (column.props.width) {
      return widthHelper(column.props.width);
    } else if (this.props.tableLayout === 'fixed') {
      return widthHelper(DEFAULT_CELL_WIDTH);
    }
    // leave width unspecified for tableLayout 'auto'
  }

  static calculateColumnWidths(columns: Column<any>[]) {
    return columns.reduce((sum, column) => sum + (column.props.width || DEFAULT_CELL_WIDTH), 0);
  }

  render() {
    const {
      rows: propRows,
      children,
      shouldClickActivateTable,
      headerHeight,
      bulkActions,
      onLeaveRowEdit,
      gridId: explicitGridId,
      tableLayout,
      ...containerProps
    } = this.props;

    const childrenArray = React.Children.toArray(this.props.children) as JSX.Element[];
    const flattenedChildrenArray = flattenFragmentsInChildren(childrenArray);
    flattenedChildrenArray.forEach((child: JSX.Element) => {
      if (!child.type || !DataTable.ColumnTypeNames.includes(child.type.displayName)) {
        throw new Error('All children of Table should be a DataTable.*Column component');
      }
    });

    return (
      <GenericDataManagerContext.Consumer>
        {({ data, loading }) => {
          if (loading) {
            return (
              <Flex align="center" justify="center" height={300}>
                <LoadingSpinner s="medium" />
              </Flex>
            );
          }
          return (
            <DataManagerContext.Consumer>
              {(dataManagerContext: Partial<DataManagerRenderProps<RowObject>>) => (
                <RowSelectionContext.Consumer>
                  {(selectionContext: SelectionContext<RowObject>) => {
                    const { displayData, sorting } =
                      dataManagerContext || ({} as Partial<DataManagerRenderProps<RowObject>>);
                    const columns = (flattenedChildrenArray.map((column, columnIndex) => {
                      switch (column.type.displayName) {
                        case RowSelectionColumn.displayName:
                          return generateRowSelectionColumn(column.props);
                        case IconColumn.displayName:
                          return generateIconColumn(column.props);
                        case DataTableMoneyColumn.displayName:
                          return generateDataTableMoneyColumn(column.props);

                        default:
                          return React.cloneElement(column, {
                            key: getColumnKey<RowObject>((column as any) as Column<RowObject>, columnIndex),
                          });
                      }
                    }) as any) as Column<RowObject>[];
                    const rows = propRows || displayData || data;
                    const isRowsFromGenericDataManagerContext = data;
                    let numFixedLeftColumns = 0;
                    if (rows.length > 0) {
                      for (const column of columns) {
                        if (column.props.isFixed) {
                          numFixedLeftColumns += 1;
                        } else {
                          break;
                        }
                      }
                    }

                    this.validateProps(displayData, data, flattenedChildrenArray, numFixedLeftColumns);

                    const fixedColumns = columns.slice(0, numFixedLeftColumns);
                    const fluidColumns = columns.slice(numFixedLeftColumns);

                    const defaultCellHeight = numFixedLeftColumns > 0 ? DEFAULT_CELL_HEIGHT : undefined;
                    const cellHeight = this.props.cellHeight || defaultCellHeight;

                    const numRows = rows.length + 1;
                    const numColumns = columns.length;

                    const showFixedTable = numFixedLeftColumns > 0;
                    return (
                      <GridAccessibilityProvider
                        numRows={numRows}
                        numColumns={numColumns}
                        disableMouseInteraction={!shouldClickActivateTable}
                        onLeaveRowEdit={onLeaveRowEdit}
                        gridId={this.gridId}
                      >
                        <AccessibleGridStateContext.Consumer>
                          {({ helpers, ...gridState }) => (
                            <RowHoverManager gridState={gridState}>
                              {hoverProps => {
                                if (rows.length === 0) {
                                  return (
                                    // do not include column headers because:
                                    // a) there is no data associated with them at this point
                                    // b) there may be many of them, which causes the empty message to be off-screen
                                    <Box width={1} {...containerProps}>
                                      {this.props.emptyRender ? (
                                        this.props.emptyRender()
                                      ) : (
                                        <EmptyState message="No data to show." iconName="info" />
                                      )}
                                    </Box>
                                  );
                                }

                                const getCommonColumnHeaderParams = (
                                  column: Column<RowObject>,
                                  columnIndex: number,
                                ): Omit<GridHeaderProps<RowObject>, 'columnIndex'> => ({
                                  rows,
                                  sorting,
                                  selectionContext,
                                  isSortingUpdatedByUrl: isRowsFromGenericDataManagerContext,
                                  children: column.props.renderHeader,
                                  key: getColumnKey<RowObject>(column, columnIndex),
                                  rowIndex: 0,
                                  label: column.props.headerLabel,
                                  accessibilityHelpers: helpers,
                                  height: headerHeight,
                                  disableSort: column.props.disableSort,
                                  fieldKey: column.props.fieldKey,
                                  textAlign: column.props.textAlign,
                                });

                                return (
                                  <RowPortalsReadyManager numRows={rows.length} disabled={!showFixedTable}>
                                    {rowPortalsReady => (
                                      <OuterWrapper
                                        hasFocus={gridState.hasFocus}
                                        {...helpers.getGridHtmlProps({ refPropName: 'elementRef' })}
                                        {...containerProps}
                                      >
                                        {showFixedTable && (
                                          <TableSection
                                            position="left"
                                            height={this.props.height}
                                            flex="0 0 auto"
                                            elementRef={this.fixedTableSection}
                                            showSeparation
                                            borderRight={columns[numFixedLeftColumns - 1].props.spanByFieldKey}
                                          >
                                            <StyledHtmlTable
                                              role="none"
                                              isEditing={gridState.editingActiveCell}
                                              cellHeight={cellHeight}
                                              headerHeight={headerHeight}
                                              tableLayout="fixed"
                                              width={DataTable.calculateColumnWidths(fixedColumns)}
                                            >
                                              <colgroup>
                                                {range(numFixedLeftColumns).map(columnIndex => (
                                                  <col
                                                    key={columnIndex}
                                                    width={this.getWidthForCol(columns[columnIndex])}
                                                  />
                                                ))}
                                              </colgroup>
                                              {rowPortalsReady && (
                                                <thead>
                                                  <tr role="none">
                                                    {fixedColumns.map((column, columnIndex) => (
                                                      <ColumnHeader<RowObject>
                                                        key={column.props.fieldKey as string}
                                                        {...getCommonColumnHeaderParams(column, columnIndex)}
                                                        columnIndex={columnIndex}
                                                      />
                                                    ))}
                                                  </tr>
                                                </thead>
                                              )}
                                              <tbody ref={this.fixedTableBody} data-testid="fixed-table-body">
                                                {range(1, numRows).map(integer => {
                                                  return (
                                                    <tr
                                                      role="none"
                                                      key={integer.toString()}
                                                      id={getFixedTableRowId(this.gridId, integer)}
                                                    />
                                                  );
                                                })}
                                              </tbody>
                                            </StyledHtmlTable>
                                          </TableSection>
                                        )}
                                        <TableSection
                                          position="right"
                                          height={this.props.height}
                                          flex="1 1 auto"
                                          elementRef={this.fluidTableSection}
                                        >
                                          <StyledHtmlTable
                                            role="none"
                                            elementRef={this.fluidTable}
                                            isEditing={gridState.editingActiveCell}
                                            cellHeight={cellHeight}
                                            headerHeight={headerHeight}
                                            tableLayout={tableLayout}
                                            width={1}
                                          >
                                            {rowPortalsReady && (
                                              // Because the fixed columns will be rendered using a react portals we
                                              // shouldn't render the rows until the element for the portal is on the DOM.
                                              <>
                                                <colgroup>
                                                  {range(numFixedLeftColumns, columns.length).map(columnIndex => (
                                                    <col
                                                      data-testid="data-table-col"
                                                      key={columnIndex}
                                                      width={this.getWidthForCol(columns[columnIndex])}
                                                    />
                                                  ))}
                                                </colgroup>
                                                {selectionContext && selectionContext.anyDisplayedDataIsSelected ? (
                                                  <DataTableBulkMenu
                                                    actions={bulkActions}
                                                    height={headerHeight}
                                                    ml={calculateBulkMenuOffset(columns)}
                                                    selectionContext={selectionContext}
                                                    accessibilityHelpers={helpers}
                                                  />
                                                ) : null}
                                                <thead>
                                                  <tr role="none">
                                                    {fluidColumns.map((column, columnIndex) => (
                                                      <ColumnHeader<RowObject>
                                                        key={column.props.fieldKey as string}
                                                        {...getCommonColumnHeaderParams(column, columnIndex)}
                                                        columnIndex={numFixedLeftColumns + columnIndex}
                                                      />
                                                    ))}
                                                  </tr>
                                                </thead>
                                                <tbody data-testid="fluid-table-body">
                                                  {rowPortalsReady &&
                                                    this.getTableRows({
                                                      rows,
                                                      gridState,
                                                      selectionContext,
                                                      cellHeight,
                                                      hoverProps,
                                                      fixedColumns,
                                                      fluidColumns,
                                                      gridId: this.gridId,
                                                      accessibilityHelpers: helpers,
                                                    })}
                                                </tbody>
                                              </>
                                            )}
                                          </StyledHtmlTable>
                                        </TableSection>
                                      </OuterWrapper>
                                    )}
                                  </RowPortalsReadyManager>
                                );
                              }}
                            </RowHoverManager>
                          )}
                        </AccessibleGridStateContext.Consumer>
                      </GridAccessibilityProvider>
                    );
                  }}
                </RowSelectionContext.Consumer>
              )}
            </DataManagerContext.Consumer>
          );
        }}
      </GenericDataManagerContext.Consumer>
    );
  }
}
