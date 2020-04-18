import React, { ReactElement } from 'react';

import { DataManagerUpdateGate, UpdateGateControls, UpdateGateControlsContext } from 'z-frontend-data-manager';

import MoneyColumn from './columns/EditableTableMoneyColumn';
import DataTable, { flattenFragmentsInChildren, SharedTableProps } from '../DataTable';
import RowSelectionColumn from '../DataTableRowSelectionColumn';
import InputColumn, { generateInputColumn } from './columns/EditableTableInputColumn';
import NumberColumn from './columns/EditableTableNumberColumn';
import PercentageColumn from './columns/EditableTablePercentageColumn';
import Column, { getColumnKey, ColumnProps } from '../DataTableColumn';
import DateColumn from './columns/EditableTableDateColumn';
import TimeColumn from './columns/EditableTableTimeColumn';
import PhoneColumn from './columns/EditableTablePhoneColumn';
import SelectColumn, { generateSelectColumn } from './columns/EditableTableSelectColumn';
import StatusColumn, { generateStatusColumn, ROW_ERROR_KEY } from './columns/EditableTableStatusColumn';
import CountryColumn, { generateCountryColumn } from './columns/EditableTableCountryColumn';
import StateColumn, { generateStateColumn } from './columns/EditableTableStateColumn';
import PostalCodeColumn from './columns/EditableTablePostalCodeColumn';
import IconColumn, { generateIconColumn } from '../DataTableIconColumn';
import DigitColumn from './columns/EditableTableDigitColumn';
import TextareaColumn from './columns/EditableTableTextareaColumn';
import EditableRow, {
  ColumnNameMapping,
  CustomEditableRowProps,
  CustomEditableRowPropsFromEditableTable,
  RowOperationReferences,
} from './EditableRow';
import SaveStateManager, { SaveStateContext } from './SaveStateManager';
import { EditableTableErrors } from './EditableRowErrors';

type RenderFunctionParams = {
  refreshData: UpdateGateControls['refreshData'];
};
type RenderFunction = (params: RenderFunctionParams) => React.ReactNode;

export type EditableTableProps<RowObject> = SharedTableProps<RowObject> &
  CustomEditableRowPropsFromEditableTable<RowObject> & {
    getRowKey: SharedTableProps<RowObject>['getRowKey'];
    columnNameMapping?: ColumnNameMapping;
    children: React.ReactNode | RenderFunction;
  };

type ColumnElement<RowObject> = ReactElement<ColumnProps<RowObject>>;

export default class EditableTable<RowObject> extends React.Component<EditableTableProps<RowObject>> {
  static Column = Column;

  static RowSelectionColumn = RowSelectionColumn;

  static IconColumn = IconColumn;

  static InputColumn = InputColumn;

  static NumberColumn = NumberColumn;

  static PercentageColumn = PercentageColumn;

  static MoneyColumn = MoneyColumn;

  static DateColumn = DateColumn;

  static TimeColumn = TimeColumn;

  static SelectColumn = SelectColumn;

  static StatusColumn = StatusColumn;

  static CountryColumn = CountryColumn;

  static StateColumn = StateColumn;

  static PostalCodeColumn = PostalCodeColumn;

  static PhoneColumn = PhoneColumn;

  static DigitColumn = DigitColumn;

  static TextareaColumn = TextareaColumn;

  static ColumnTypeNames = [
    Column.displayName,
    RowSelectionColumn.displayName,
    InputColumn.displayName,
    NumberColumn.displayName,
    PercentageColumn.displayName,
    MoneyColumn.displayName,
    DateColumn.displayName,
    TimeColumn.displayName,
    SelectColumn.displayName,
    StatusColumn.displayName,
    CountryColumn.displayName,
    StateColumn.displayName,
    PostalCodeColumn.displayName,
    PhoneColumn.displayName,
    IconColumn.displayName,
    DigitColumn.displayName,
    TextareaColumn.displayName,
  ];

  static ROW_ERROR_KEY = ROW_ERROR_KEY;

  rowOperationReferences: RowOperationReferences = {};

