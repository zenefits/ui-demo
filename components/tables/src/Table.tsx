import React, { Component } from 'react';
// @ts-ignore
import PropTypes from 'prop-types';

import { styled } from 'z-frontend-theme';
import { Box, BoxProps, Flex, FlexAlign } from 'zbase';
import { space } from 'z-frontend-theme/utils';
import { Card } from 'z-frontend-composites';
import { EmptyState } from 'z-frontend-elements';

import TableAvatarCell from './avatar-cell/TableAvatarCell';
import TableBulkSelectDropdown from './bulk-select-dropdown/TableBulkSelectDropdown';
import TableSortableHeaderCell from './sortable-header-cell/TableSortableHeaderCell';
import TableCheckboxCell from './checkbox-cell/TableCheckboxCell';
import TableHeaderCell from './header-cell/TableHeaderCell';

// NOTE-DZH: this component ultimately renders <header>, <footer> etc which do not relate to any section content
// TODO: consider using <thead>, <tfoot> etc

type ColumnWidthType = number;

interface TableContext {
  columnSpacing: number;
  columnWidths: ColumnWidthType[];
  verticalSpacing: number;
  rowAlignment: FlexAlign | FlexAlign[];
}

class TableBody extends Component<BoxProps> {
  static contextTypes = {
    columnSpacing: PropTypes.number,
    columnWidths: PropTypes.arrayOf(PropTypes.number),
    verticalSpacing: PropTypes.number,
    rowAlignment: PropTypes.string,
  };
  context: TableContext;
  BASE_COMPONENT: React.ComponentClass;

  render() {
    const { columnSpacing, columnWidths, verticalSpacing, rowAlignment } = this.context;
    const BaseComponent = this.BASE_COMPONENT;
    const { children, ...rest } = this.props;

    return (
      <BaseComponent {...rest}>
        <Flex mx={-columnSpacing} my={-verticalSpacing} wrap={[true, true, false, false]} align={rowAlignment}>
          {React.Children.map(
            children,
            (child, i) =>
              child &&
              !!columnWidths[i] && (
                <Box px={columnSpacing} py={verticalSpacing} w={[1, null, columnWidths[i]]}>
                  {child}
                </Box>
              ),
          )}
        </Flex>
      </BaseComponent>
    );
  }
}

class Header extends Component<BoxProps> {
  render() {
    return <Card.Header fontStyle="controls.s" color="text.light" {...this.props} />;
  }
}

class TableHeader extends TableBody {
  BASE_COMPONENT = Header;
}

const StyledRow = styled(Box)`
  padding: ${props => (props.py ? space(+props.py) : space(4))} ${space(4)};

  &:last-of-type {
    border-bottom: none;
  }
`;

StyledRow.defaultProps = {
  borderBottom: true,
};

class TableRow extends TableBody {
  BASE_COMPONENT = StyledRow;
}

class TableFooter extends TableBody {
  BASE_COMPONENT = Card.Footer;
}

type TableProps = BoxProps & {
  /** The width of each table columns represented as a percentage. All columns should sum to 1 */
  columnWidths: ColumnWidthType[];
  /** Vertical alignment for each row */
  rowAlignment?: FlexAlign | FlexAlign[];

  /** Is the table empty? Affects whether a message is shown. */
  isEmpty?: boolean;
  /** Override default empty state component. */
  emptyRender?: () => React.ReactNode;
};

/**
 * A component for structuring tabular data in a grid, much like HTML's `<table>`.
 */
class Table extends Component<TableProps> {
  static childContextTypes = {
    columnSpacing: PropTypes.number,
    columnWidths: PropTypes.arrayOf(PropTypes.number),
    verticalSpacing: PropTypes.number,
    rowAlignment: PropTypes.string,
  };
  static defaultProps = {
    rowAlignment: 'center' as FlexAlign,
  };
  static Header = TableHeader;
  static Row = TableRow;
  static Footer = TableFooter;

  // Cell level components
  static SortableHeaderCell = TableSortableHeaderCell;
  static BulkSelectDropdown = TableBulkSelectDropdown;
  static AvatarCell = TableAvatarCell;
  static CheckboxCell = TableCheckboxCell;
  static HeaderCell = TableHeaderCell;

  getChildContext(): TableContext {
    return {
      columnSpacing: 2,
      columnWidths: this.props.columnWidths,
      verticalSpacing: 2,
      rowAlignment: this.props.rowAlignment,
    };
  }

  render() {
    const { columnWidths, rowAlignment, isEmpty, emptyRender, ...rest } = this.props;

    const emptyBlock =
      isEmpty && (emptyRender ? emptyRender() : <EmptyState message="No data to show." iconName="info" />);
    return (
      <Card {...rest}>
        {this.props.children}
        {emptyBlock}
      </Card>
    );
  }
}

export default Table;

export { SortableColumnOption } from './sortable-header-cell/TableSortableHeaderCell';
