import React from 'react';

import { InputColumnProps } from './EditableTableInputColumn';

export const DEFAULT_DATE_COLUMN_WIDTH = 185;

export default class EditableTableDateColumn<RowObject> extends React.Component<InputColumnProps<RowObject>> {
  static displayName = 'EditableTableDateColumn';

  // @ts-ignore
  render() {
    throw new Error('EditableTable.DateColumn should never be rendered.');
    return null;
  }
}
