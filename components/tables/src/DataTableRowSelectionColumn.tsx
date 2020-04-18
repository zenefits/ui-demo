import React from 'react';

import { Checkbox } from 'z-frontend-forms';

import Column from './DataTableColumn';

type RowSelectionColumnProps<RowObject> = {
  /**
   * If true, column can never be scrolled off-screen
   * @default false
   */
  isFixed?: boolean;
};

export const DEFAULT_SELECT_COLUMN_WIDTH = 40;

export default class RowSelectionColumn<RowObject> extends React.Component<RowSelectionColumnProps<RowObject>> {
  static displayName = 'DataTableRowSelectionColumn';

  static defaultProps = {
    width: DEFAULT_SELECT_COLUMN_WIDTH,
  };

  // @ts-ignore
  render() {
    throw new Error('DataTable.RowSelectionColumn should never be rendered.');
    return null;
  }
}

// Using a function here because DataTable expects Column components as immediate children
export function generateRowSelectionColumn<RowObject>(props: RowSelectionColumnProps<RowObject>) {
  return (
    <Column<RowObject>
      key="data-table-selection-column"
      contentType="single-input"
      cellStyles={{
        pl: 4,
        pr: 0,
        minWidth: DEFAULT_SELECT_COLUMN_WIDTH,
      }}
      width={DEFAULT_SELECT_COLUMN_WIDTH}
      headerLabel="Select this row"
      renderHeader={params => {
        const allSelected = params.selectionContext.allDisplayedDataIsSelected;
        const anySelected = params.selectionContext.anyDisplayedDataIsSelected;
        return (
          <div className="data-table-selection-column-header">
            <Checkbox
              mb={0}
              checked={allSelected}
              indeterminate={!allSelected && anySelected}
              onChange={
                allSelected
                  ? () => params.selectionContext.onDeselect(params.rows)
                  : () => params.selectionContext.onSelect(params.rows)
              }
              aria-label="Select all rows"
            />
          </div>
        );
      }}
      isFixed={props.isFixed}
    >
      {({ isSelected, onDeselectRow, onSelectRow, rowIndex }) => {
        return (
          <div className="data-table-selection-column">
            <Checkbox
              mb={0}
              checked={isSelected}
              onChange={isSelected ? onDeselectRow : onSelectRow}
              aria-label={`Select row ${rowIndex}`}
            />
          </div>
        );
      }}
    </Column>
  );
}
