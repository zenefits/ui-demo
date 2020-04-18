import React from 'react';
import gql from 'graphql-tag';

import { Flex, FlexProps, Heading } from 'zbase';
import { LoadingScreen } from 'z-frontend-elements';
import { SaveFailedErrorBanner, SaveStateManager } from 'z-frontend-tables';
import { getApollo } from 'z-frontend-app-bootstrap';
import { ConnectionErrorBanner, Query } from 'z-frontend-network';
import { UrlQueryParamsContext, UrlQueryParamsManager } from 'z-frontend-data-manager';

import { EditQuery } from '../gqlTypes';
import EditDataManager from './components/EditDataManager';
import { updateRowMutation, Row } from './components/DatagridEditTable';
import { getFirstCategory, getRowInput, getSelectColumnIdMap } from '../utils';

type ErrorsWithMessage = { [columnKey: string]: { key: string; message: string }[] };

type SourceData = EditQuery.Rows & { errors: ErrorsWithMessage; [dataKey: string]: any };

type EditState = {
  submitting: boolean;
};

const loadingScreen = <LoadingScreen loadingText="Setting up your data. This may take a few moments." />;

const pollInterval = 3000; // ms

export const editQuery = gql`
  query EditQuery($id: ID!) {
    datagrid(id: $id) {
      id
      copyMeta
      isSubmitted
      status
      returnUrl
      features
      columnConfiguration {
        id
        label
        type
        subCategory
        width
        category {
          key
          label
        }
        fixed
        values {
          value
          label
        }
        validations {
          key
          type
          message
          meta
        }
        readOnly
      }
      rows {
        id
        data
        errors
      }
    }
  }
`;

type DatagridProps = {
  datagridId: string;
  showHeading?: boolean;
  showFooter?: boolean;
  tableDisplayProps?: FlexProps;
  readOnly?: boolean;
};

export default class DatagridContainer extends React.Component<DatagridProps, EditState> {
  state = {
    submitting: false,
  };

  startSubmitting = () => {
    this.setState({ submitting: true });
  };

  render() {
    const { submitting } = this.state;
    const { datagridId, showHeading, showFooter, readOnly, tableDisplayProps } = this.props;

    return submitting ? (
      loadingScreen
    ) : (
      <Query<EditQuery.Query>
        query={editQuery}
        variables={{ id: datagridId }}
        fetchPolicy="network-only"
        pollInterval={pollInterval}
      >
        {({ data, stopPolling }) => {
          const {
            datagrid: {
              columnConfiguration,
              rows,
              copyMeta,
              isSubmitted,
              status,
              returnUrl,
              features: { allowDeleteRow, allowSaveDraft, allowAddRow },
            },
          } = data;

          if (status === 'processing') return loadingScreen;

          // Polling is only needed when status === 'processing'
          stopPolling();

          const sourceData: SourceData[] = getSourceData(rows, columnConfiguration);

          return (
            <UrlQueryParamsManager defaults={{ categoryKey: getFirstCategory(columnConfiguration).key }}>
              <SaveStateManager>
                <ConnectionErrorBanner mb={1} />
                <SaveFailedErrorBanner<Row>
                  mb={1}
                  getRecordKey={row => row.id}
                  getFailureLabel={row => `Record for ${row.firstName} ${row.lastName}`}
                  onRetry={failedRows => {
                    const selectColumnIdMap = getSelectColumnIdMap(columnConfiguration);
                    const retryRowInputs = failedRows.map(failedRow => getRowInput(failedRow, selectColumnIdMap));
                    return getApollo().mutate({
                      mutation: updateRowMutation,
                      variables: {
                        datagridId,
                        rows: retryRowInputs,
                      },
                    });
                  }}
                />
                <Flex column>
                  {showHeading && (
                    <Heading level={1} fontStyle="headings.l" mb={4}>
                      {copyMeta.pageTitle}
                    </Heading>
                  )}

                  <UrlQueryParamsContext.Consumer>
                    {({ queryParams }) => {
                      return (
                        <EditDataManager
                          sourceData={sourceData}
                          datagridId={datagridId}
                          columnConfiguration={columnConfiguration}
                          startSubmitting={this.startSubmitting}
                          showResetInFooter={!isSubmitted}
                          categoryKey={queryParams.categoryKey as string}
                          showFooter={showFooter}
                          returnUrl={returnUrl}
                          tableDisplayProps={tableDisplayProps}
                          readOnly={readOnly}
                          allowAddRow={allowAddRow}
                          allowSaveDraft={allowSaveDraft}
                          allowDeleteRow={allowDeleteRow}
                        />
                      );
                    }}
                  </UrlQueryParamsContext.Consumer>
                </Flex>
              </SaveStateManager>
            </UrlQueryParamsManager>
          );
        }}
      </Query>
    );
  }
}
function getValueOption(column: EditQuery.ColumnConfiguration, currentValue: string) {
  const { values } = column;
  const valueOption = values.find(value => value.value === currentValue);
  return valueOption;
}

function getSelectColumns(columnConfiguration: EditQuery.ColumnConfiguration[]) {
  return columnConfiguration.filter(column => column.values.length > 0);
}

function formatData(data, columnConfiguration: EditQuery.ColumnConfiguration[]) {
  // Update data so that for select columns value is in shape {value: 'xx', label: 'xx'}
  const newData = { ...data };
  const selectColumns: EditQuery.ColumnConfiguration[] = getSelectColumns(columnConfiguration);
  selectColumns.forEach(column => {
    const columnId = column.id;
    let currentValue = newData[columnId];

    if (typeof currentValue === 'number') {
      /**
       * For some select columns, backend returns number values, while in value options values are string, so we use
       * this step to convert number to string. If we don't do this, later we cannot find the correct value option
       *
       * This is just a workaround. Ideally the backend should have the value type consistent
       */
      currentValue = currentValue.toString();
    }

    if (currentValue || currentValue === null) {
      const valueOption = getValueOption(column, currentValue);
      // if no valid option found in config, keep current value
      // we must avoid 'undefined' because it will get lost in graphql mutation (via JSON.stringify)
      newData[columnId] = valueOption || currentValue;
    }
  });
  return newData;
}

function getSourceData(rows: EditQuery.Rows[], columnConfiguration: EditQuery.ColumnConfiguration[]): SourceData[] {
  const columnValidations = columnConfiguration.reduce((validationsMap, column) => {
    column.validations.forEach(validation => {
      validationsMap[validation.key] = validation;
    });
    return validationsMap;
  }, {});

  return rows.map(row => {
    const { data, errors, ...rest } = row;
    const formattedData = formatData(data, columnConfiguration);

    return {
      ...rest,
      ...formattedData,
      errors: Object.keys(errors).reduce((errorsWithMessage, columnKey) => {
        errorsWithMessage[columnKey] = errors[columnKey].map(error => {
          // TODO Memoize this calc to avoid creating a new obj every time and breaking shallow checking downstream
          return {
            ...error,
            message: error.message || columnValidations[error.key].message,
          };
        });
        return errorsWithMessage;
      }, {}),
    };
  });
}
