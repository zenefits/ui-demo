import React from 'react';
import { range } from 'lodash';
import gql from 'graphql-tag';
import * as Yup from 'yup';
import { produce } from 'immer';
// @ts-ignore
import { action } from '@storybook/addon-actions';

import { Box } from 'zbase';
import { Button, IconButton } from 'z-frontend-elements';
import { DataManager, DataPager } from 'z-frontend-data-manager';
import { ConfirmationModal, DataLayout, DialogManager } from 'z-frontend-layout';
import { Query } from 'z-frontend-network';
import { Form, FormFooter, FormNumberInput } from 'z-frontend-forms';
import { getApollo } from 'z-frontend-app-bootstrap';

import { EditableTableStoryDatagridQuery } from '../gqlTypes';
import { DatagridRow } from '../../schema/schemaTypes';
import { storiesOf } from '../../.storybook/storyHelpers';
import { buildValidationSchema, generatePostalCodeSchema, generateValidStateProvinceSchema } from './validationSchema';
import { ValidationDataType, ValidationType } from './types';
import EditableTable from './EditableTable';
import { Errors } from './EditableRow';
import SaveStateManager from './SaveStateManager';
import SaveFailedErrorBanner from './SaveFailedErrorBanner';

storiesOf('tables|EditableTable', module)
  .addDecorator((getStory: Function) => (
    <Box p={20} w={1} bg="grayscale.white">
      {getStory()}
    </Box>
  ))
  .add('default', () => <DefaultExample />)
  .add('data saving', () => <SmallDataSavingExample />)
  .add('column types', () => <ColumnTypesExample />)
  .add('large table', () => <LargeDataSavingExample />)
  .add('graphql', () => <GraphqlExample />)
  .add('dynamic columns', () => <DynamicColumnsExample />)
  .add('with address', () => <AddressExample />)
  .add('with DataLayout', () => <EditableTableLayoutExample />)
  .add('with bulk selection', () => <BulkSelectedExample />)
  .add('with deletions marked', () => <MarkDeletionsExample />)
  .add('with server errors', () => <ServerErrorExample />)
  .add('dependent column example', () => <DependentColumnExample />);

type Row = {
  id: number;
  name: string;
  birthplace?: string;
  birthDate?: string;
  birthTime?: string;
  startTime?: string;
  age?: number;
  salary?: number;
  phone?: string;
  email?: string;
  universe: Universe;
  deleted?: boolean;
  errors?: Errors;
  digitId?: string;
  comments?: string;
};

export type ExampleRow = Row;

type AddressRow = {
  id: number;
  name: string;
  line1?: string;
  city?: string;
  country?: string;
  state?: string;
  postalCode?: string;
};

const locations = {
  TT: 'Tattoine',
  AD: 'Alderaan',
  KM: 'Kamino',
  WF: 'Winterfell',
  DS: 'Dragonstone',
  BR: 'Bedrock',
  OC: 'Orbit City',
};
type LocationKey = keyof typeof locations;
const locationMap: {
  [key: string]: LocationKey[];
} = {
  'Hanna-Barbera': ['BR', 'OC'],
  'Song of Ice and Fire': ['WF', 'KM', 'DS'],
  'Star Wars': ['TT', 'AD', 'KM'],
};
type Universe = keyof typeof locationMap;

const lukeLeiaBirthError = { key: 'luke-leia-twins', message: 'Birth and age data for Luke and Leia must match.' };

