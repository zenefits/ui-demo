import React from 'react';
import gql from 'graphql-tag';
import { pickBy, sum } from 'lodash';

import { EditableTable, Errors } from 'z-frontend-tables';
import { ConfirmationModal, DialogManager } from 'z-frontend-layout';
import { Mutation } from 'z-frontend-network';
import { IconButton } from 'z-frontend-elements';
import { Box, FlexProps } from 'zbase';
import { getApollo } from 'z-frontend-app-bootstrap';

import { DeleteRowsMutation, EditQuery } from '../../gqlTypes';
import { editQuery } from '../DatagridContainer';
import { getAssociatedCountryFieldIdForState, getRowInput } from '../../utils';
import { DatagridColumnType } from '../../../schema/schemaTypes';
import { ComponentDescription, SelectColumnIdMap, SystemValue } from '../../types';

export type Row = {
  id: string;
  [columnId: string]: string;
};

// Must use an intersection to make ts happy
type RowWithErrors = Row & {
  errors?: Errors;
};

type DatagridEditTableProps = {
  datagridId: string;
  sourceData: RowWithErrors[];
  columnConfiguration: EditQuery.ColumnConfiguration[];
  selectColumnIdMap: SelectColumnIdMap;
  // category.key from the currently selected category
  currentCategoryKey: string;
  tableDisplayProps: FlexProps;
  validationSchema?: { [key: string]: any };
  readOnly?: boolean;
  allowDeleteRow?: boolean;
};

type Label = string;

type SingleSelectOptionValueToTextMap = {
  [optionValue: string]: Label;
};

type SelectOptionValueToTextMap = {
  [columnId: string]: SingleSelectOptionValueToTextMap;
};

type ColumnToDisplay = EditQuery.ColumnConfiguration & { readOnly: boolean };

export const updateRowMutation = gql`
  mutation UpdateRowMutation($datagridId: ID!, $rows: [DatagridRowInput!]!) {
    saveDatagridRows(datagridId: $datagridId, rows: $rows) {
      id
      data
      errors
    }
  }
`;

const deleteRowsMutation = gql`
  mutation DeleteRowsMutation($datagridId: ID!, $rowIds: [ID!]!) {
    deleteDatagridRows(datagridId: $datagridId, ids: $rowIds) {
      id
    }
  }
`;

const columnTypeToColumnComponent: { [key: string]: ComponentDescription } = {
  decimal: { name: 'NumberColumn', props: { allowDecimal: true } },
  integer: { name: 'NumberColumn', props: { allowDecimal: false } },
  money: { name: 'MoneyColumn' },
  percentage: { name: 'PercentageColumn' },
  date: { name: 'DateColumn' },
  email: { name: 'InputColumn', props: { type: 'email' } },
  phone: { name: 'PhoneColumn', props: { allowInternational: true } }, // TODO: international should come from column config
  addressCountry: { name: 'CountryColumn' },
  addressState: { name: 'StateColumn' },
  addressZip: { name: 'PostalCodeColumn' },
  stringInteger: { name: 'DigitColumn' },
};

