import React from 'react';

import { InputColumnProps } from './EditableTableInputColumn';

export default class EditableTableMoneyColumn<RowObject> extends React.Component<InputColumnProps<RowObject>> {
  static displayName = 'EditableTableMoneyColumn';

  // @ts-ignore
  render() {
    throw new Error('EditableTable.MoneyColumn should never be rendered.');
    return null;
  }
}
