import React from 'react';

import { InputColumnProps } from './EditableTableInputColumn';

export default class EditableTablePercentageColumn<RowObject> extends React.Component<InputColumnProps<RowObject>> {
  static displayName = 'EditableTablePercentageColumn';

  // @ts-ignore
  render() {
    throw new Error('EditableTable.PercentageColumn should never be rendered.');
    return null;
  }
}