export function createErrorSummary(columnConfiguration: EditQuery.ColumnConfiguration[], currentCategoryKey: string) {
  return (errors: Errors) => {
    const columnMap: { [columnId: string]: EditQuery.ColumnConfiguration } = columnConfiguration.reduce(
      (columnMap, columnConfiguration) => {
        columnMap[columnConfiguration.id] = columnConfiguration;
        return columnMap;
      },
      {},
    );

    // Using a map here to retain insertion order
    const errorsForCurrentTab = new Map();
    const errorsOnOtherTabs = new Map();
    Object.entries(errors).forEach(([fieldKey, fieldErrors]) => {
      if (fieldErrors.length) {
        const columnConfiguration = columnMap[fieldKey];
        if (!columnConfiguration) {
          console.error(
            `Validation error assigned to a row key (${fieldKey}) that does not have a corresponding column label.`,
          );
        } else if (columnConfiguration.category.key === currentCategoryKey) {
          if (errorsForCurrentTab.has(columnConfiguration.label)) {
            errorsForCurrentTab.set(
              columnConfiguration.label,
              errorsForCurrentTab.get(columnConfiguration.label) + fieldErrors.length,
            );
          } else {
            errorsForCurrentTab.set(columnConfiguration.label, fieldErrors.length);
          }
        } else {
          errorsOnOtherTabs.set(
            columnConfiguration.category.label,
            errorsOnOtherTabs.has(columnConfiguration.category.label)
              ? errorsOnOtherTabs.get(columnConfiguration.category.label) + 1
              : 1,
          );
        }
      }
    });

    const errorsInOtherTabsSum = sum(Array.from(errorsOnOtherTabs.values()));
    const errorsInCurrTabSum = sum(Array.from(errorsForCurrentTab.values()));
    return (
      <>
        <Box>
          {errorsInCurrTabSum} {errorsInCurrTabSum === 1 ? 'error' : 'errors'} in this tab
          {errorsForCurrentTab.size > 0 ? `: ${Array.from(errorsForCurrentTab.keys()).join(', ')}` : ''}
        </Box>
        <Box>
          {errorsInOtherTabsSum > 0 && (
            <>
              {errorsInOtherTabsSum} {errorsInOtherTabsSum === 1 ? 'error' : 'errors'} in other tabs:{' '}
              {Array.from(errorsOnOtherTabs.keys()).join(', ')}
            </>
          )}
        </Box>
      </>
    );
  };
}

class DatagridEditTable extends React.Component<DatagridEditTableProps> {
  saveRowHandler = ({ row }) => {
    const rowInput = getRowInput(row, this.props.selectColumnIdMap);
    const { errors, __typename } = row;

    return getApollo().mutate({
      mutation: updateRowMutation,
      variables: {
        rows: [rowInput],
        datagridId: this.props.datagridId,
      },
      optimisticResponse: {
        __typename: 'Mutation',
        saveDatagridRows: [
          {
            __typename,
            errors,
            ...rowInput,
          },
        ],
      },
    });
  };

  onDeleteRows = ({ datagridId, rowIds, deleteRowsMutation, dialogClose }) => async () => {
    await deleteRowsMutation({
      variables: {
        datagridId,
        rowIds,
      },
      refetchQueries: [
        {
          query: editQuery,
          variables: { id: datagridId },
        },
      ],
    });
    dialogClose();
  };

