import React from 'react';
import { compact, debounce, range } from 'lodash';

import { Box, BoxProps, Flex, FlexProps, Icon, Table as HtmlTable } from 'zbase';
import { Button } from 'z-frontend-elements';
import { Checkbox } from 'z-frontend-forms';
import { DataManagerContext, SelectionContext } from 'z-frontend-data-manager';

import { styled } from 'z-frontend-theme';
import { color } from 'z-frontend-theme/utils';

import GridAccessibilityProvider, {
  AccessibleGridContext,
  CellType,
  GridState,
  HeaderType,
} from './GridAccessibilityProvider';

type TableSectionProps = {
  position?: 'left' | 'right';
  showSeparation?: boolean;
};

const throwInDevelopment = (e: Error) => {
  if (__DEVELOPMENT__) {
    throw e;
  }
};

const TableSection = styled(Box.extendProps<TableSectionProps>())`
  overflow-x: ${props => (props.position === 'right' ? 'auto' : 'hidden')};
  overflow-y: auto;

  ${props =>
    props.position === 'left'
      ? `
    scrollbar-width: none;
    position: relative;
    z-index: 1;
    -ms-overflow-style: none;
    &::-webkit-scrollbar {
      width: 0;
      height: 0;
    }
  `
      : ''};

  ${props => (props.showSeparation ? `box-shadow: 2px 0px 2px ${color('grayscale.f')(props)}` : '')};
`;

const OuterWrapper = styled(Flex.extendProps<{ hasFocus: boolean }>())`
  ${props => props.hasFocus && 'box-shadow: 0 0 6px 2px rgba(0, 0, 0, 0.15);'}

  &:hover:not(:disabled) {
    box-shadow: 0 0 6px 2px rgba(0, 0, 0, 0.15);
  }

  &:focus {
    outline: none;
  }
`;

const StyledHtmlTable = styled(HtmlTable)`
  border-collapse: collapse;
  width: 100%;
`;

const TableCellContext = React.createContext<{
  isTableCell: boolean;
  isActive: boolean;
}>({
  isTableCell: false,
  isActive: false,
});

type BaseCellProps = {
  isActive: boolean;
  isSelected: boolean;
  rowSpan: number;
};

type CellChildFunction = (
  params: {
    isHovered: boolean;
    isActive: boolean;
    hasKeyboardFocus: boolean;
    isSelected: boolean;
    onSelectRow: () => void;
    onDeselectRow: () => void;
  },
) => React.ReactNode;
type GridCellProps<RowObject> = {
  row?: RowObject;
  rowIndex: number;
  columnIndex: number;
  headerType?: HeaderType;
  isHovered?: boolean;
  isExpanded?: boolean;
  selectionContext?: SelectionContext<RowObject>;
  contentType: CellType;
  colSpan?: number;
  rowSpan?: number;
  BaseCell?: React.ComponentClass<BoxProps & BaseCellProps>;
  justify?: FlexProps['justify'];
  children?: React.ReactNode | CellChildFunction;
} & BoxProps;

const getCellBackground = (props: BaseCellProps) => {
  if (props.isActive) {
    return color('grayscale.g');
  } else if (props.isSelected) {
    return color('secondary.c');
  } else {
    return color('grayscale.white');
  }
};

const StyledCell = styled(HtmlTable.Cell.extendProps<BaseCellProps>())`
  background-color: ${getCellBackground};
  vertical-align: middle;
`;

StyledCell.defaultProps = {
  px: 3,
  minWidth: 100,
};

const CellBody = styled(Flex)`
  overflow: hidden;
`;

const StyledColumnHeader = styled(HtmlTable.Cell.extendProps<BaseCellProps>())`
  background-color: ${getCellBackground};
  position: sticky;
  top: 0;
  box-shadow: 0px 1px ${color('grayscale.f')};
  color: ${color('grayscale.d')};
  vertical-align: middle;
`;

StyledColumnHeader.defaultProps = {
  px: 2,
  fontStyle: 'controls.s',
};

