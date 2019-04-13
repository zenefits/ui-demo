import React, { Component } from 'react';
import Styled from 'react-styleguidist/lib/rsg-components/Styled';
import { sortBy } from 'lodash';

import { ColorString } from 'z-frontend-theme';
import { isBorderProp, isFlexItemProp, isIntlTextProp, isUtilProp, Badge, Flex } from 'zbase';
import { Button } from 'z-frontend-elements';

export const styles = ({ space, color, fontFamily, fontSize }) => ({
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginBottom: space[4],
    tableLayout: 'fixed', // prevent extending beyond parent div
  },
  tableHead: {
    borderBottom: [[1, color.border, 'solid']],
  },
  cellHeading: {
    color: color.base,
    paddingRight: space[2],
    paddingBottom: space[1],
    textAlign: 'left',
    fontFamily: fontFamily.base,
    fontWeight: 'bold',
    fontSize: fontSize.small,
    whiteSpace: 'nowrap',
  },
  cell: {
    color: color.base,
    paddingRight: space[2],
    paddingTop: space[1],
    paddingBottom: space[1],
    verticalAlign: 'top',
    fontFamily: fontFamily.base,
    fontSize: fontSize.small,
    '&:last-child': {
      isolate: false,
      width: '99%',
      paddingRight: 0,
    },
    '& p:last-child': {
      isolate: false,
      marginBottom: 0,
    },
  },
});

const ZBaseUtilBadge = props => <Badge fontStyle="controls.s" {...props} />;

interface TableCellProps {
  classes: any;
  row: any;
  column: {
    render: (row) => any;
    caption: string;
  };
}

class TableCell extends Component<TableCellProps> {
  render() {
    const { classes, row, column } = this.props;
    const { render, caption } = column;
    return (
      <td className={classes.cell}>
        {render(row)}
        {caption.toLowerCase() === 'prop name' && row.category && (
          <ZBaseUtilBadge bg={row.category.bg}>{row.category.label}</ZBaseUtilBadge>
        )}
      </td>
    );
  }
}

interface PropCategory {
  label: string;
  check: Function;
  bg: ColorString;
}

const propCategories: PropCategory[] = [
  { label: 'intl-text', check: isIntlTextProp, bg: 'avatar.a' },
  { label: 'border', check: isBorderProp, bg: 'avatar.c' },
  { label: 'flex-item', check: isFlexItemProp, bg: 'avatar.e' },
  { label: 'util', check: isUtilProp, bg: 'avatar.g' },
];

function categorizeProp(prop) {
  const category = propCategories.find(category => category.check(prop.name));
  return category ? category : null;
}

function sortPropsTableRows(rows) {
  const mapped = rows.map(row => {
    row.category = categorizeProp(row);
    return row;
  });

  const requiredPropNames = sortBy(mapped.filter(prop => prop.required), 'name');
  const optionalPropNames = sortBy(mapped.filter(prop => !prop.required && !prop.category && prop.description), 'name');
  const zbasePropNames = sortBy(mapped.filter(prop => !prop.required && prop.category), 'name');
  const noDescriptionPropNames = sortBy(
    mapped.filter(prop => !prop.required && !prop.category && !prop.description),
    'name',
  );
  return {
    primaryProps: [...requiredPropNames, ...optionalPropNames],
    secondaryProps: [...zbasePropNames, ...noDescriptionPropNames],
  };
}

// override default in order to sort util props last etc
// https://github.com/styleguidist/react-styleguidist/blob/master/src/rsg-components/Table/TableRenderer.js

interface Props {
  classes: any;
  columns: any;
  rows: any;
  getRowKey: any;
}

interface State {
  showSecondaryProps: boolean;
}

class TableRenderer extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      showSecondaryProps: false,
    };
  }

  getPropsTableRow = row => {
    const { classes, columns, getRowKey } = this.props;
    return (
      <tr key={getRowKey(row)}>
        {columns.map((column, index) => (
          <TableCell key={index} column={column} row={row} classes={classes} />
        ))}
      </tr>
    );
  };

  getPropsTableProps = sortedRows => {
    const { showSecondaryProps } = this.state;
    const { primaryProps, secondaryProps } = sortedRows;
    const includeSecondaryProps = showSecondaryProps || primaryProps.length <= 0;
    return (
      <>
        {primaryProps.map(row => this.getPropsTableRow(row))}
        {includeSecondaryProps && secondaryProps.map(row => this.getPropsTableRow(row))}
      </>
    );
  };

  getPropsTableButton = sortedRows => {
    const { primaryProps, secondaryProps } = sortedRows;
    const { showSecondaryProps } = this.state;
    return secondaryProps.length > 0 && primaryProps.length > 0 ? (
      <Flex justify="center">
        <Button mt={4} onClick={e => this.setState({ showSecondaryProps: !showSecondaryProps })}>
          Show {showSecondaryProps ? 'Less' : 'More'}
        </Button>
      </Flex>
    ) : (
      ''
    );
  };

  render() {
    const { classes, columns, rows, getRowKey } = this.props;
    const isPropsTable = columns[0].caption.toLowerCase() === 'prop name';
    const sortedRows = isPropsTable ? sortPropsTableRows(rows) : rows;

    return (
      <>
        <table className={classes.table}>
          <thead className={classes.tableHead}>
            <tr>
              {columns.map(({ caption }) => (
                <th key={caption} className={classes.cellHeading}>
                  {caption}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {isPropsTable
              ? this.getPropsTableProps(sortedRows)
              : rows.map(row => (
                  <tr key={getRowKey(row)}>
                    {columns.map((column, index) => (
                      <TableCell key={index} column={column} row={row} classes={classes} />
                    ))}
                  </tr>
                ))}
          </tbody>
        </table>
        {isPropsTable ? this.getPropsTableButton(sortedRows) : ''}
      </>
    );
  }
}

export default Styled(styles)(TableRenderer);
