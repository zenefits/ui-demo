import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { styled } from 'z-frontend-theme';
import { Box, BoxProps, Flex, FlexAlign } from 'zbase';
import { color, space } from 'z-frontend-theme/utils';
import { Card } from 'z-frontend-layout';

// NOTE-DZH: this component ultimately renders <header>, <footer> etc which do not relate to any section content
// TODO: consider using <thead>, <tfoot> etc

interface TableContext {
  columnSpacing: number;
  columnWidths: number[];
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
        <Flex mx={-columnSpacing} my={-verticalSpacing} wrap align={rowAlignment}>
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

class TableHeader extends TableBody {
  BASE_COMPONENT = Card.Header;
}

const StyledRow = styled(Box)`
  padding: ${space(4)};
  border-bottom: 1px solid ${color('grayscale.f')};

  &:last-of-type {
    border-bottom: none;
  }
`;

class TableRow extends TableBody {
  BASE_COMPONENT = StyledRow;
}

class TableFooter extends TableBody {
  BASE_COMPONENT = Card.Footer;
}

type TableProps = BoxProps & {
  /** the width of each table column, expressed as a fraction (should add up to 1) */
  columnWidths: number[];
  /** Vertical alignment for each row */
  rowAlignment?: FlexAlign | FlexAlign[];
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

  getChildContext(): TableContext {
    return {
      columnSpacing: 2,
      columnWidths: this.props.columnWidths,
      verticalSpacing: 2,
      rowAlignment: this.props.rowAlignment,
    };
  }

  render() {
    const { columnWidths, rowAlignment, ...rest } = this.props;
    return <Card {...rest}>{this.props.children}</Card>;
  }
}

export default Table;
