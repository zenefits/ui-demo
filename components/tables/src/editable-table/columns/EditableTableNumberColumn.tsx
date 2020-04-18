import React from 'react';

import { InputColumnProps } from './EditableTableInputColumn';

export default class EditableTableNumberColumn<RowObject> extends React.Component<InputColumnProps<RowObject>> {
  static displayName = 'EditableTableNumberColumn';

  // @ts-ignore
  render() {
    throw new Error('EditableTable.NumberColumn should never be rendered.');
    return null;
  }
}
