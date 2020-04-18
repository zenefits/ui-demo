import React from 'react';

import { InputColumnProps } from './EditableTableInputColumn';

export const DEFAULT_POSTAL_CODE_COLUMN_WIDTH = 145;

export default class EditableTablePostalCodeColumn<RowObject> extends React.Component<InputColumnProps<RowObject>> {
  static displayName = 'EditableTablePostalCodeColumn';

  // @ts-ignore
  render() {
    throw new Error('EditableTable.PostalCode should never be rendered.');
    return null;
  }
}
