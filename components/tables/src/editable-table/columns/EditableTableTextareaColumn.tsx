import React from 'react';

import { InputColumnProps } from './EditableTableInputColumn';

export type TextareaColumnProps<R> = InputColumnProps<R>;

export default class EditableTableTextareaColumn<RowObject> extends React.Component<TextareaColumnProps<RowObject>> {
  static displayName = 'EditableTableTextareaColumn';

  // @ts-ignore
  render() {
    throw new Error('EditableTable.Textarea should never be rendered.');
    return null;
  }
}
