import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { styled } from 'z-frontend-theme';
import { Box, Flex } from 'rebass';
import { color, space } from 'z-frontend-theme/src/utils';
import { RebassProps } from 'z-rebass-types';
import Card from 'z-frontend-cards/src/Card';

interface TableContext {
  columnSpacing: number;
  columnWidths: number[];
  verticalSpacing: number;
}

const StyledRow = styled<RebassProps<{}>>(Box)`
  padding: ${space(4)};
  border-bottom: 1px solid ${color('grayscale.f')};
  &:last-of-type {
    border-bottom: none;
  }
`;

class TableComponent extends Component<RebassProps<{}> & { columnWidths: number[] }> {
  static childContextTypes = {
    columnSpacing: PropTypes.number,
    columnWidths: PropTypes.arrayOf(PropTypes.number),
    verticalSpacing: PropTypes.number,
  };

  getChildContext(): TableContext {
    return {
      columnSpacing: 2,
      columnWidths: this.props.columnWidths,
      verticalSpacing: 2,
    };
  }

  render() {
    const { columnWidths, ...rest } = this.props;
    return <Card {...rest}>{this.props.children}</Card>;
  }
}

class TableBody extends Component<RebassProps<{}>> {
  static contextTypes = {
    columnSpacing: PropTypes.number,
    columnWidths: PropTypes.arrayOf(PropTypes.number),
    verticalSpacing: PropTypes.number,
  };
  context: TableContext;
  BASE_COMPONENT: React.ComponentClass;
  render() {
    const { columnSpacing, columnWidths, verticalSpacing } = this.context;
    const BaseComponent = this.BASE_COMPONENT;
    const { children, ...rest } = this.props;
    return (
      <BaseComponent {...rest}>
        <Flex mx={-columnSpacing} my={-verticalSpacing} wrap align="center">
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

class TableRow extends TableBody {
  BASE_COMPONENT = StyledRow;
}

class TableFooter extends TableBody {
  BASE_COMPONENT = Card.Footer;
}

declare type Table = typeof TableComponent & {
  Header: typeof TableHeader;
  Row: typeof TableRow;
  Footer: typeof TableFooter;
};

const Table = TableComponent as Table;
Table.Header = TableHeader;
Table.Row = TableRow;
Table.Footer = TableFooter;

export default Table;
