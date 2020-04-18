import * as Yup from 'yup';
import React from 'react';
import { range } from 'lodash';
import { BrowserRouter as Router } from 'react-router-dom';

import { mount } from 'z-frontend-theme/test-utils/cypress';
import { DataManager } from 'z-frontend-data-manager';
import { Box } from 'zbase';

import EditableTable, { EditableTableProps } from '../../src/editable-table/EditableTable';
import { mealOptionMap, DependentColumnExample } from '../../src/editable-table/EditableTable.stories';
import SaveFailedErrorBanner from '../../src/editable-table/SaveFailedErrorBanner';
import SaveStateManager from '../../src/editable-table/SaveStateManager';
import { Errors, RowStateContext } from '../../src/editable-table/EditableRow';
import { KEY_CODES } from '../../src/GridAccessibilityProvider';

type Row = {
  id: number;
  inputField: string;
  inputField2: string;
  selectField: string;
  customField: string;
  deleted?: boolean;
  errors?: Errors;
};

const rows = [
  {
    id: 1,
    inputField: 'input-0',
    inputField2: '',
    selectField: 'option-0',
    customField: 'foo',
  },
  {
    id: 2,
    inputField: 'input-1',
    inputField2: '',
    selectField: 'option-1',
    customField: 'bar',
  },
  {
    id: 3,
    inputField: 'input-2',
    inputField2: '',
    selectField: 'option-2',
    customField: 'baz',
  },
];

const gridTestId = 'grid-test-id';

class TestExample extends React.Component<Partial<EditableTableProps<Row>>> {
  render() {
    return (
      <EditableTable<Row>
        rows={rows}
        gridId={gridTestId}
        getRowKey={row => row.id}
        validateRow={({ row, editErrors }) => {
          editErrors(errors => {
            errors['inputField'] = row['inputField'] ? [] : [{ key: 'required', message: 'This field is required' }];
          });
        }}
        validationSchema={{
          selectField: Yup.string().required(),
        }}
        {...this.props}
      >
        <EditableTable.StatusColumn />
        <EditableTable.InputColumn<Row> width={200} fieldKey="inputField" headerLabel="Input Field" />
        <EditableTable.InputColumn<Row> width={200} fieldKey="inputField2" headerLabel="Input Field 2" />
        <EditableTable.Column<Row> width={200} headerLabel="Read Only Field">
          {({ row, rowIndex }) => <Box>{`${row.customField}-${rowIndex}`}</Box>}
        </EditableTable.Column>
        <EditableTable.SelectColumn<Row, string>
          width={200}
          fieldKey="selectField"
          headerLabel="Select Field"
          getOptionText={o => o}
        >
          {(row, rowIndex, { SelectOption }) =>
            range(0, 3).map(integer => <SelectOption key={integer.toString()} option={`option-${integer}`} />)
          }
        </EditableTable.SelectColumn>
      </EditableTable>
    );
  }
}

const blankRowProps = {
  inputField: '',
  inputField2: '',
  selectField: '',
  customField: '',
};

const rowsWithErrors = [
  {
    ...blankRowProps,
    id: 1,
    errors: {
      inputField: [{ key: 'inputFieldError1', message: 'inputFieldError1' }],
      inputField2: [{ key: 'inputFieldError2', message: 'inputFieldError2' }],
      selectField: [{ key: 'selectFieldError', message: 'selectFieldError' }],
      [EditableTable.ROW_ERROR_KEY]: [
        { key: 'rowError1', message: 'rowErrorMessage1' },
        { key: 'rowError2', message: 'rowErrorMessage2' },
        { key: 'rowError3', message: 'rowErrorMessage3' },
      ],
    },
  },
  {
    ...blankRowProps,
    id: 2,
    errors: {
      [EditableTable.ROW_ERROR_KEY]: [
        { key: 'rowError1', message: 'rowErrorMessage1' },
        { key: 'rowError2', message: 'rowErrorMessage2' },
        { key: 'rowError3', message: 'rowErrorMessage3' },
        { key: 'rowError4', message: 'rowErrorMessage4' },
      ],
    },
  },
  {
    ...blankRowProps,
    deleted: true,
    id: 3,
    errors: {
      inputField: [{ key: 'inputFieldError1', message: 'inputFieldError1' }],
    },
  },
];