  render() {
    const {
      datagridId,
      columnConfiguration,
      currentCategoryKey,
      validationSchema,
      selectColumnIdMap,
      tableDisplayProps,
      readOnly,
      allowDeleteRow,
    } = this.props;

    // Value-to-text map for all columns that use select input
    const selectOptionValueToTextMap: SelectOptionValueToTextMap = getSelectOptionValueToTextMap(
      selectColumnIdMap,
      columnConfiguration,
    );

    // Get columns to show on editable table
    const columnsToDisplay: ColumnToDisplay[] = getColumnsToDisplay(columnConfiguration, currentCategoryKey);

    const columnIdsToDisplay = columnsToDisplay.map(columnToDisplay => columnToDisplay.id);
    const validationSchemaForVisibleColumns = pickBy(validationSchema, (schema, columnId) => {
      return columnIdsToDisplay.some(id => columnId === id);
    });

    return (
      <Mutation<DeleteRowsMutation.Mutation> mutation={deleteRowsMutation}>
        {(deleteRowsMutation, { loading: deleteRowsloading }) => {
          return (
            <DialogManager
              render={dialog => {
                const modalProps = {
                  isSubmitting: deleteRowsloading,
                  submitActionText: 'Yes, Delete',
                  onCancel: dialog.close,
                  isVisible: dialog.isVisible,
                  controlEl: dialog.controlEl,
                };

                return (
                  <EditableTable<RowWithErrors>
                    key={currentCategoryKey}
                    getRowKey={row => row.id}
                    saveHandler={this.saveRowHandler}
                    validationSchema={validationSchemaForVisibleColumns}
                    columnNameMapping={buildColumnNameMapping(columnConfiguration)}
                    readOnly={readOnly}
                    bulkActions={({ selectionsCount, selections }) => (
                      <>
                        <ConfirmationModal
                          {...modalProps}
                          title={`Delete ${selectionsCount} Row${displayS(selectionsCount)}`}
                          content={`Are you sure you want to delete ${selectionsCount} row${displayS(
                            selectionsCount,
                          )}?`}
                          onSubmit={this.onDeleteRows({
                            datagridId,
                            deleteRowsMutation,
                            dialogClose: dialog.close,
                            rowIds: selections,
                          })}
                        />
                        <IconButton iconName="delete" mr={2} onClick={dialog.open}>
                          Delete ({selectionsCount})
                        </IconButton>
                      </>
                    )}
                    {...tableDisplayProps}
                  >
                    <EditableTable.StatusColumn
                      isFixed
                      createErrorSummary={createErrorSummary(
                        this.props.columnConfiguration,
                        this.props.currentCategoryKey,
                      )}
                    />
                    {allowDeleteRow && <EditableTable.RowSelectionColumn isFixed />}

                    {columnsToDisplay.map((column: ColumnToDisplay) => {
                      const isFixed = column.fixed;
                      const { readOnly } = column;

                      if (selectColumnIdMap[column.id]) {
                        return (
                          <EditableTable.SelectColumn
                            key={column.id}
                            headerLabel={column.label}
                            fieldKey={column.id}
                            width={column.width}
                            isFixed={isFixed}
                            readOnly={readOnly}
                            getOptionText={(option: SystemValue) => selectOptionValueToTextMap[column.id][option.value]}
                          >
                            {(row, rowIndex, { SelectOption }) =>
                              column.values.map((value: SystemValue) => (
                                <SelectOption key={value.label} option={value} />
                              ))
                            }
                          </EditableTable.SelectColumn>
                        );
                      } else if (columnTypeToColumnComponent[column.type]) {
                        const mappedComponent = columnTypeToColumnComponent[column.type];
                        const ColumnComponent = EditableTable[mappedComponent.name];

                        const extraProps =
                          column.type === DatagridColumnType.addressState
                            ? { countryFieldKey: getAssociatedCountryFieldIdForState(columnsToDisplay, column) }
                            : {};
                        const mappedComponentProps = mappedComponent.props || {};

                        return (
                          <ColumnComponent<RowWithErrors>
                            key={column.id}
                            fieldKey={column.id}
                            headerLabel={column.label}
                            width={column.width}
                            isFixed={isFixed}
                            readOnly={readOnly}
                            {...extraProps}
                            {...mappedComponentProps}
                          />
                        );
                      } else {
                        return (
                          <EditableTable.InputColumn
                            key={column.id}
                            headerLabel={column.label}
                            fieldKey={column.id}
                            width={column.width}
                            isFixed={isFixed}
                            readOnly={readOnly}
                          />
                        );
                      }
                    })}
                  </EditableTable>
                );
              }}
            />
          );
        }}
      </Mutation>
    );
  }
}

export default DatagridEditTable;

function getSelectOptionValueToTextMap(
  selectColumnIdMap: SelectColumnIdMap,
  columnConfiguration: EditQuery.ColumnConfiguration[],
): SelectOptionValueToTextMap {
  const result = {};

  columnConfiguration.forEach(column => {
    const columnId = column.id;

    if (selectColumnIdMap[columnId]) {
      result[columnId] = getSingleColumnOptionValueToTextMap(column);
    }
  });

  return result;
}

function getSingleColumnOptionValueToTextMap(column): SingleSelectOptionValueToTextMap {
  return column.values.reduce((acc, value: SystemValue) => {
    acc[value.value] = value.label;
    return acc;
  }, {});
}

function getColumnsToDisplay(columnConfiguration: EditQuery.ColumnConfiguration[], currentCategoryKey: string) {
  return columnConfiguration.reduce((acc, column) => {
    const isInCurrentCategory = column.category.key === currentCategoryKey;
    if (isInCurrentCategory || column.fixed) {
      const columnWithReadOnly = { ...column, readOnly: column.readOnly || !isInCurrentCategory };
      acc.push(columnWithReadOnly);
    }
    return acc;
  }, []);
}

function displayS(selectionCount: number): 's' | '' {
  return selectionCount > 1 ? 's' : '';
}

function buildColumnNameMapping(columnConfiguration: EditQuery.ColumnConfiguration[]) {
  return columnConfiguration.reduce((columnNameMapping, configuration) => {
    columnNameMapping[configuration.id] = `${configuration.category.label}/${configuration.label}`;
    return columnNameMapping;
  }, {});
}
