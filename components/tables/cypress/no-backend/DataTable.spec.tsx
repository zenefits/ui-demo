import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import { mount } from 'z-frontend-theme/test-utils/cypress';
import { DataManager } from 'z-frontend-data-manager';
import { Box } from 'zbase';

import DataTable from '../../src/DataTable';
import Column from '../../src/DataTableColumn';

type Row = { color: string; spanned: string };

const rows: Row[] = [
  {
    color: 'red',
    spanned: 'test1',
  },
  {
    color: 'green',
    spanned: 'test1',
  },
  {
    color: 'blue',
    spanned: 'test2',
  },
  {
    color: 'orange',
    spanned: 'test2',
  },
  {
    color: 'pink',
    spanned: 'test3',
  },
];
const gridTestId = 'grid-test-id';

const TestExample = (props: { data: Row[] }) => (
  <Router>
    <DataManager<Row>
      sourceData={props.data}
      render={() => (
        <DataTable<Row> tableLayout="fixed" gridId={gridTestId}>
          <DataTable.Column<Row> width={1 / 3} headerLabel="Color" fieldKey="color" />
          <DataTable.Column<Row> width={1 / 3} headerLabel="Custom">
            {({ rowIndex, row }) => <Box>{`User ${rowIndex}'s favorite color is ${row.color}.`}</Box>}
          </DataTable.Column>
          <DataTable.Column<Row> width={1 / 3} headerLabel="Span" fieldKey="spanned" spanByFieldKey />
        </DataTable>
      )}
    />
  </Router>
);

describe('DataTable', () => {
  it('all cells are displayed', () => {
    mount(<TestExample data={rows} />);
    ['red', 'green', 'blue', 'orange', 'pink'].forEach((color, i) => {
      cy.findByText(color);
      cy.findByText(`User ${i + 1}'s favorite color is ${color}.`);
    });
    ['Color', 'Custom', 'Span'].forEach(title => {
      cy.findByText(title);
    });
    ['test1', 'test2', 'test3'].forEach(span => {
      cy.findAllByText(span).should('have.length', 1);
    });
  });

  it('displays empty state automatically', () => {
    mount(<TestExample data={[]} />);
    cy.findByText('No data to show.');
  });

  it('gracefully handles focus in empty state', () => {
    mount(
      <div>
        <button>previous button</button>
        <TestExample data={[]} />
        <button>next button</button>
      </div>,
    );

    cy.findByText('previous button')
      .focus()
      .tab();
    // TODO: upgrade cypress to 3.3.1 to allow this:
    // cy.findByText('next button').should('have.focus');
    cy.focused().should('have.text', 'next button');
  });

  describe('getRowSpans', () => {
    const columns = [
      {
        props: {
          fieldKey: 'color',
        },
      },
      {
        props: {
          fieldKey: 'spanned',
          spanByFieldKey: true,
        },
      },
    ];

    it('Generates row spans', () => {
      const spans = DataTable.getRowSpans(rows, columns as Column<Row>[]);
      expect(spans).to.eql({
        columnsWithSpans: {
          1: true,
        },
        spanStarts: {
          1: {
            1: {
              spanLength: 2,
            },
          },
          3: {
            1: {
              spanLength: 2,
            },
          },
          5: {
            1: {
              spanLength: 1,
            },
          },
        },
      });
    });
  });

  it('flattens React fragments in children', () => {
    mount(
      <DataTable<Row> tableLayout="auto" gridId={gridTestId} rows={rows}>
        <>
          <DataTable.Column<Row> headerLabel="Color" fieldKey="color" />
          <>
            <DataTable.Column<Row> headerLabel="Color" fieldKey="color" />
            <DataTable.Column<Row> headerLabel="Color" fieldKey="color" />
          </>
        </>
      </DataTable>,
    );
    cy.queryAllByText('red').should('have.length', 3);
  });

  describe('validates props', () => {
    it('Throws if table-layout:fixed uses percentage widths but not all set.', done => {
      mount(
        <Router>
          <DataTable<Row> tableLayout="fixed" gridId={gridTestId} rows={rows}>
            <DataTable.Column<Row> width={1 / 2} headerLabel="Color" fieldKey="color" />
            <DataTable.Column<Row> headerLabel="Spanned" fieldKey="spanned" />
          </DataTable>
        </Router>,
      );
      cy.on('fail', err => {
        expect(err.message).to.contain('Please specify widths for columns: spanned');
        done();
      });
    });

    it('Throws if table-layout is auto and cols are fixed', done => {
      mount(
        <Router>
          <DataTable<Row> tableLayout="auto" gridId={gridTestId} rows={rows}>
            <DataTable.Column<Row> isFixed headerLabel="Color" fieldKey="color" />
            <DataTable.Column<Row> headerLabel="Custom">
              {({ rowIndex, row }) => <Box>{`User ${rowIndex}'s favorite color is ${row.color}.`}</Box>}
            </DataTable.Column>
            <DataTable.Column<Row> headerLabel="Span" fieldKey="spanned" spanByFieldKey />
          </DataTable>
        </Router>,
      );
      cy.on('fail', err => {
        expect(err.message).to.contain('Must use fixed layout');
        done();
      });
    });

    it('Throws if table-layout is auto and row spans', done => {
      mount(
        <Router>
          <DataTable<Row> tableLayout="auto" gridId={gridTestId} rows={rows}>
            <DataTable.Column<Row> spanByFieldKey headerLabel="Color" fieldKey="color" />
            <DataTable.Column<Row> headerLabel="Custom">
              {({ rowIndex, row }) => <Box>{`User ${rowIndex}'s favorite color is ${row.color}.`}</Box>}
            </DataTable.Column>
            <DataTable.Column<Row> headerLabel="Span" fieldKey="spanned" spanByFieldKey />
          </DataTable>
        </Router>,
      );
      cy.on('fail', err => {
        expect(err.message).to.contain('Must use fixed layout');
        done();
      });
    });

    it('renders fixed layout table with percentages', () => {
      mount(
        <Router>
          <DataTable<Row> tableLayout="fixed" gridId={gridTestId} rows={rows}>
            <DataTable.Column<Row> width={1 / 2} headerLabel="Color" fieldKey="color" />
            <DataTable.Column<Row> width={1 / 2} headerLabel="Custom">
              {({ rowIndex, row }) => <Box>{`User ${rowIndex}'s favorite color is ${row.color}.`}</Box>}
            </DataTable.Column>
          </DataTable>
        </Router>,
      );
    });
  });
});
