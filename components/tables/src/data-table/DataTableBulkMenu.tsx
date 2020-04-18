import React, { Component } from 'react';
import { pickBy } from 'lodash';

import { isUtilProp, BoxProps, Table as HtmlTable } from 'zbase';
import { styled } from 'z-frontend-theme';
import { color, space, zIndex } from 'z-frontend-theme/utils';
import { SelectionContext, UpdateGateControls, UpdateGateControlsContext } from 'z-frontend-data-manager';

import { GridHelpers } from '../GridAccessibilityProvider';

export type RenderBulkActions = (params: {
  selectionsCount: number;
  selections: (string | number)[];
  refreshData: UpdateGateControls['refreshData'];
}) => React.ReactNode;

type DataTableBulkMenuProps = {
  actions: RenderBulkActions;
  height: number;
  selectionContext: SelectionContext<any>;
  accessibilityHelpers: GridHelpers;
} & BoxProps;

const StyledTableHead = styled(HtmlTable.Head)`
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  /* To render on top of <th>s which have "sticky" z-index */
  z-index: ${props => zIndex('sticky')(props) + 1};
  background: ${color('grayscale.white')};
  padding-left: ${space(4)};
`;

const StyledTableRow = styled(HtmlTable.Row)`
  border-bottom: none !important;
`;

const StyledTableHeader = styled(HtmlTable.Header)`
  /* override th styles that do not apply */
  box-shadow: none !important;
  overflow: visible !important;
`;

export default class DataTableBulkMenu extends Component<DataTableBulkMenuProps> {
  render() {
    const { actions, height, selectionContext, accessibilityHelpers } = this.props;
    if (!actions) {
      return null;
    }

    const utilProps = pickBy(this.props, (value, key) => isUtilProp(key));
    return (
      <StyledTableHead {...utilProps} data-testid="DataTableBulkMenu">
        <StyledTableRow>
          <StyledTableHeader
            height={height}
            {...(accessibilityHelpers.getCellHtmlProps({
              rowIndex: 0,
              columnIndex: 1, // after the bulk select checkbox
              contentType: 'action', // TODO: why doesn't this allow tabbing to multiple buttons?
            }) as any)}
          >
            <UpdateGateControlsContext.Consumer>
              {({ refreshData }) =>
                actions({
                  refreshData,
                  selectionsCount: selectionContext.selectionCount,
                  selections: Array.from(selectionContext.selections.values()),
                })
              }
            </UpdateGateControlsContext.Consumer>
          </StyledTableHeader>
        </StyledTableRow>
      </StyledTableHead>
    );
  }
}