class Cell<RowObject> extends React.Component<GridCellProps<RowObject>> {
  static defaultProps = {
    BaseCell: StyledCell,
  };

  onSelectRow = () => {
    this.props.selectionContext.onSelect([this.props.row]);
  };

  onDeselectRow = () => {
    this.props.selectionContext.onDeselect([this.props.row]);
  };

  isSelected() {
    const { row, selectionContext } = this.props;
    if (selectionContext && row) {
      return selectionContext.selections[row[selectionContext.selectionKey] as any];
    } else {
      return false;
    }
  }

  render() {
    const {
      row,
      rowIndex,
      columnIndex,
      contentType,
      children,
      headerType,
      isHovered,
      rowSpan,
      BaseCell,
      selectionContext,
      justify,
      width,
      ...containerProps
    } = this.props;
    return (
      <AccessibleGridContext.Consumer>
        {({ getCellProps, hasFocus, activeRowIndex, activeColumnIndex }) => {
          const hasKeyboardFocus = hasFocus && rowIndex === activeRowIndex && columnIndex === activeColumnIndex;
          const isActive = hasKeyboardFocus || isHovered;
          const isSelected = this.isSelected();
          return (
            <TableCellContext.Provider value={{ isActive, isTableCell: true }}>
              <BaseCell
                {...getCellProps({
                  rowIndex,
                  columnIndex,
                  contentType,
                  headerType,
                  rowSpan,
                  refPropName: 'elementRef',
                })}
                isActive={isActive}
                isSelected={isSelected}
                rowSpan={rowSpan}
                {...containerProps}
              >
                <CellBody height={!this.props.isExpanded && this.props.height} align="center" justify={justify}>
                  {typeof children === 'function'
                    ? (children as CellChildFunction)({
                        hasKeyboardFocus,
                        isHovered,
                        isActive,
                        isSelected,
                        onSelectRow: this.onSelectRow,
                        onDeselectRow: this.onDeselectRow,
                      })
                    : children}
                </CellBody>
              </BaseCell>
            </TableCellContext.Provider>
          );
        }}
      </AccessibleGridContext.Consumer>
    );
  }
}

type RowProps<RowObject> = {
  rowObject?: RowObject;
  isHovered?: boolean;
  gridState?: GridState;
} & BoxProps;

class Row<RowObject> extends React.Component<RowProps<RowObject>> {
  render() {
    const _Row = HtmlTable.Row.extendProps<RowProps<RowObject>>();
    return <_Row {...this.props} borderBottom />;
  }
}

type GridHeaderProps<RowObject> = {
  rowIndex: number;
  columnIndex: number;
  label: string;
  disableSort?: boolean;
  fieldKey?: keyof RowObject;
  contentType?: CellType;
  justify?: FlexProps['justify'];
  width?: number;
} & BoxProps;

class ColumnHeader<RowObject> extends React.Component<GridHeaderProps<RowObject>> {
  render() {
    const { fieldKey } = this.props;
    return (
      <DataManagerContext.Consumer>
        {({ sorting }) => {
          if (sorting && !this.props.disableSort) {
            const config = sorting.config[0];
            const sortingActive = config && config.key === fieldKey;
            const isAscending = sortingActive && config.isAscending;
            const handleSort = () => {
              // If sorting isn't active, sort ascending, otherwise swap sort order
              const changedIsAscending = !sortingActive || !isAscending;
              sorting.onChange({ 0: { key: fieldKey as any, isAscending: changedIsAscending } });
            };

            return (
              <Cell headerType="column" {...this.props} contentType="editable" BaseCell={StyledColumnHeader}>
                <Button mode="transparent" onClick={handleSort} fontStyle="controls.s" color="grayscale.d">
                  {this.props.label}
                  {sorting && sortingActive && <Icon iconName={isAscending ? 'chevron-up' : 'chevron-down'} pl={2} />}
                </Button>
              </Cell>
            );
          } else {
            return (
              <Cell
                headerType="column"
                {...this.props}
                contentType={this.props.contentType || 'read-only'}
                BaseCell={StyledColumnHeader}
              >
                {this.props.children ? this.props.children : <Box pl={2}>{this.props.label}</Box>}
              </Cell>
            );
          }
        }}
      </DataManagerContext.Consumer>
    );
  }
}

