import React from 'react';
import _ from 'lodash';
// @ts-ignore
import tabbable from 'tabbable';

import { Box, BoxProps, Flex, FlexProps } from 'zbase';
import { styled } from 'z-frontend-theme';
import { color } from 'z-frontend-theme/utils';

import GridAccessibilityProvider, { AccessibleGridContext, CellType, HeaderType } from './GridAccessibilityProvider';

const StyledGrid = styled(Flex.extendProps<{ hasFocus: boolean }>())`
  ${props => props.hasFocus && 'box-shadow: 0 0 6px 2px rgba(0, 0, 0, 0.15);'}

  &:hover:not(:disabled) {
    box-shadow: 0 0 6px 2px rgba(0, 0, 0, 0.15);
  }

  &:focus {
    outline: none;
  }
`;

const StyledRow = styled(Flex)`
  border-top: solid ${color('grayscale.e')} 1px;

  &:last-child {
    border-bottom: solid ${color('grayscale.e')} 1px;
  }
`;

const StyledCell = styled(Box.extendProps<{ isActive: boolean }>())`
  border-left: solid ${color('grayscale.e')} 1px;
  flex: 1 0;
  background-color: ${props => props.isActive && color('grayscale.g')};

  &:last-child {
    border-right: solid ${color('grayscale.e')} 1px;
  }
`;

type GridCellProps = {
  rowIndex: number;
  columnIndex: number;
  headerType?: HeaderType;
  headerDescribes?: number[];
  contentType: CellType;
  colSpan?: number;
  rowSpan?: number;
} & BoxProps;

type GridHeaderProps = {
  rowIndex: number;
  columnIndex: number;
  type: HeaderType;
  describes?: number[];
  contentType?: CellType;
  colSpan?: number;
  rowSpan?: number;
} & BoxProps;

type GridState = {
  hasFocus: boolean;
  activeRowIndex: number;
  activeColumnIndex: number;
  editingActiveCell: boolean;
};

type GridProps = {
  /**
   * The number of grid rows
   * */
  numRows: number;
  /**
   * The number of grid columns
   * */
  numColumns: number;
  children: (
    params: {
      Row: React.ComponentClass;
      Cell: React.ComponentClass<GridCellProps>;
      Header: React.ComponentClass<GridHeaderProps>;
      gridState: GridState;
    },
  ) => React.ReactNode;
} & FlexProps;

class Cell extends React.Component<GridCellProps> {
  render() {
    const {
      rowIndex,
      columnIndex,
      rowSpan,
      colSpan,
      contentType,
      children,
      headerType,
      headerDescribes,
      ...containerProps
    } = this.props;
    return (
      <AccessibleGridContext.Consumer>
        {({ getCellProps, hasFocus, activeRowIndex, activeColumnIndex }) => (
          <StyledCell
            {...getCellProps({
              rowIndex,
              columnIndex,
              rowSpan,
              colSpan,
              contentType,
              headerDescribes,
              refPropName: 'elementRef',
            })}
            isActive={hasFocus && rowIndex === activeRowIndex && columnIndex === activeColumnIndex}
            {...containerProps}
          >
            {children}
          </StyledCell>
        )}
      </AccessibleGridContext.Consumer>
    );
  }
}

class Header extends React.Component<GridHeaderProps> {
  render() {
    const { type, describes, contentType, ...rest } = this.props;
    return <Cell headerType={type} headerDescribes={describes} contentType={contentType || 'read-only'} {...rest} />;
  }
}

export default class AccessibleGrid extends React.Component<GridProps> {
  render() {
    const { numRows, numColumns, ...containerProps } = this.props;
    return (
      <GridAccessibilityProvider numRows={numRows} numColumns={numColumns} {...containerProps}>
        <AccessibleGridContext.Consumer>
          {({ getGridProps, hasFocus, activeRowIndex, activeColumnIndex, editingActiveCell }) => {
            const gridState = { hasFocus, activeRowIndex, activeColumnIndex, editingActiveCell };
            return (
              <StyledGrid
                direction="column"
                flex="1 0"
                align="stretch"
                hasFocus={hasFocus}
                {...getGridProps({ refPropName: 'elementRef' })}
              >
                {this.props.children({ Cell, Header, gridState, Row: StyledRow })}
              </StyledGrid>
            );
          }}
        </AccessibleGridContext.Consumer>
      </GridAccessibilityProvider>
    );
  }
}
