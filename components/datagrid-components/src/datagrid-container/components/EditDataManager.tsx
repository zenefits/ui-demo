import React from 'react';

import { DataFilterPanel, DataManager, DataPager, UrlQueryParamsContext } from 'z-frontend-data-manager';
import { DataLayout, NavBar } from 'z-frontend-layout';
import { buildValidationSchema, ValidationDataType, ValidationType } from 'z-frontend-tables';
import { FlexProps } from 'zbase';

import ErrorFilter from './ErrorFilter';
import DatagridEditTable from './DatagridEditTable';
import DataLayoutFooter from './DataLayoutFooter';
import { EditQuery } from '../../gqlTypes';
import { getCategories, getSelectColumnIdMap } from '../../utils';
import AddRowButton from './AddRowButton';
import TextFilters from './TextFilters';
import { Filter, SelectColumnIdMap } from '../../types';

export type RequiredErrorsMap = { [columnId: string]: ColumnRequiredErrorsMap };

export type ColumnRequiredErrorsMap = { [errorKey: string]: boolean };

type EditDataManagerProps = {
  sourceData: any[];
  datagridId: string;
  columnConfiguration: EditQuery.ColumnConfiguration[];
  categoryKey: string;
  /** Function to trigger a loading screen when waiting for submission to finish */
  startSubmitting: () => void;
  /** Whether to hide "Reset" button in DataLayout's footer */
  showResetInFooter?: boolean;
  showFooter?: boolean;
  /** A URL to redirect users out of Data Ingestion Flow app */
  returnUrl: string;
  /** These are flex style props that will be set on the EditableTable component */
  tableDisplayProps: FlexProps;
  readOnly?: boolean;
  allowAddRow?: boolean;
  allowSaveDraft?: boolean;
  allowDeleteRow?: boolean;
};

const columnConfigurationToValidationType: { [key: string]: ValidationDataType } = {
  string: 'string',
  email: 'string',
  phone: 'string',
  stringInteger: 'string',
  addressState: 'string',
  integer: 'number',
  decimal: 'number',
  money: 'number',
  percentage: 'number',
};

class EditDataManager extends React.Component<EditDataManagerProps> {
  render() {
    const {
      sourceData,
      datagridId,
      columnConfiguration,
      categoryKey,
      showResetInFooter,
      showFooter,
      startSubmitting,
      returnUrl,
      tableDisplayProps,
      readOnly,
      allowAddRow,
      allowSaveDraft,
      allowDeleteRow,
    } = this.props;

    const categories = getCategories(columnConfiguration);
    const requiredErrorsMap = getRequiredErrorsMap(columnConfiguration);
    const selectColumnIdMap: SelectColumnIdMap = getSelectColumnIdMap(columnConfiguration);
    const fixedColumnFilters: Filter[] = getFixedColumnFilters(columnConfiguration);

    return (
      <DataManager
        sourceData={sourceData}
        selectionKey="id"
        initialPageSize="m"
        render={() => (
          <DataLayout
            nav={
              <UrlQueryParamsContext.Consumer>
                {({ updateQueryParams }) => (
                  <NavBar mode="list">
                    {categories.map(category => (
                      <NavBar.NavLink
                        key={category.key}
                        onClick={() => {
                          updateQueryParams({
                            categoryKey: category.key,
                          });
                        }}
                        active={categoryKey === category.key}
                      >
                        {category.label}
                      </NavBar.NavLink>
                    ))}
                  </NavBar>
                )}
              </UrlQueryParamsContext.Consumer>
            }
            leftPanel={
              <DataFilterPanel>
                <TextFilters filters={fixedColumnFilters} />
                <ErrorFilter requiredErrorsMap={requiredErrorsMap} />
              </DataFilterPanel>
            }
            leftPanelConfig={{
              openByDefault: false,
            }}
            main={
              <DatagridEditTable
                datagridId={datagridId}
                sourceData={sourceData}
                columnConfiguration={columnConfiguration}
                selectColumnIdMap={selectColumnIdMap}
                currentCategoryKey={categoryKey}
                validationSchema={getValidationSchema(columnConfiguration)}
                tableDisplayProps={tableDisplayProps}
                readOnly={readOnly}
                allowDeleteRow={allowDeleteRow}
              />
            }
            addRowButton={
              allowAddRow && (
                <AddRowButton
                  columnConfiguration={columnConfiguration}
                  datagridId={datagridId}
                  selectColumnIdMap={selectColumnIdMap}
                />
              )
            }
            pager={<DataPager />}
            footer={
              showFooter && (
                <DataLayoutFooter
                  datagridId={datagridId}
                  sourceData={sourceData}
                  startSubmitting={startSubmitting}
                  showReset={showResetInFooter}
                  returnUrl={returnUrl}
                  allowSaveDraft={allowSaveDraft}
                />
              )
            }
          />
        )}
      />
    );
  }
}

export default EditDataManager;

function getValidationSchema(columnConfiguration: EditQuery.ColumnConfiguration[]) {
  return columnConfiguration.reduce((validationSchema: { [key: string]: any }, columnConfiguration) => {
    if (columnConfiguration.validations) {
      validationSchema[columnConfiguration.id] = columnConfiguration.validations
        .map(validation => {
          return buildValidationSchema({
            type: validation.type as ValidationType,
            key: validation.key,
            dataType: columnConfigurationToValidationType[columnConfiguration.type],
            message: validation.message,
            options: validation.meta,
          });
        })
        .filter(schema => schema);
    }
    return validationSchema;
  }, {});
}

function getRequiredErrorsMap(columnConfiguration: EditQuery.ColumnConfiguration[]): RequiredErrorsMap {
  return columnConfiguration.reduce((acc, column) => {
    acc[column.id] = getColumnRequiredErrorsMap(column.validations);
    return acc;
  }, {});
}

function getColumnRequiredErrorsMap(columnValidations: EditQuery.Validations[]): ColumnRequiredErrorsMap {
  return columnValidations.reduce((acc, validationItem) => {
    acc[validationItem.key] = validationItem.type === 'required';
    return acc;
  }, {});
}

function getFixedColumnFilters(columnConfiguration: EditQuery.ColumnConfiguration[]): Filter[] {
  return columnConfiguration.reduce((filters: Filter[], column: EditQuery.ColumnConfiguration) => {
    if (column.fixed) {
      filters.push({
        label: column.label,
        dataKey: column.id,
      });
    }
    return filters;
  }, []);
}