type ColumnChildren<RowObject> = (
  params: {
    row: RowObject;
    gridState: GridState & {
      isHovered: boolean;
      isExpanded: boolean;
    };
    expandRow: () => void;
    collapseRow: () => void;
  },
) => React.ReactNode;

type TableColumnProps<RowObject> = {
  headerLabel: string;
  contentType?: 'editable' | 'read-only';
  width?: number;
  isFixed?: boolean;
  spanByFieldKey?: boolean;
  fieldKey?: keyof RowObject;
  disableSort?: boolean;
  children?: ColumnChildren<RowObject>;
};

class TableColumn<RowObject> extends React.Component<TableColumnProps<RowObject>> {
  static defaultProps = {
    contentType: 'read-only',
  };

  render() {
    throw new Error('Table.Column should never be rendered.');
    return 'Return something for typescript';
  }
}

type RowSpan = {
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

type TableProps<RowObject> = {
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
   * Should row selection be possible.
   * Only can be used if within DataManager
   * @default false
   * */
  enableRowSelection?: boolean;
} & FlexProps;

type TableState = {
  showTableSeparation: boolean;
  hoveredRows: {
    [rowNumber: number]: boolean;
  };
  expandedRows: {
    [rowNumber: number]: boolean;
  };
};

export default class Table<RowObject> extends React.Component<TableProps<RowObject>, TableState> {
  static Row = Row;
  static Cell = Cell;
  static ColumnHeader = ColumnHeader;
  static Column = TableColumn;

  leftTableSection: React.RefObject<HTMLDivElement>;
  rightTableSection: React.RefObject<HTMLDivElement>;
  rightTable: React.RefObject<HTMLTableElement>;

  static defaultProps = {
    shouldClickActivateTable: false,
    headerHeight: 48,
    cellHeight: 48,
    border: true,
  };

  constructor(props: TableProps<RowObject>) {
    super(props);
    this.state = {
      hoveredRows: {},
      expandedRows: {},
      showTableSeparation: false,
    };
    this.leftTableSection = React.createRef<HTMLDivElement>();
    this.rightTableSection = React.createRef<HTMLDivElement>();
    this.rightTable = React.createRef<HTMLTableElement>();
  }

  static getRowSpans = function<RowObject>(rows: RowObject[], columns: TableColumn<RowObject>[]) {
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
      rows.forEach((row: any, rowIndex: number) => {
        const keyValueForRow = row[rowSpan.key];
        if (rowIndex === 0) {
          rowSpan.lastStart = 0;
          rowSpan.lastKeyValue = keyValueForRow;
        } else if (keyValueForRow !== rowSpan.lastKeyValue) {
          rowSpan.spans[rowSpan.lastStart] = { spanLength: rowIndex - rowSpan.lastStart };
          rowSpan.lastStart = rowIndex;
          rowSpan.lastKeyValue = keyValueForRow;
        }
      });

      rowSpan.spans[rowSpan.lastStart] = { spanLength: rows.length - rowSpan.lastStart };
    });
    return rowSpans;
  };

  onMouseEnterRow = (rowIndex: number) => () => {
    this.setState(state => ({
      hoveredRows: {
        ...state.hoveredRows,
        [rowIndex]: true,
      },
    }));
  };

  onMouseLeaveRow = (rowIndex: number) => () => {
    this.setState(state => ({
      hoveredRows: {
        ...state.hoveredRows,
        [rowIndex]: false,
      },
    }));
  };

  onExpandRow = (rowIndex: number) => () => {
    this.setState(state => ({
      expandedRows: {
        ...state.expandedRows,
        [rowIndex]: true,
      },
    }));
  };

  onCollapseRow = (rowIndex: number) => () => {
    this.setState(state => ({
      expandedRows: {
        ...state.expandedRows,
        [rowIndex]: false,
      },
    }));
  };

  getSelectionCell = (params: { row: RowObject; rowIndex: number; selectionContext: SelectionContext<RowObject> }) => {
    const { row, rowIndex, selectionContext } = params;
    const isRowHovered = this.state.hoveredRows[rowIndex];
    return (
      <Cell
        row={row}
        rowIndex={rowIndex + 1}
        columnIndex={0}
        contentType="editable"
        isHovered={isRowHovered}
        isExpanded={this.state.expandedRows[rowIndex]}
        aria-label={`Select row ${rowIndex}`}
        selectionContext={selectionContext}
        minWidth={64}
        justify="center"
      >
        {({ isActive, isSelected, onSelectRow, onDeselectRow }) =>
          isActive || isSelected ? (
            <Checkbox
              ml={2}
              checked={isSelected}
              onChange={isSelected ? onDeselectRow : onSelectRow}
              aria-label={`Select row ${rowIndex}`}
            />
          ) : (
            rowIndex + 1
          )
        }
      </Cell>
    );
  };

  getSelectAllHeader = (params: { rows: RowObject[]; selectionContext: SelectionContext<RowObject> }) => (
    <ColumnHeader<RowObject>
      rowIndex={0}
      columnIndex={0}
      label="Select All Rows"
      aria-label="Select All Rows"
      height={this.props.headerHeight}
      disableSort
      contentType="editable"
      minWidth={64}
      justify="center"
    >
      <Checkbox
        ml={2}
        checked={params.selectionContext.allDisplayedDataIsSelected}
        onChange={
          params.selectionContext.allDisplayedDataIsSelected
            ? () => params.selectionContext.onDeselect(params.rows)
            : () => params.selectionContext.onSelect(params.rows)
        }
        aria-label="Select all rows"
      />
    </ColumnHeader>
  );

  getRowsForColumnsSet(params: {
    rows: RowObject[];
    columns: TableColumn<RowObject>[];
    gridState: GridState;
    columnIndexOffset?: number;
    includeSelectionColumn?: boolean;
    selectionContext?: SelectionContext<RowObject>;
    cellHeight?: number;
  }) {
    const { rows, columns, gridState, includeSelectionColumn, selectionContext, cellHeight } = params;
    const columnIndexOffset = params.columnIndexOffset || 0;

    const rowSpans = Table.getRowSpans<RowObject>(rows, columns);

    return rows.map((rowObject, rowIndex) => {
      const isExpanded = this.state.expandedRows[rowIndex];
      const isRowHovered = this.state.hoveredRows[rowIndex];
      return (
        <Row
          key={rowIndex + 1}
          role="none"
          rowObject={rowObject}
          onMouseEnter={this.onMouseEnterRow(rowIndex)}
          onMouseLeave={this.onMouseLeaveRow(rowIndex)}
        >
          {includeSelectionColumn && this.getSelectionCell({ rowIndex, selectionContext, row: rowObject })}
          {compact(
            columns.map((column, columnIndex) => {
              const rowSpansForColumn = rowSpans[columnIndex];
              if (rowSpansForColumn) {
                const spanForCell = rowSpansForColumn.spans[rowIndex];
                if (spanForCell) {
                  const isSpanHovered = range(rowIndex, rowIndex + spanForCell.spanLength).some(
                    rowIndex => this.state.hoveredRows[rowIndex],
                  );
                  const spanHeightForCell =
                    cellHeight && cellHeight * spanForCell.spanLength + spanForCell.spanLength - 1;

                  return (
                    <Cell<RowObject>
                      row={rowObject}
                      rowIndex={rowIndex + 1}
                      columnIndex={columnIndex + columnIndexOffset}
                      rowSpan={spanForCell.spanLength}
                      contentType={column.props.contentType}
                      isHovered={isSpanHovered}
                      borderRight={columnIndex < columns.length - 1}
                      borderLeft={columnIndex + columnIndexOffset > 0}
                      height={spanHeightForCell}
                      isExpanded={isExpanded}
                      py={cellHeight ? 0 : 2}
                    >
                      {column.props.children
                        ? column.props.children({
                            row: rowObject,
                            gridState: {
                              ...gridState,
                              isExpanded,
                              isHovered: isSpanHovered,
                            },
                            expandRow: this.onExpandRow(rowIndex),
                            collapseRow: this.onCollapseRow(rowIndex),
                          })
                        : rowObject[column.props.fieldKey]}
                    </Cell>
                  );
                }
                return null;
              } else {
                return (
                  <Cell<RowObject>
                    row={rowObject}
                    rowIndex={rowIndex + 1}
                    columnIndex={columnIndex + columnIndexOffset}
                    contentType={column.props.contentType}
                    height={cellHeight}
                    isHovered={isRowHovered}
                    isExpanded={isExpanded}
                    selectionContext={selectionContext}
                    py={cellHeight ? 0 : 2}
                  >
                    {column.props.children
                      ? column.props.children({
                          row: rowObject,
                          gridState: { ...gridState, isExpanded, isHovered: isRowHovered },
                          expandRow: this.onExpandRow(rowIndex),
                          collapseRow: this.onCollapseRow(rowIndex),
                        })
                      : rowObject[column.props.fieldKey]}
                  </Cell>
                );
              }
            }),
          )}
        </Row>
      );
    });
  }

  syncTableScroll() {
    const leftSectionEl = this.leftTableSection.current;
    const rightSectionEl = this.rightTableSection.current;

    let leftScrollCallbackEnabled = true;
    const enableLeftScrollCallback = debounce(() => {
      leftScrollCallbackEnabled = true;
    }, 100);

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
    });

    rightSectionEl.addEventListener('scroll', (e: any) => {
      if (rightScrollCallbackEnabled) {
        leftScrollCallbackEnabled = false;
        leftSectionEl.scrollTop = rightSectionEl.scrollTop;
        enableLeftScrollCallback();
      }
    });
  }

  checkTableOverflow() {
    const rightSectionEl = this.rightTableSection.current;
    const rightTableEl = this.rightTable.current;
    if (rightTableEl.clientWidth > rightSectionEl.clientWidth !== this.state.showTableSeparation) {
      this.setState({
        showTableSeparation: rightTableEl.clientWidth > rightSectionEl.clientWidth,
      });
    }
  }

  componentDidUpdate() {
    this.checkTableOverflow();
  }
  componentDidMount() {
    if (this.leftTableSection.current) {
      this.syncTableScroll();
      this.checkTableOverflow();
    }
  }

  render() {
    const {
      rows: propRows,
      children,
      shouldClickActivateTable,
      enableRowSelection,
      headerHeight,
      ...containerProps
    } = this.props;

    const childrenArray = React.Children.toArray(this.props.children) as JSX.Element[];
    childrenArray.forEach((child: JSX.Element) => {
      if (child.type && child.type !== Table.Column) {
        throw new Error('All children of Table should Table.Column components');
      }
    });
    const columns = (this.props.children as any) as TableColumn<RowObject>[];

    let numFixedLeftColumns = 0;
    for (const column of columns) {
      if (column.props.isFixed) {
        numFixedLeftColumns += 1;
      } else {
        break;
      }
    }

    const fixedColumns = columns.slice(0, numFixedLeftColumns);
    const normalColumns = columns.slice(numFixedLeftColumns);

    const defaultCellHeight = numFixedLeftColumns > 0 ? 48 : undefined;
    const cellHeight = this.props.cellHeight || defaultCellHeight;

    return (
      <DataManagerContext.Consumer>
        {({ displayData, selectionContext }) => {
          if (displayData === propRows) {
            throwInDevelopment(new Error('Do not pull table data from both DataManager and rows props'));
          }
          if (enableRowSelection && !displayData) {
            throw new Error('Row selection may only be done using data manager');
          }

          const rows = propRows || displayData;

          if (!rows) {
            throw new Error('You must pass in row data to DataTable or wrap it in a DataManager');
          }

          const numRows = rows.length + 1;
          const numSelectionColumns = enableRowSelection ? 1 : 0;
          const numColumns = columns.length + numSelectionColumns;

          return (
            <GridAccessibilityProvider
              numRows={numRows}
              numColumns={numColumns}
              disableMouseInteraction={!shouldClickActivateTable}
            >
              <AccessibleGridContext.Consumer>
                {({ getGridProps, ...gridState }) => (
                  <OuterWrapper
                    hasFocus={gridState.hasFocus}
                    {...getGridProps({ refPropName: 'elementRef' })}
                    {...containerProps}
                  >
                    {numFixedLeftColumns > 0 && (
                      <TableSection
                        position="left"
                        height={this.props.height}
                        flex="0 0 auto"
                        elementRef={this.leftTableSection}
                        showSeparation={this.state.showTableSeparation}
                        borderRight={columns[numFixedLeftColumns - 1].props.spanByFieldKey}
                      >
                        <StyledHtmlTable role="none">
                          <HtmlTable.ColumnGroup>
                            {range(numFixedLeftColumns).map(columnIndex => (
                              <HtmlTable.Column width={columns[columnIndex].props.width} />
                            ))}
                          </HtmlTable.ColumnGroup>
                          <Row role="none">
                            {enableRowSelection && this.getSelectAllHeader({ rows, selectionContext })}
                            {fixedColumns.map((column, columnIndex) => (
                              <Table.ColumnHeader<RowObject>
                                rowIndex={0}
                                columnIndex={columnIndex + numSelectionColumns}
                                label={column.props.headerLabel}
                                height={headerHeight}
                                fieldKey={column.props.fieldKey}
                              />
                            ))}
                          </Row>
                          {this.getRowsForColumnsSet({
                            rows,
                            gridState,
                            selectionContext,
                            cellHeight,
                            columns: fixedColumns,
                            columnIndexOffset: numSelectionColumns,
                            includeSelectionColumn: enableRowSelection,
                          })}
                        </StyledHtmlTable>
                      </TableSection>
                    )}

                    <TableSection
                      position="right"
                      height={this.props.height}
                      flex="1 1 auto"
                      elementRef={this.rightTableSection}
                    >
                      <StyledHtmlTable role="none" elementRef={this.rightTable}>
                        <HtmlTable.ColumnGroup>
                          {range(numFixedLeftColumns, columns.length).map(columnIndex => (
                            <HtmlTable.Column width={columns[columnIndex].props.width} />
                          ))}
                        </HtmlTable.ColumnGroup>
                        <Row role="none">
                          {enableRowSelection &&
                            numFixedLeftColumns === 0 &&
                            this.getSelectAllHeader({ rows, selectionContext })}
                          {normalColumns.map((column, columnIndex) => (
                            <Table.ColumnHeader<RowObject>
                              rowIndex={0}
                              columnIndex={numFixedLeftColumns + numSelectionColumns + columnIndex}
                              label={column.props.headerLabel}
                              height={headerHeight}
                              fieldKey={column.props.fieldKey}
                            />
                          ))}
                        </Row>
                        {this.getRowsForColumnsSet({
                          rows,
                          gridState,
                          selectionContext,
                          cellHeight,
                          columns: normalColumns,
                          columnIndexOffset: numSelectionColumns + numFixedLeftColumns,
                          includeSelectionColumn: enableRowSelection && numFixedLeftColumns === 0,
                        })}
                      </StyledHtmlTable>
                    </TableSection>
                  </OuterWrapper>
                )}
              </AccessibleGridContext.Consumer>
            </GridAccessibilityProvider>
          );
        }}
      </DataManagerContext.Consumer>
    );
  }
}