const rows: Row[] = [
  {
    id: 1,
    name: 'Fred Flintstone',
    universe: 'Hanna-Barbera',
    birthplace: 'BR',
    birthTime: '4:00 PM',
    startTime: '9:00 AM',
    age: 46,
    phone: '555-555-5555',
    digitId: '012',
    // no salary
  },
  {
    id: 2,
    name: 'Barney Rubble',
    universe: 'Hanna-Barbera',
    birthplace: 'BR',
    birthTime: '3:00 AM',
    age: 48,
    digitId: '890',
  },
  {
    id: 3,
    name: 'Ned Stark',
    universe: 'Song of Ice and Fire',
    birthplace: 'WF',
    birthTime: '1:30 AM',
    age: 42,
    salary: 13,
    birthDate: '1263-12-12',
    deleted: true,
    digitId: '4a7b6c',
  },
  {
    id: 4,
    name: 'Daenerys Targaryen',
    universe: 'Song of Ice and Fire',
    birthplace: 'DS',
    age: 18,
    salary: 3290,
    birthDate: '1284-09-11',
  },
  {
    id: 5,
    name: 'Luke Skywalker',
    universe: 'Star Wars',
    birthplace: 'TT',
    salary: 12,
    birthDate: '1977-05-25', // BBY doesn't work so well
    errors: {
      [EditableTable.ROW_ERROR_KEY]: [lukeLeiaBirthError],
    },
  },
  {
    id: 6,
    name: 'Leia Skywalker',
    universe: 'Star Wars',
    birthplace: 'AD',
    salary: 12,
    birthDate: '1977-05-25',
    errors: {
      [EditableTable.ROW_ERROR_KEY]: [lukeLeiaBirthError],
    },
  },
  {
    id: 7,
    // This name is in lower case on purpose, to verify sorting is case-insensitive
    name: 'anakin skywalker',
    universe: 'Star Wars',
    birthplace: 'TT',
    salary: 15,
  },
  {
    id: 8,
    name: 'Melisandre',
    universe: 'Song of Ice and Fire',
    // unknown birthplace
    age: 1022,
    salary: 0,
  },
];
export const exampleRows = rows;

const addressRows = [
  { id: 9, name: 'Johnny Canuck', country: 'CA', state: 'BC' },
  ...rows.map(row => ({ name: row.name, id: row.id })),
];

const createStormtrooper = (id: number) => ({
  id,
  name: `Clone Trooper ${id}`,
  universe: 'Star Wars',
  birthplace: 'KM',
  salary: 10,
});

const DefaultExample = () => (
  <EditableTable<Row>
    getRowKey={row => row.id}
    rows={rows}
    validationSchema={{ name: Yup.string().required('Name is required') }}
  >
    <EditableTable.Column width={2 / 8} fieldKey="universe" headerLabel="Universe" spanByFieldKey />
    <EditableTable.InputColumn<Row> width={3 / 8} fieldKey="name" headerLabel="Name" />
    <EditableTable.SelectColumn<Row, LocationKey>
      fieldKey="birthplace"
      headerLabel="Birth Location"
      getOptionText={o => locations[o]}
      width={3 / 8}
    >
      {(row, rowIndex, { SelectOption }) =>
        locationMap[row.universe].map(locationKey => <SelectOption key={locationKey} option={locationKey} />)
      }
    </EditableTable.SelectColumn>
  </EditableTable>
);

const AddressExample = () => (
  <EditableTable<AddressRow>
    getRowKey={row => row.id}
    rows={addressRows}
    validationSchema={{
      postalCode: generatePostalCodeSchema('country', 'Please enter a valid zip/postal code'),
      state: generateValidStateProvinceSchema('country', 'Please enter a valid state/province'),
    }}
  >
    <EditableTable.InputColumn<AddressRow> fieldKey="name" headerLabel="Name" />
    <EditableTable.InputColumn<AddressRow> fieldKey="line1" headerLabel="Address line 1" />
    <EditableTable.InputColumn<AddressRow> fieldKey="city" headerLabel="City" />
    <EditableTable.CountryColumn<AddressRow> fieldKey="country" headerLabel="Country" />
    <EditableTable.StateColumn<AddressRow> fieldKey="state" countryFieldKey="country" headerLabel="State" />
    <EditableTable.PostalCodeColumn<AddressRow> fieldKey="postalCode" headerLabel="Postal code/ZIP" />
  </EditableTable>
);

const ColumnTypesExample = () => (
  <EditableTable<Row> getRowKey={row => row.id} rows={rows}>
    <EditableTable.InputColumn<Row> width={300} fieldKey="name" headerLabel="Name" />
    <EditableTable.Column fieldKey="universe" headerLabel="Universe" />
    <EditableTable.NumberColumn<Row> fieldKey="age" headerLabel="Age" />
    <EditableTable.MoneyColumn<Row> fieldKey="salary" headerLabel="Salary" />
    <EditableTable.DateColumn<Row> fieldKey="birthDate" headerLabel="DOB" />
    <EditableTable.TimeColumn<Row> fieldKey="birthTime" headerLabel="Birth Time" />
    {/* This time column is for testing disable dropdown */}
    <EditableTable.TimeColumn<Row> fieldKey="startTime" headerLabel="Time In" disableDropdown />
    <EditableTable.PhoneColumn<Row> fieldKey="phone" headerLabel="Phone" allowInternational />
    <EditableTable.InputColumn<Row> fieldKey="email" headerLabel="Email" type="email" />
    <EditableTable.SelectColumn<Row, LocationKey>
      fieldKey="birthplace"
      headerLabel="Birth Location"
      placeholder="Select a birth location"
      getOptionText={o => locations[o]}
    >
      {(row, rowIndex, { SelectOption }) =>
        locationMap[row.universe].map(locationKey => <SelectOption key={locationKey} option={locationKey} />)
      }
    </EditableTable.SelectColumn>
    <EditableTable.TextareaColumn<Row> fieldKey="comments" headerLabel="Comments" />
  </EditableTable>
);

