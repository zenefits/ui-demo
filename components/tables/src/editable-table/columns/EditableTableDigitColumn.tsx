import React from 'react';

import { InputColumnProps } from './EditableTableInputColumn';

export type DigitColumnProps<R> = InputColumnProps<R>;

export default class EditableTableDigitColumn<RowObject> extends React.Component<DigitColumnProps<RowObject>> {
  static displayName = 'EditableTableDigitColumn';

  // @ts-ignore
  render() {
    throw new Error('EditableTable.DigitColumn should never be rendered.');
    return null;
  }
}
