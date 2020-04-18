import React, { ReactNode } from 'react';

import { DataManagerContext } from 'z-frontend-data-manager';

import { Errors, RowObjectInterface } from './EditableRow';

type EditableRowErrorsProps<RowObject extends RowObjectInterface> = {
  children: (errors: Errors) => ReactNode;
  rowKey: string | number;
  rowObject: RowObject;
};

type EditableTableErrorContextTypes = { errorsByRow: { [rowKey: string]: Errors } };

const EditableTableErrorContext = React.createContext<EditableTableErrorContextTypes>(null);

/**
 * Facilitates the passing through of errors from DataManager source data. Without this we won't get updates from the backend
 * due to the UpdateGate blocking things
 */
export default class EditableRowErrors<RowObject extends RowObjectInterface> extends React.Component<
  EditableRowErrorsProps<RowObject>
> {
  prevErrors: any;

  render() {
    return (
      <EditableTableErrorContext.Consumer>
        {editableTableErrorContext => {
          if (!editableTableErrorContext) {
            return this.props.children(this.props.rowObject.errors || {});
          }
          return this.props.children(editableTableErrorContext.errorsByRow[this.props.rowKey] || {});
        }}
      </EditableTableErrorContext.Consumer>
    );
  }
}

type EditableTableErrorsProps<Row> = {
  getRowKey?: (row: Row, rowIndex: number) => string | number;
};

export class EditableTableErrors<Row> extends React.Component<EditableTableErrorsProps<Row>> {
  render() {
    const { getRowKey } = this.props;
    return (
      <DataManagerContext.Consumer>
        {dataManagerContext => {
          if (!dataManagerContext) {
            return this.props.children;
          }
          const errorsByRow = dataManagerContext.displayData.reduce((errors, datum, i) => {
            errors[getRowKey(datum, i)] = datum.errors;
            return errors;
          }, {});
          return (
            <EditableTableErrorContext.Provider value={{ errorsByRow }}>
              {this.props.children}
            </EditableTableErrorContext.Provider>
          );
        }}
      </DataManagerContext.Consumer>
    );
  }
}