export const getFullInputColumnSet = (options: { setColumnsReadOnly?: boolean } = {}) => (
  <>
    <EditableTable.InputColumn<Row> isFixed fieldKey="name" headerLabel="Name" readOnly={options.setColumnsReadOnly} />
    <EditableTable.NumberColumn<Row> fieldKey="age" headerLabel="Age" readOnly={() => options.setColumnsReadOnly} />
    <EditableTable.MoneyColumn<Row> fieldKey="salary" headerLabel="Salary" readOnly={options.setColumnsReadOnly} />
    <EditableTable.DateColumn<Row> fieldKey="birthDate" headerLabel="DOB" readOnly={() => options.setColumnsReadOnly} />
    <EditableTable.TimeColumn<Row> fieldKey="birthTime" headerLabel="Time" readOnly={options.setColumnsReadOnly} />
    <EditableTable.SelectColumn<Row, LocationKey>
      fieldKey="birthplace"
      headerLabel="Birth Location"
      getOptionText={o => locations[o]}
      readOnly={options.setColumnsReadOnly}
    >
      {(row, rowIndex, { SelectOption }) =>
        locationMap[row.universe].map(locationKey => <SelectOption key={locationKey} option={locationKey} />)
      }
    </EditableTable.SelectColumn>
    <EditableTable.CountryColumn<AddressRow>
      fieldKey="country"
      headerLabel="Country"
      readOnly={options.setColumnsReadOnly}
    />
    <EditableTable.StateColumn<AddressRow>
      fieldKey="state"
      countryFieldKey="country"
      headerLabel="State"
      readOnly={options.setColumnsReadOnly}
    />
    <EditableTable.PostalCodeColumn<AddressRow>
      fieldKey="postalCode"
      headerLabel="Postal code/ZIP"
      readOnly={options.setColumnsReadOnly}
    />
  </>
);

const getExtraColumns = (numColumns = 20) =>
  range(numColumns).map(x => (
    <EditableTable.InputColumn<any> key={x} width={150} fieldKey={`field-${x}`} headerLabel={`Field ${x}`} />
  ));

type DataSavingExampleProps = {
  initialRows?: Row[];
  extraColumns?: number;
  firstNewId?: number;
  gridId?: string;
  openByDefault?: boolean;
};

type DataSavingExampleState = {
  rows: Row[];
  nextId: number;
  isShown: boolean;
  updateTime?: number;
  readOnly: boolean;
};

export class DataSavingExample extends React.Component<DataSavingExampleProps, DataSavingExampleState> {
  static defaultProps = {
    initialRows: rows,
    firstNewId: rows.length + 1,
    openByDefault: true,
  };

  state: DataSavingExampleState = {
    rows: this.props.initialRows,
    isShown: this.props.openByDefault,
    nextId: this.props.firstNewId,
    readOnly: false,
  };

  updateStartTime: number;

  toggleTable = () => {
    this.setState(state => ({
      isShown: !state.isShown,
    }));
  };

  toggleReadOnly = () => {
    this.setState(state => ({
      readOnly: !state.readOnly,
    }));
  };

  createStormtrooper = () => {
    this.setState(state => ({
      rows: [...state.rows, createStormtrooper(state.nextId)],
      nextId: state.nextId + 1,
    }));
  };

  removeRow = () => {
    this.setState(state => ({
      rows: state.rows.slice(0, state.rows.length - 1),
    }));
  };