describe('EditableTable', () => {
  it('Row and field errors are displayed in status popover correctly', () => {
    mount(
      <TestExample
        rows={rowsWithErrors}
        validationSchema={{}}
        validateRow={() => {}}
        hasRowBeenDeleted={r => r.deleted}
      />,
    );
    cy.findByLabelText('Open status popover for row 1').click();
    [
      '6 Errors in This Row',
      'Fields with errors:',
      'Input Field, Input Field 2, Select Field',
      'Other errors:',
      'rowErrorMessage1',
      'rowErrorMessage2',
      'rowErrorMessage3',
    ].forEach(textQuery => {
      cy.findByText(textQuery);
    });

    cy.findByLabelText('Close').click();
    cy.findByLabelText('Open status popover for row 2').click();
    ['4 Errors in This Row', 'Errors:', 'rowErrorMessage1', '2 additional errors'].forEach(textQuery => {
      cy.findAllByText(textQuery)[0]; // looking for one or more
    });

    // Must close popover to work around issue where it is being displayed as full screen and blocking the table
    cy.findByLabelText('Close').click();

    cy.get('#grid-test-id-cell-1-1').trigger('mouseover');
    cy.get('#grid-test-id-cell-1-1 input').trigger('mouseover');
    cy.findByText('inputFieldError1');

    cy.findByLabelText('Row 3 has been deleted').click();
    cy.queryAllByText('Errors:').should('have.length', 0);
  });

  it('Errors should not be shown on read-only rows', () => {
    mount(<TestExample rows={rowsWithErrors} validationSchema={{}} validateRow={() => {}} readOnly />);
    cy.get('#grid-test-id-cell-1-1').trigger('mouseover');
    cy.queryAllByText('selectFieldError').should('have.length', 0);

    cy.get('#grid-test-id-cell-1-4').trigger('mouseover');
    cy.queryAllByText('selectFieldError').should('have.length', 0);
  });

  it('Displays errors when save promise fails', () => {
    let numRetries = 0;
    mount(
      <SaveStateManager>
        <SaveFailedErrorBanner<Row>
          getRecordKey={row => row.id}
          getFailureLabel={row => `Row ${row.id}`}
          onRetry={failures => {
            numRetries += 1;
            return numRetries === 1 ? Promise.reject() : Promise.resolve();
          }}
          mb={2}
        />
        <TestExample
          getRowKey={row => row.id}
          rows={rows}
          saveHandler={() => {
            return Promise.reject();
          }}
        />
      </SaveStateManager>,
    );
    cy.get('#grid-test-id').focus();
    cy.get('#grid-test-id').trigger('keydown', { keyCode: KEY_CODES.DOWN_ARROW });
    cy.get('#grid-test-id').trigger('keydown', { keyCode: KEY_CODES.RIGHT_ARROW });

    // Edit First Field
    cy.get('#grid-test-id-cell-1-1 input').focus();
    cy.get('#grid-test-id-cell-1-1 input').type('hello world');
    cy.get('#grid-test-id').trigger('keydown', { keyCode: KEY_CODES.ESC });

    // Edit Second Field
    cy.get('#grid-test-id').trigger('keydown', { keyCode: KEY_CODES.DOWN_ARROW });
    cy.get('#grid-test-id-cell-2-1 input').focus();
    cy.get('#grid-test-id-cell-2-1 input').type('hello world');
    cy.get('#grid-test-id').trigger('keydown', { keyCode: KEY_CODES.ESC });

    // First retry should not clear errors
    cy.findByText('2 records');
    cy.findByText('reload page.');
    cy.findByText('retry failures').click();

    // Second retru should clear errors;
    cy.findByText('2 records');
    cy.findByText('reload page.');
    cy.findByText('retry failures').click();
  });

  it('Only re-renders cells when row is updated', () => {
    let updateCount = 0;

    const UpdateCounterExample = () => {
      // const [dynamicRows, updateRows] = useState(rows);
      return (
        <EditableTable getRowKey={row => row.id} rows={rows.slice(0, 2)} gridId={gridTestId}>
          <EditableTable.InputColumn<Row> fieldKey="inputField" headerLabel="Input Field" />
          <EditableTable.Column<Row> headerLabel="Update counter">
            {({ rowIndex, columnIndex }) => (
              <RowStateContext.Consumer>
                {rowState => {
                  updateCount += 1;
                  return <div id={`cell-update-counter-${rowIndex}-${columnIndex}`}>{updateCount}</div>;
                }}
              </RowStateContext.Consumer>
            )}
          </EditableTable.Column>
        </EditableTable>
      );
    };

    mount(<UpdateCounterExample />);

    cy.get('#cell-update-counter-2-1').findByText('2');

    cy.get('#grid-test-id').focus();
    cy.get('#grid-test-id').trigger('keydown', { keyCode: KEY_CODES.DOWN_ARROW });

    // Edit First Field
    cy.get('#grid-test-id-cell-1-0 input').focus();
    cy.get('#grid-test-id-cell-1-0 input').type('hello world');
    cy.get('#grid-test-id').trigger('keydown', { keyCode: KEY_CODES.ESC });

    cy.get('#cell-update-counter-2-1').findByText('2');
  });

  it('columns can depend on other columns', () => {
    mount(<DependentColumnExample id={gridTestId} />);

    // Hover row so inputs will be on the dom
    cy.get('#grid-test-id-cell-1-1').trigger('mouseover');

    cy.get('#grid-test-id-cell-1-1').findByText('Scrambled');
    cy.get('#grid-test-id-cell-1-0 select').select(mealOptionMap.frenchToast);

    // At this point the first row, second column (egg prep selection) should be disabled
    cy.get('#grid-test-id-cell-1-1 select').should('not.exist');
    // The value should have been set to null, so Scrambled text won't appear in cell
    cy.get('#grid-test-id-cell-1-1')
      .queryAllByText('Scrambled')
      .should('have.length', 0);

    cy.get('#grid-test-id-cell-1-0 select').select(mealOptionMap.eggPlate);

    cy.get('#grid-test-id-cell-1-1 select');
    cy.get('#grid-test-id-cell-1-1').findByText('Scrambled');
  });

  describe('update blocking', () => {
    type BasicRow = {
      id: number;
      input: string;
    };

    const datasets = [
      [
        {
          id: 1,
          input: 'foo',
        },
      ],
      [
        {
          id: 1,
          input: 'bar',
        },
      ],
      [
        {
          id: 1,
          input: 'bar',
          errors: { input: ['errors updated'] },
        },
      ],
    ];

    type ExampleState = {
      datasetIndex: 0 | 1 | 2;
    };

    const toggleDatasetIndex = (state: ExampleState): ExampleState => ({
      datasetIndex: state.datasetIndex === 0 ? 1 : 0,
    });

    const toggleErrors = (state: ExampleState): ExampleState => ({
      datasetIndex: state.datasetIndex === 0 ? 2 : 0,
    });

    it('Values can be updated externally when not blocked by DataManager', () => {
      class ExternalDataUpdateExample extends React.Component<{}, ExampleState> {
        state = {
          datasetIndex: 0,
        } as ExampleState;

        render() {
          return (
            <div>
              <EditableTable<BasicRow> getRowKey={rows => rows.id} rows={datasets[this.state.datasetIndex]}>
                <EditableTable.InputColumn<BasicRow> fieldKey="input" headerLabel="input" />
              </EditableTable>
              <button
                onClick={() => {
                  this.setState(toggleDatasetIndex);
                }}
              >
                Change data
              </button>
            </div>
          );
        }
      }

      mount(<ExternalDataUpdateExample />);

      cy.findByText('foo');
      cy.findByText('Change data').click();
      cy.findByText('bar');
    });

    it('Values can be updated externally when not blocked by DataManager', () => {
      class DataManagerUpdateExample extends React.Component<{}, ExampleState> {
        state = {
          datasetIndex: 0,
        } as ExampleState;

        render() {
          return (
            <Router>
              <DataManager
                sourceData={datasets[this.state.datasetIndex]}
                render={() => (
                  <div>
                    <EditableTable<BasicRow> getRowKey={rows => rows.id}>
                      <EditableTable.InputColumn<BasicRow> fieldKey="input" headerLabel="input" />
                    </EditableTable>
                    <button
                      onClick={() => {
                        this.setState(toggleDatasetIndex);
                      }}
                    >
                      Change data
                    </button>
                  </div>
                )}
              />
            </Router>
          );
        }
      }

      mount(<DataManagerUpdateExample />);

      cy.findByText('foo');
      cy.findByText('Change data').click();
      cy.findByText('foo');
    });

    it('Error updates will not be blocked by data manager', () => {
      class ErrorsUpdateExample extends React.Component<{}, ExampleState> {
        state = {
          datasetIndex: 0,
        } as ExampleState;

        render() {
          return (
            <Router>
              <DataManager
                sourceData={datasets[this.state.datasetIndex]}
                render={() => (
                  <div>
                    <EditableTable<BasicRow> getRowKey={rows => rows.id}>
                      <EditableTable.StatusColumn />
                      <EditableTable.InputColumn<BasicRow> fieldKey="input" headerLabel="input" />
                    </EditableTable>
                    <button
                      onClick={() => {
                        this.setState(toggleErrors);
                      }}
                    >
                      Update Errors
                    </button>
                  </div>
                )}
              />
            </Router>
          );
        }
      }

      mount(<ErrorsUpdateExample />);

      cy.findByText('foo');
      cy.findByText('Update Errors').click();

      // Data update should be blocked by data manager
      cy.findByText('foo');

      // Error updates will be reflectd immediately
      cy.findByLabelText('Open status popover for row 1').click();
      cy.findByText('1 Error in This Row');
    });
  });
});
