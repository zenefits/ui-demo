import { uniq } from 'lodash';

import { ColorString, FontStyleString } from 'z-frontend-theme';

import { DatagridRowInput, EditQuery } from './gqlTypes';
import { DatagridColumnCategory, DatagridColumnType, ImportedCell, ImportedRow } from '../schema/schemaTypes';
import { SelectColumnIdMap, SystemValue } from './types';

export function getAssociatedCountryFieldIdForState(
  columns: EditQuery.ColumnConfiguration[],
  stateColumn: EditQuery.ColumnConfiguration,
): string {
  const countryColumn = columns.find(
    column => column.subCategory === stateColumn.subCategory && column.type === DatagridColumnType.addressCountry,
  );

  return countryColumn && countryColumn.id;
}

export function getFirstCategory(columnConfiguration) {
  return columnConfiguration[0].category;
}

export function getCategories(columnConfiguration: { category: { key: string } }[]): DatagridColumnCategory[] {
  const categoryMap: { [categoryKey: string]: DatagridColumnCategory } = columnConfiguration.reduce((acc, column) => {
    acc[column.category.key] = column.category;
    return acc;
  }, {});

  const uniqueCategoryKeys: string[] = uniq(columnConfiguration.map(column => column.category.key));

  return uniqueCategoryKeys.map(categoryKey => categoryMap[categoryKey]);
}

export const commonLabelProps = {
  fontStyle: 'controls.s' as FontStyleString,
  fontSize__deprecated__doNotUse: 0, // override Label default
  color: 'grayscale.d' as ColorString,
  'aria-hidden': true, // only for visual users
};

export function getSelectColumnIdMap(columnConfiguration: EditQuery.ColumnConfiguration[]): SelectColumnIdMap {
  return columnConfiguration.reduce((acc, column) => {
    if (column.values.length) {
      acc[column.id] = column.values;
    }
    return acc;
  }, {});
}

// Get an array of all imported column names
export function getImportedColumnNames(importedRows: ImportedRow[]): string[] {
  const importedRow: ImportedRow = importedRows[0];

  if (!importedRow) {
    return [];
  }

  return importedRow.data.map((importedCell: ImportedCell) => importedCell.importedColumnName);
}

function isNullAnOption(values: SystemValue[]): boolean {
  return values.some(value => value.value === null);
}

function formatRow(row, selectColumnIdMap: SelectColumnIdMap) {
  Object.keys(row).forEach(rowKey => {
    if (selectColumnIdMap[rowKey]) {
      /**
       * rowKey is a select column id
       * Select column fields will have data like {value: 'xx', label: 'xx'}, so we need to extract the value before
       * calling a mutation
       * Note: value.value can be null so we cannot simply use value.value as an select option
       */
      const columnId = rowKey;
      const currentValue = row[columnId];

      if (currentValue && currentValue.label) {
        // If the current value is in shape {value: 'xx', label: 'xx'}
        row[columnId] = currentValue.value;
      } else if (currentValue === null) {
        if (isNullAnOption(selectColumnIdMap[columnId])) {
          // `null` is the value of an option, e.g. `{value: null, label: 'xx'}`
          // This means the placeholder is selected, so we need to send `''` in mutation
          row[columnId] = '';
        } else {
          // `null` is not a value of an option
          // Getting `null` here means it is the value from backend. We preserve the value
          row[columnId] = null;
        }
      }
    }
  });

  return row;
}

export function getRowInput(row, selectColumnIdMap: SelectColumnIdMap): DatagridRowInput {
  const formattedRow = formatRow(row, selectColumnIdMap);

  // TODO Should build the row object based on column ids rather than stripping out what we don't want.
  const { id, errors, __typename, ...rest } = formattedRow;
  return {
    id: row.id,
    data: { ...rest },
  };
}