  onLeaveRowEdit = (rowIndex: number) => {
    if (this.rowOperationReferences[rowIndex] && this.rowOperationReferences[rowIndex].flushSave) {
      this.rowOperationReferences[rowIndex].flushSave();
    }
  };

  getColumnsFromChildren = (renderFunctionParams: RenderFunctionParams) => {
    const childrenJsx =
      typeof this.props.children === 'function'
        ? (this.props.children as RenderFunction)(renderFunctionParams)
        : this.props.children;

    const childrenArray = React.Children.toArray(childrenJsx) as JSX.Element[];
    const flattenedChildrenArray = flattenFragmentsInChildren(childrenArray);
    flattenedChildrenArray.forEach((child: JSX.Element) => {
      if (child.type && !EditableTable.ColumnTypeNames.includes(child.type.displayName)) {
        throw new Error(
          'All children of EditableTable should be a component matching EditableTable.[COLUMN_TYPE]Column',
        );
      }
    });

    return (flattenedChildrenArray.map((column, columnIndex) => {
      switch (column.type.displayName) {
        case InputColumn.displayName:
        case NumberColumn.displayName:
        case PercentageColumn.displayName:
        case MoneyColumn.displayName:
        case DateColumn.displayName:
        case TimeColumn.displayName:
        case PhoneColumn.displayName:
        case PostalCodeColumn.displayName:
        case DigitColumn.displayName:
        case TextareaColumn.displayName:
          return generateInputColumn(column.props, column.type.displayName);
        case SelectColumn.displayName:
          return generateSelectColumn(column.props);
        case CountryColumn.displayName:
          return generateCountryColumn(column.props);
        case StateColumn.displayName:
          return generateStateColumn(column.props);
        case StatusColumn.displayName:
          return generateStatusColumn(column.props);
        case IconColumn.displayName:
          return generateIconColumn(column.props);
        default:
          return React.cloneElement(column, {
            key: getColumnKey<RowObject>((column as any) as Column<RowObject>, columnIndex),
          });
      }
    }) as any) as ColumnElement<RowObject>[];
  };

  getColumnNameMapping = (columns: ColumnElement<RowObject>[]) => {
    return (
      this.props.columnNameMapping ||
      columns.reduce((columnNameMapping: ColumnNameMapping, column) => {
        if (column.props.fieldKey) {
          columnNameMapping[column.props.fieldKey as string] = column.props.headerLabel;
        }
        return columnNameMapping;
      }, {})
    );
  };

  render() {
    const { saveHandler, validateRow, validationSchema, ...dataTableProps } = this.props;

    return (
      <EditableTableErrors getRowKey={dataTableProps.getRowKey}>
        {/* EditableTableErrors needs to be above the updateGate so that it gets all changes to errors from the raw DataManager context. */}
        <DataManagerUpdateGate>
          <UpdateGateControlsContext.Consumer>
            {({ refreshData }) => (
              <SaveStateManager>
                <SaveStateContext.Consumer>
                  {({ helpers: saveStateHelpers }) => {
                    const columns = this.getColumnsFromChildren({ refreshData });
                    return (
                      <DataTable<RowObject, CustomEditableRowProps<RowObject>>
                        {...dataTableProps}
                        CustomRowComponent={EditableRow}
                        shouldClickActivateTable={!this.props.readOnly}
                        onLeaveRowEdit={this.onLeaveRowEdit}
                        tableLayout="fixed"
                        customRowProps={{
                          validationSchema,
                          validateRow,
                          saveHandler,
                          saveStateHelpers,
                          columnNameMapping: this.getColumnNameMapping(columns),
                          rowOperationReferences: this.rowOperationReferences,
                          readOnly: this.props.readOnly,
                          autoSaveTimeout: this.props.autoSaveTimeout,
                          hasRowBeenDeleted: this.props.hasRowBeenDeleted,
                          isRowReadOnly: this.props.isRowReadOnly,
                        }}
                      >
                        {columns}
                      </DataTable>
                    );
                  }}
                </SaveStateContext.Consumer>
              </SaveStateManager>
            )}
          </UpdateGateControlsContext.Consumer>
        </DataManagerUpdateGate>
      </EditableTableErrors>
    );
  }
}