  validateLukeAndLeiaRows = (rows: Row[]) => {
    const lukeId = 5;
    const leiaId = 6;
    const lukeRow = rows.find(({ id }) => id === lukeId);
    const leiaRow = rows.find(({ id }) => id === leiaId);

    if (
      lukeRow.birthDate !== leiaRow.birthDate ||
      lukeRow.birthTime !== leiaRow.birthTime ||
      lukeRow.birthplace !== leiaRow.birthplace ||
      lukeRow.age !== leiaRow.age
    ) {
      lukeRow.errors[EditableTable.ROW_ERROR_KEY] = [lukeLeiaBirthError];
      leiaRow.errors[EditableTable.ROW_ERROR_KEY] = [lukeLeiaBirthError];
    } else {
      lukeRow.errors[EditableTable.ROW_ERROR_KEY] = [];
      leiaRow.errors[EditableTable.ROW_ERROR_KEY] = [];
    }
  };

  updateRow = (newRow: Row) => {
    setTimeout(() => {
      this.setState(state => ({
        rows: produce(state.rows, rowsDraft => {
          rowsDraft.forEach((row: Row, index: number) => {
            if (row.id === newRow.id) {
              rowsDraft[index] = newRow;
            }
          });

          this.validateLukeAndLeiaRows(rowsDraft);
        }),
      }));
    }, 500);
  };

  componentDidUpdate = (prevProps: DataSavingExampleProps, prevState: DataSavingExampleState) => {
    if (this.state.updateTime === prevState.updateTime) {
      this.setState({
        updateTime: new Date().getTime() - this.updateStartTime,
      });
    }
  };

  render() {
    const { extraColumns } = this.props;
    this.updateStartTime = new Date().getTime();

    return (
      <>
        <Box pb={2}>{this.state.updateTime && `Updated in ${this.state.updateTime}ms`}</Box>
        <Button onClick={this.toggleTable} mr={2}>
          {this.state.isShown ? 'Unmount Table' : 'Mount Table'}
        </Button>
        <Button onClick={this.createStormtrooper} mr={2} mb={2}>
          Add Stormtrooper
        </Button>
        <Button onClick={this.removeRow} mr={2}>
          Remove Row
        </Button>

        <Button onClick={this.toggleReadOnly}>Toggle Read-Only Mode</Button>
        {this.state.isShown && (
          <DataManager<Row>
            sourceData={this.state.rows}
            selectionKey="id"
            render={() => (
              <EditableTable<Row>
                getRowKey={row => row.id}
                validationSchema={{
                  name: Yup.string().required('Name is required'),
                  birthplace: Yup.string().required('Birthplace is required'),
                }}
                validateRow={({ row, editErrors }) => {
                  editErrors(errors => {
                    // TODO should the column unformat the number for us?
                    const age =
                      typeof row['age'] === 'string' ? Number((row['age'] as any).replace(/,/g, '')) : row['age'];
                    errors['age'] =
                      age && age >= 100 ? [{ key: 'ageMax', message: 'Age must be less than or equal 100' }] : [];
                  });
                }}
                readOnly={this.state.readOnly}
                gridId={this.props.gridId}
                saveHandler={({ row, editErrors }) =>
                  new Promise(resolve => {
                    // Simulating network delay
                    setTimeout(() => {
                      editErrors(errors => {
                        // We need to ensure that we aren't clobbering other errors on this field
                        // TODO add a helper to remove some of this boilerplate
                        errors['birthplace'] = errors['birthplace'] || [];
                        if (row['name'] === 'Luke Skywalker' && row['birthplace'] !== locations.TT) {
                          const errorExists = errors['birthplace'].some(error => error.key === 'lukeMustBeOnTattoine');
                          if (!errorExists) {
                            errors['birthplace'].push({
                              key: 'lukeMustBeOnTattoine',
                              message: 'Luke must be born on Tattoine',
                            });
                          }
                        } else {
                          errors['birthplace'] = errors['birthplace'].filter(
                            error => error.key !== 'lukeMustBeOnTattoine',
                          );
                        }
                      });

                      this.updateRow(row);
                      resolve();
                    }, 500);
                  })
                }
              >
                <EditableTable.StatusColumn isFixed />
                <EditableTable.RowSelectionColumn isFixed />
                {getFullInputColumnSet()}
                <EditableTable.Column<Row> headerLabel="Universe" fieldKey="universe" />
                <EditableTable.IconColumn<Row>
                  iconName="eye"
                  headerLabel="Example Icon Header"
                  getAriaLabelForCellIcon={row => `Example popover icon for ${row.name}`}
                  popover={{
                    getTitle: () => 'Example Popover Title',
                    getBody: ({ row }) => (
                      <Box px={3} pb={3}>
                        Example Popover Body for {row.name}
                      </Box>
                    ),
                  }}
                />
                {extraColumns && getExtraColumns(extraColumns)}
              </EditableTable>
            )}
          />
        )}
      </>
    );
  }
}

