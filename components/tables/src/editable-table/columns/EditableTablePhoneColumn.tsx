import React from 'react';

import { PhoneInputOnlyProps } from 'z-frontend-forms';

import { InputColumnProps } from './EditableTableInputColumn';

export const DEFAULT_PHONE_COLUMN_WIDTH = 180;

export type PhoneColumnProps<R> = InputColumnProps<R> & PhoneInputOnlyProps;

export default class EditableTablePhoneColumn<RowObject> extends React.Component<PhoneColumnProps<RowObject>> {
  static displayName = 'EditableTablePhoneColumn';

  // @ts-ignore
  render() {
    throw new Error('EditableTable.PhoneColumn should never be rendered.');
    return null;
  }
}
