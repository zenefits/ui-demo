import React from 'react';

import { Time } from 'z-frontend-forms';

import { InputColumnProps } from './EditableTableInputColumn';

export const DEFAULT_TIME_COLUMN_WIDTH = 185;

export type TimeColumnProps<RowObject> = {
  defaultHighlightTime?: Time;
  /**
   * Whether to show option dropdown when focus is on the time input
   */
  disableDropdown?: boolean;
} & InputColumnProps<RowObject>;

export default class EditableTableTimeColumn<RowObject> extends React.Component<TimeColumnProps<RowObject>> {
  static displayName = 'EditableTableTimeColumn';

  // @ts-ignore
  render() {
    throw new Error('EditableTable.TimeColumn should never be rendered.');
    return null;
  }
}
