import React from 'react';
import { cleanup, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';

import { renderWithContext } from 'z-frontend-theme/test-utils/theme';
import { DataManager } from 'z-frontend-data-manager';
import { IconButton } from 'z-frontend-elements';

import DataTable from '../DataTable';

type Row = { color: string; number: number };
const rows: Row[] = [
  {
    color: 'red',
    number: 10,
  },
  {
    color: 'green',
    number: 12,
  },
  {
    color: 'blue',
    number: 14,
  },
  {
    color: 'orange',
    number: 8,
  },
  {
    color: 'pink',
    number: 0,
  },
];

type TextExampleProps = { initialSelections?: Set<string> };

const TestExample = (props: TextExampleProps) => (
  <Router>
    <DataManager<Row>
      sourceData={rows}
      selectionKey="color"
      initialSelections={props.initialSelections}
      render={() => (
        <DataTable<Row>
          bulkActions={({ selectionsCount }) => (
            <>
              <IconButton iconName="delete" mr={2} onClick={() => {}}>
                Delete ({selectionsCount})
              </IconButton>
              <IconButton iconName="download" onClick={() => {}}>
                Export ({selectionsCount})
              </IconButton>
            </>
          )}
        >
          <DataTable.RowSelectionColumn<Row> />
          <DataTable.Column<Row> headerLabel="Color" fieldKey="color" />
          <DataTable.Column<Row> headerLabel="Span" fieldKey="number" />
        </DataTable>
      )}
    />
  </Router>
);

(window as any).HTMLElement.prototype.scrollIntoView = () => {};

describe('DataTableBulkMenu', () => {
  afterEach(cleanup);

  it('does not render if no rows selected', () => {
    const { queryByTestId } = renderWithContext(<TestExample initialSelections={new Set()} />);
    expect(queryByTestId('DataTableBulkMenu')).toBeNull();
  });

  it('shows all buttons when a row is selected', () => {
    const { getByText, queryByTestId } = renderWithContext(<TestExample initialSelections={new Set(['red'])} />);
    expect(queryByTestId('DataTableBulkMenu')).not.toBeNull();
    getByText('Delete', { exact: false });
    getByText('Export', { exact: false });
  });

  it('selection count updates dynamically', () => {
    const { getByText, getByLabelText } = renderWithContext(
      // only 2 selected
      <TestExample initialSelections={new Set(['red', 'green'])} />,
    );
    const selectAllButton = getByLabelText('Select all rows');
    fireEvent.click(selectAllButton);

    const rowCount = Object.keys(rows).length;
    expect(rowCount).toBeGreaterThan(0);
    getByText(`Delete (${rowCount})`);
    getByText(`Export (${rowCount})`);
  });
});
