import React from 'react';

import { MoneyInputDisplay } from 'z-frontend-forms';

import Column from './DataTableColumn';

type DataTableMoneyColumnProps<RowObject> = {
  /**
   * Property of row object to map to
   */
  fieldKey?: keyof RowObject;
  /**
   * Label for column header.  Will appear in tooltip
   */
  headerLabel: string;
  /**
   * If true, column can never be scrolled off-screen
   * @default false
   */
  isFixed?: boolean;
};

export default class DataTableMoneyColumn<RowObject> extends React.Component<DataTableMoneyColumnProps<RowObject>> {
  static displayName = 'DataTableMoneyColumn';

  // @ts-ignore
  render() {
    throw new Error('DataTableMoneyColumn should never be rendered.');
    return null;
  }
}

// Using a function here because DataTable expects Column components as immediate children
export function generateDataTableMoneyColumn<RowObject>({
  fieldKey,
  headerLabel,
  isFixed,
}: DataTableMoneyColumnProps<RowObject>) {
  return (
    <Column<RowObject> isFixed={isFixed} textAlign="right" headerLabel={headerLabel} cellStyles={{ px: 2, py: 1 }}>
      {({ row }) => {
        return (
          // TODO: fix the type "any"
          <MoneyInputDisplay value={row[fieldKey] as any} textAlignRight />
        );
      }}
    </Column>
  );
}