const SmallDataSavingExample = () => <DataSavingExample />;

const getExtraRows = (numRows: number, idStart: number) => range(idStart, idStart + numRows).map(createStormtrooper);
const LargeDataSavingExample = () => (
  <Form initialValues={{ extraRows: 20, extraColumns: 20 }} onSubmit={() => {}}>
    {({ values }) => (
      <>
        <FormNumberInput label="Number of extra rows" name="extraRows" w={[1, 1 / 2, 1 / 3]} />
        <FormNumberInput label="Number of extra columns" name="extraColumns" w={[1, 1 / 2, 1 / 3]} />
        <DataSavingExample
          // passing key here to unmount the table when inputs change
          // Recreating table after each keystroke is too expensive
          key={`${values.extraRows}-${values.extraColumns}`}
          initialRows={rows.concat(getExtraRows(values.extraRows, rows.length + 1))}
          extraColumns={values.extraColumns}
          firstNewId={rows.length + values.extraRows + 1}
          openByDefault={false}
        />
      </>
    )}
  </Form>
);

// TODO this example doesn't use the final Datagrid schema yet since it's not complete. Will update once it's done
const datagridQuery = gql`
  query EditableTableStoryDatagridQuery($id: ID!) {
    datagrid(id: $id) {
      id
      rows {
        id
        timestamp
        data
        errors
      }
      columnConfiguration {
        id
        label
        type
        category {
          key
          label
        }
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
      }
    }
  }
`;

const updateRowsMutation = gql`
  mutation EditableTableStoryUpdateRows($datagridId: ID!, $rows: [DatagridRowInput!]!) {
    saveDatagridRows(datagridId: $datagridId, rows: $rows) {
      id
      timestamp
      data
      errors
    }
  }
`;

type GraphqlRow = {
  id: string;
  errors: DatagridRow['errors'];
  [key: string]: string;
};

const columnTypeToColumnComponent: { [key: string]: React.ComponentType<any> } = {
  decimal: EditableTable.NumberColumn,
  integer: EditableTable.NumberColumn,
  email: EditableTable.InputColumn,
  money: EditableTable.MoneyColumn,
  string: EditableTable.InputColumn,
};

const columnConfigurationToValidationType: { [key: string]: ValidationDataType } = {
  string: 'string',
  email: 'string',
  integer: 'number',
  decimal: 'number',
  money: 'number',
};

function getValidationSchema(columnConfiguration: EditableTableStoryDatagridQuery.ColumnConfiguration[]) {
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

class GraphqlExample extends React.Component<{}, { rows: Row[]; nextId: number }> {
  serializeRow(row: any) {
    return Object.entries(row).reduce(
      (res, [key, val]) => {
        if (key !== 'errors' && key !== 'id') {
          res.data[key] = val;
        }
        return res;
      },
      { id: row.id, data: {} } as any,
    );
  }

  render() {
    return (
      <Query<EditableTableStoryDatagridQuery.Query, EditableTableStoryDatagridQuery.Variables>
        variables={{ id: '1' }}
        query={datagridQuery}
      >
        {({ data }) => {
          return (
            <>
              <SaveFailedErrorBanner<GraphqlRow>
                getRecordKey={row => row.id}
                getFailureLabel={row => `${row.first_name} ${row.last_name}`}
                onRetry={failures =>
                  getApollo().mutate({
                    mutation: updateRowsMutation,
                    variables: { datagridId: data.datagrid.id, rows: [failures] },
                  })
                }
                mb={2}
              />
              <DataManager<GraphqlRow>
                sourceData={
                  data.datagrid && data.datagrid.rows.map(row => ({ id: row.id, errors: row.errors, ...row.data }))
                }
                selectionKey="id"
                render={() => (
                  <EditableTable<GraphqlRow>
                    validationSchema={getValidationSchema(data.datagrid.columnConfiguration)}
                    getRowKey={row => row.id}
                    bulkActions={({ selectionsCount: count }) => (
                      <IconButton iconName="delete" mr={2} onClick={() => {}}>
                        Delete ({count})
                      </IconButton>
                    )}
                    saveHandler={({ row }) => {
                      const serializedRow = this.serializeRow(row);
                      return getApollo().mutate({
                        mutation: updateRowsMutation,
                        variables: { datagridId: data.datagrid.id, rows: [serializedRow] },
                      });
                    }}
                  >
                    <EditableTable.StatusColumn />
                    <EditableTable.RowSelectionColumn />
                    {data.datagrid.columnConfiguration.map(
                      (configuration: EditableTableStoryDatagridQuery.ColumnConfiguration) => {
                        const Component = columnTypeToColumnComponent[configuration.type];
                        return (
                          <Component
                            key={configuration.id}
                            fieldKey={configuration.id}
                            headerLabel={configuration.label}
                          />
                        );
                      },
                    )}
                  </EditableTable>
                )}
              />
            </>
          );
        }}
      </Query>
    );
  }
}

type DynamicColumnsState = {
  rows: Row[];
  showExtraColumn: boolean;
  extraColumn: 'birthplace' | 'age';
};

export class DynamicColumnsExample extends React.Component<{}, DynamicColumnsState> {
  state = { rows, showExtraColumn: true, extraColumn: 'birthplace' as 'birthplace' };

  updateRow = (newRow: Row) => {
    setTimeout(() => {
      this.setState(state => ({
        rows: state.rows.map(row => {
          if (newRow.id === row.id) {
            return newRow;
          } else {
            return row;
          }
        }),
      }));
    }, 500);
  };

  toggleExtraColumn = () => {
    this.setState(prevState => ({
      showExtraColumn: !prevState.showExtraColumn,
    }));
  };

  toggleColumnType = () => {
    this.setState(prevState => ({
      extraColumn: prevState.extraColumn === 'birthplace' ? 'age' : 'birthplace',
    }));
  };

  render() {
    const { showExtraColumn, extraColumn } = this.state;

    const columns = ['name', 'universe'];
    if (showExtraColumn) {
      columns.push(extraColumn);
    }

    return (
      <>
        <Button onClick={this.toggleExtraColumn} mr={2} mb={2}>
          Toggle Dynamic Column
        </Button>
        {showExtraColumn && (
          <Button onClick={this.toggleColumnType} mr={2} mb={2}>
            {extraColumn === 'birthplace' ? 'Show Age' : 'Show Birthplace'}
          </Button>
        )}
        <DataManager<Row>
          sourceData={this.state.rows}
          selectionKey="id"
          initialPageSize="s"
          render={() => (
            <EditableTable<Row>
              getRowKey={row => row.id}
              saveHandler={({ row }) =>
                new Promise(resolve => {
                  // Simulating network delay
                  setTimeout(() => {
                    this.updateRow(row);
                    resolve();
                  }, 500);
                })
              }
              validateRow={({ row, editErrors }) => {
                editErrors(errors => {
                  errors['name'] = row['name'] ? [] : [{ key: 'required', message: 'This field is required' }];
                });
              }}
            >
              {columns.map(column => {
                return (
                  <EditableTable.InputColumn<Row>
                    isFixed={column === 'name'}
                    key={column}
                    fieldKey={column as any}
                    headerLabel={column}
                  />
                );
              })}
            </EditableTable>
          )}
        />
      </>
    );
  }
}

type EditableTableLayoutExampleState = {
  data: Row[];
};

class EditableTableLayoutExample extends React.Component<{}, EditableTableLayoutExampleState> {
  state = {
    data: rows,
  };

  render() {
    const { data } = this.state;
    return (
      <>
        <DataManager<Row>
          sourceData={data}
          selectionKey="name"
          initialPageSize="xs"
          render={({ sections }) => (
            <DataLayout
              title="Editable Table in DataLayout"
              actions={() => (
                <>
                  <IconButton iconName="search" aria-label="Search" onClick={() => {}}>
                    Search
                  </IconButton>
                  <IconButton iconName="settings" aria-label="Edit table settings" onClick={() => {}}>
                    Settings
                  </IconButton>
                </>
              )}
              main={
                <EditableTable<Row> getRowKey={row => row.id}>
                  <EditableTable.InputColumn<Row> width={150} fieldKey="name" headerLabel="Character name" />
                  <EditableTable.Column fieldKey="universe" headerLabel="Universe" />
                  <EditableTable.NumberColumn<Row> fieldKey="age" headerLabel="Age" width={110} />
                  <EditableTable.MoneyColumn<Row> fieldKey="salary" headerLabel="Salary" />
                  <EditableTable.DateColumn<Row> fieldKey="birthDate" headerLabel="DOB" />
                  <EditableTable.TimeColumn<Row> fieldKey="birthTime" headerLabel="Birth Time" />
                  <EditableTable.SelectColumn<Row, LocationKey>
                    fieldKey="birthplace"
                    headerLabel="Birth Location"
                    getOptionText={o => locations[o]}
                  >
                    {(row, rowIndex, { SelectOption }) =>
                      locationMap[row.universe].map(locationKey => (
                        <SelectOption key={locationKey} option={locationKey} />
                      ))
                    }
                  </EditableTable.SelectColumn>
                  <EditableTable.DigitColumn<Row> fieldKey="digitId" headerLabel="Digit ID" />
                </EditableTable>
              }
              addRowButton={<IconButton iconName="plus-circle">Add Row</IconButton>}
              pager={<DataPager />}
              footer={<FormFooter primaryText="Save" />}
            />
          )}
        />
      </>
    );
  }
}

const BulkSelectedExample = () => (
  <DataManager<Row>
    sourceData={rows}
    selectionKey="name"
    initialSelections={new Set(['Fred Flintstone'])}
    render={() => (
      <DialogManager
        render={dialog => {
          const modalProps = {
            title: 'Delete Employees',
            submitActionText: 'Delete',
            onSubmit: () => {
              // perform delete
              dialog.close();
            },
            onCancel: dialog.close,
            isVisible: dialog.isVisible,
            controlEl: dialog.controlEl,
          };

          return (
            <EditableTable<Row>
              getRowKey={row => row.id}
              bulkActions={({ selectionsCount: count }) => (
                <>
                  <ConfirmationModal
                    content={`Are you sure you want to delete ${count} selected employees?`}
                    {...modalProps}
                  />
                  <IconButton iconName="delete" mr={2} onClick={dialog.open}>
                    Delete ({count})
                  </IconButton>
                  <IconButton iconName="download" onClick={() => {}}>
                    Export ({count})
                  </IconButton>
                </>
              )}
            >
              <EditableTable.StatusColumn isFixed />
              <EditableTable.RowSelectionColumn isFixed />
              <EditableTable.InputColumn<Row> isFixed fieldKey="name" headerLabel="Name" />
              <EditableTable.NumberColumn<Row> fieldKey="age" headerLabel="Age" width={70} />
              <EditableTable.MoneyColumn<Row> fieldKey="salary" headerLabel="Salary" />
              <EditableTable.DateColumn<Row> fieldKey="birthDate" headerLabel="DOB" />
            </EditableTable>
          );
        }}
      />
    )}
  />
);

export class MarkDeletionsExample extends React.Component<{}, { rows: Row[] }> {
  state = { rows };

  changeRowsStatus = (selections: any, status: 'active' | 'deleted') => {
    return new Promise(resolve => {
      this.setState(state => {
        const newRows = state.rows.map(row => {
          if (selections.includes(row.name)) {
            return {
              ...row,
              deleted: status === 'deleted',
            };
          } else {
            return row;
          }
        });

        return {
          rows: newRows,
        };
      }, resolve);
    });
  };

  markRowsActive = (selections: any) => {
    this.changeRowsStatus(selections, 'active');
  };

  markRowsDeleted = (selections: any) => {
    this.changeRowsStatus(selections, 'deleted');
  };

  render() {
    const { rows } = this.state;
    return (
      <DataManager<Row>
        sourceData={rows}
        selectionKey="name"
        render={() => (
          <EditableTable<Row>
            hasRowBeenDeleted={row => row.deleted}
            getRowKey={row => row.id}
            bulkActions={({ selections, refreshData }) => (
              <IconButton
                iconName="delete"
                mr={2}
                onClick={async () => {
                  await this.markRowsDeleted(selections);
                  refreshData();
                }}
              >
                Mark Deleted
              </IconButton>
            )}
          >
            {({ refreshData }) => {
              return (
                <>
                  <EditableTable.RowSelectionColumn isFixed key="selection-column" />
                  {getFullInputColumnSet()}
                  <EditableTable.Column<Row> headerLabel="Deleted?">
                    {({ row }) => (row.deleted ? 'Deleted' : 'Active')}
                  </EditableTable.Column>
                  <EditableTable.Column<Row> headerLabel="Universe">
                    {({ row }) =>
                      row.deleted ? <div className="deleted-cell-content">{row.universe}</div> : row.universe
                    }
                  </EditableTable.Column>

                  <EditableTable.IconColumn<Row>
                    headerLabel="Edit"
                    getAriaLabelForCellIcon={row => `Delete ${row.name}`}
                    iconName="edit"
                    isDisabled={row => row.deleted}
                    onClick={action('example edit action')}
                  />

                  <EditableTable.IconColumn<Row>
                    headerLabel="Delete Example 2"
                    getAriaLabelForCellIcon={row => `Delete ${row.name}`}
                    iconName={({ row, isHeader }) => (isHeader || !row.deleted ? 'delete' : 'undo')}
                    onClick={async ({ row }) => {
                      if (row.deleted) {
                        await this.markRowsActive([row.name]);
                      } else {
                        await this.markRowsDeleted([row.name]);
                      }
                      refreshData();
                    }}
                  />
                </>
              );
            }}
          </EditableTable>
        )}
      />
    );
  }
}

export const ServerErrorExample = () => (
  <SaveStateManager>
    <SaveFailedErrorBanner<GraphqlRow>
      getRecordKey={row => row.id}
      getFailureLabel={row => row.name}
      onRetry={failures =>
        new Promise(resolve => {
          const resolveFailures = () => {
            resolve(failures.filter((failure, i) => i % 2));
          };

          // Simulate network latency
          setTimeout(resolveFailures, 500);
        })
      }
      mb={2}
    />
    <EditableTable<Row>
      getRowKey={row => row.id}
      rows={rows}
      saveHandler={() => {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            reject();
          }, 500);
        });
      }}
    >
      <EditableTable.StatusColumn />
      <EditableTable.InputColumn<Row> width={3 / 8} fieldKey="name" headerLabel="Name" />
      <EditableTable.SelectColumn<Row, LocationKey>
        fieldKey="birthplace"
        headerLabel="Birth Location"
        getOptionText={o => locations[o]}
        width={3 / 8}
      >
        {(row, rowIndex, { SelectOption }) =>
          locationMap[row.universe].map(locationKey => <SelectOption key={locationKey} option={locationKey} />)
        }
      </EditableTable.SelectColumn>
    </EditableTable>
  </SaveStateManager>
);

type EggPreparation = 'Scrambled' | 'Over Easy' | 'Poached' | 'Sunny Side Up';
export const eggPreparations: EggPreparation[] = ['Scrambled', 'Over Easy', 'Poached', 'Sunny Side Up'];
type MealOption = 'Egg Plate' | 'French Toast';
const mealOptions: MealOption[] = ['Egg Plate', 'French Toast'];
export const mealOptionMap: {
  [key: string]: MealOption;
} = {
  eggPlate: 'Egg Plate',
  frenchToast: 'French Toast',
};

export const DependentColumnExample = (props: { id?: string }) => {
  type MealOptionRow = {
    id: number;
    meal: MealOption;
    eggPreparation: EggPreparation;
  };

  const rows: MealOptionRow[] = [
    {
      id: 1,
      meal: 'Egg Plate',
      eggPreparation: 'Scrambled',
    },
    {
      id: 2,
      meal: 'French Toast',
      eggPreparation: null,
    },
  ];

  return (
    <EditableTable<MealOptionRow>
      gridId={props.id}
      getRowKey={row => row.id}
      rows={rows}
      validationSchema={{ name: Yup.string().required('Name is required') }}
    >
      <EditableTable.SelectColumn<MealOptionRow, MealOption>
        fieldKey="meal"
        headerLabel="Meal"
        getOptionText={o => o}
        onChange={({ change, setValue }) => {
          if (change.newValue === mealOptionMap.frenchToast) {
            setValue('eggPreparation', null);
          } else if (change.newValue === mealOptionMap.eggPlate) {
            setValue('eggPreparation', 'Scrambled');
          }
        }}
      >
        {(row, rowIndex, { SelectOption }) =>
          mealOptions.map(mealOption => <SelectOption key={mealOption} option={mealOption} />)
        }
      </EditableTable.SelectColumn>
      <EditableTable.SelectColumn<MealOptionRow, string>
        fieldKey="eggPreparation"
        headerLabel="Egg Preparation"
        getOptionText={o => o}
        readOnly={row => row.meal !== 'Egg Plate'}
      >
        {(row, rowIndex, { SelectOption }) =>
          eggPreparations.map(preparation => <SelectOption key={preparation} option={preparation} />)
        }
      </EditableTable.SelectColumn>
    </EditableTable>
  );
};
