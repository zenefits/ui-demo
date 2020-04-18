import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import { cleanup, fireEvent, getByText, queryAllByText, wait, within, RenderResult } from '@testing-library/react';
import { range } from 'lodash';
import * as Yup from 'yup';
import { BrowserRouter as Router } from 'react-router-dom';

import { renderWithContext } from 'z-frontend-theme/test-utils/theme';
import { Box } from 'zbase';
import {
  callPendingDebouncedFunctions,
  mockDebounceWithImmediatelyCalledFn,
  mockDebounceWithManuallyCalledFn,
  patchOffsetParent,
  resetDebounce,
} from 'z-frontend-jest/utils';

import EditableTable from './EditableTable';
import SaveStateManager from './SaveStateManager';
import {
  exampleRows,
  getFullInputColumnSet,
  DataSavingExample,
  DynamicColumnsExample,
  ExampleRow,
  MarkDeletionsExample,
} from './EditableTable.stories';
import { STATUS_COLOR_MAP } from './columns/EditableTableStatusColumn';
import { KEY_CODES } from '../GridAccessibilityProvider';
import { Errors } from './EditableRow';

patchOffsetParent();

type Row = {
  inputField: string;
  inputField2: string;
  selectField: string;
  customField: string;
  errors?: Errors;
};

const rows = [
  {
    inputField: 'input-0',
    inputField2: '',
    selectField: 'option-0',
    customField: 'foo',
  },
  {
    inputField: 'input-1',
    inputField2: '',
    selectField: 'option-1',
    customField: 'bar',
  },
  {
    inputField: 'input-2',
    inputField2: '',
    selectField: 'option-2',
    customField: 'baz',
  },
];

const gridTestId = 'grid-test-id';

const renderInSaveStateManager = (content: JSX.Element) =>
  renderWithContext(<SaveStateManager>{content}</SaveStateManager>);

// This is a hack to make assertion happen after promise in component resolves
const waitForInternalPromises = () =>
  new Promise(resolve => {
    setTimeout(resolve, 1);
  });

const TestExample = (props: {
  initialRows?: Row[];
  autoSaveTimeout?: number;
  saveHandler?: jest.Mock;
  validationSchema?: { [key: string]: any };
}) => (
  <EditableTable<Row>
    rows={props.initialRows || rows}
    gridId={gridTestId}
    getRowKey={row => row.inputField}
    validateRow={({ row, editErrors }) => {
      editErrors(errors => {
        errors['inputField'] = row['inputField'] ? [] : [{ key: 'required', message: 'This field is required' }];
      });
    }}
    validationSchema={
      props.validationSchema || {
        selectField: Yup.string().required(),
      }
    }
    autoSaveTimeout={props.autoSaveTimeout}
    saveHandler={props.saveHandler}
  >
    <EditableTable.StatusColumn isFixed />
    <EditableTable.InputColumn<Row> width={200} fieldKey="inputField" headerLabel="Input Field" isFixed />
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

(window as any).HTMLElement.prototype.scrollIntoView = () => {};

const originalGetModifierState = KeyboardEvent.prototype.getModifierState;
const mockShiftModifierState = (state: boolean) => {
  KeyboardEvent.prototype.getModifierState = () => state;
};

describe('EditableTable', () => {
  beforeEach(() => mockShiftModifierState(false));

  afterEach(cleanup);
  afterEach(jest.useRealTimers);
  afterEach(resetDebounce);
  afterEach(() => (KeyboardEvent.prototype.getModifierState = originalGetModifierState));

  const getRow = (wrapper: RenderResult, rowIndex: number) => {
    const rowCell = wrapper.getByText(`input-${rowIndex}`);
    const row = rowCell.closest('tr');
    return row;
  };

  const getGrid = () => document.getElementById(gridTestId);

  const hoverRow = (wrapper: RenderResult, rowIndex: number) => {
    const row = getRow(wrapper, rowIndex);
    fireEvent.mouseEnter(row.querySelector('td'));
  };

  const fireGridKeydown = (keyCode: number) => {
    fireEvent(
      document.getElementById(gridTestId),
      new KeyboardEvent('keydown', {
        keyCode,
        bubbles: true,
      } as any),
    );
  };

  const checkActiveCell = (row: number, column: number) => {
    const grid = getGrid();
    const activeCellId = (grid.attributes as any)['aria-activedescendant'].value;
    expect(activeCellId).toContain(`${row}-${column}`);
    expect(document.getElementById(activeCellId).classList).toContain('active');
    return activeCellId;
  };

  const editFirstInput = (value: string) => {
    getGrid().focus();
    fireGridKeydown(KEY_CODES.ENTER);
    fireGridKeydown(KEY_CODES.TAB);
    fireGridKeydown(KEY_CODES.TAB);
    const activeCellId = checkActiveCell(1, 1);
    const textInput = document.querySelector(`#${activeCellId} input`);
    ReactTestUtils.Simulate.change(textInput, { target: { value } } as any);
  };

  // Should always be called after first input is focused
  const editSecondInput = (value: string) => {
    fireGridKeydown(KEY_CODES.ENTER);
    fireGridKeydown(KEY_CODES.TAB);
    const activeCellId = checkActiveCell(1, 2);
    const textInput = document.querySelector(`#${activeCellId} input`);
    ReactTestUtils.Simulate.change(textInput, { target: { value } } as any);
  };

  it('hovering activates fields for row', () => {
    const wrapper = renderInSaveStateManager(<TestExample />);
    expect(document.querySelector('table input')).toBe(null);

    hoverRow(wrapper, 0);
    expect(document.querySelectorAll('table input').length).toBe(2);
    expect(document.querySelectorAll('table select').length).toBe(1);

    hoverRow(wrapper, 1);
    expect(document.querySelectorAll('table input').length).toBe(2);
    expect(document.querySelectorAll('table select').length).toBe(1);
  });

  it('inputs can be navigated with tabs', () => {
    renderInSaveStateManager(<TestExample />);

    getGrid().focus();
    checkActiveCell(0, 0);

    fireGridKeydown(KEY_CODES.ENTER);
    fireGridKeydown(KEY_CODES.TAB);
    fireGridKeydown(KEY_CODES.TAB);
    let activeCellId = checkActiveCell(1, 1);
    expect(document.activeElement).toBe(document.querySelector(`#${activeCellId} input`));

    fireGridKeydown(KEY_CODES.TAB);
    activeCellId = checkActiveCell(1, 2);
    expect(document.activeElement).toBe(document.querySelector(`#${activeCellId} input`));

    fireGridKeydown(KEY_CODES.TAB);
    activeCellId = checkActiveCell(1, 4);
    expect(document.activeElement).toBe(document.querySelector(`#${activeCellId} select`));

    fireGridKeydown(KEY_CODES.TAB);
    activeCellId = checkActiveCell(2, 0);
  });

  it('fields can be edited', () => {
    const wrapper = renderInSaveStateManager(<TestExample />);

    editFirstInput('hello world');
    fireGridKeydown(KEY_CODES.TAB);

    wrapper.getByDisplayValue('hello world');
  });

  it('fields are validated', done => {
    mockDebounceWithImmediatelyCalledFn();
    const wrapper = renderInSaveStateManager(<TestExample />);

    editFirstInput('');
    fireGridKeydown(KEY_CODES.TAB);

    setTimeout(() => {
      const errorIcon = wrapper.getByLabelText(`Open status popover for row 1`) as any;
      expect(errorIcon.dataset.testColor).toBe(STATUS_COLOR_MAP['error']);
      done();
    }, 0);
  });

  it('saveHandler callback is called when tabbing out of row', async done => {
    const mockedSave = jest.fn<any, any>(() => {
      return new Promise(resolve => {});
    });
    const wrapper = renderInSaveStateManager(<TestExample saveHandler={mockedSave} />);

    editFirstInput('hello world');
    editSecondInput('hello again world');
    fireGridKeydown(KEY_CODES.TAB);

    await waitForInternalPromises();
    expect(mockedSave.mock.calls.length).toBe(0);

    fireGridKeydown(KEY_CODES.TAB);

    await waitForInternalPromises();

    const loadingSpinner = wrapper.container.querySelector(`[data-testid="loading-spinner-for-row-1"]`) as any;
    expect(loadingSpinner).toBeTruthy();
    expect(mockedSave.mock.calls).toHaveLength(1);

    expect(mockedSave.mock.calls[0][0].row.inputField).toBe('hello world');
    expect(mockedSave.mock.calls[0][0].row.inputField2).toBe('hello again world');

    done();
  });

  it('cells can be navigated with arrow keys', () => {
    renderInSaveStateManager(<TestExample />);

    const grid = getGrid();
    grid.focus();
    checkActiveCell(0, 0);

    fireGridKeydown(KEY_CODES.RIGHT_ARROW);
    fireGridKeydown(KEY_CODES.DOWN_ARROW);
    let activeCellId = checkActiveCell(1, 1);
    expect(document.activeElement).toBe(document.querySelector(`#${activeCellId} input`));

    fireGridKeydown(KEY_CODES.DOWN_ARROW);
    activeCellId = checkActiveCell(2, 1);
    expect(document.activeElement).toBe(document.querySelector(`#${activeCellId} input`));

    fireGridKeydown(KEY_CODES.DOWN_ARROW);
    checkActiveCell(3, 1);

    fireGridKeydown(KEY_CODES.DOWN_ARROW);
    checkActiveCell(0, 1);

    fireGridKeydown(KEY_CODES.UP_ARROW);
    checkActiveCell(3, 1);

    fireGridKeydown(KEY_CODES.UP_ARROW);
    checkActiveCell(2, 1);

    fireGridKeydown(KEY_CODES.LEFT_ARROW);
    activeCellId = checkActiveCell(2, 0);
    // expect(document.activeElement).toBe(document.querySelector(`#${activeCellId} select`));

    fireGridKeydown(KEY_CODES.LEFT_ARROW);
    activeCellId = checkActiveCell(2, 4);
    expect(document.activeElement).toBe(document.querySelector(`#${activeCellId} select`));

    fireGridKeydown(KEY_CODES.RIGHT_ARROW);
    checkActiveCell(2, 0);

    fireGridKeydown(KEY_CODES.RIGHT_ARROW);
    checkActiveCell(2, 1);
  });

  it('read-only columns are rendered correctly', () => {
    const wrapper = renderInSaveStateManager(<TestExample />);
    wrapper.getByText('foo-1');
    wrapper.getByText('bar-2');
    wrapper.getByText('baz-3');
  });

  it('applies a validation schema', async () => {
    mockDebounceWithImmediatelyCalledFn();
    const wrapper = renderInSaveStateManager(
      <TestExample
        initialRows={[
          ...rows,
          {
            inputField: 'input-12',
            inputField2: '',
            selectField: '',
            customField: 'baz',
          },
        ]}
      />,
    );

    // Since the status column is updated after the component mounts we need to this await
    await wait(
      () => {
        const statusCircleRow1 = wrapper.getByLabelText('Open status popover for row 1');
        expect(statusCircleRow1.dataset.testColor).toBe(STATUS_COLOR_MAP['clean']);
        expect(statusCircleRow1).toBeTruthy();
        const statusCircleRow4 = wrapper.getByLabelText('Open status popover for row 4');
        expect(statusCircleRow4.dataset.testColor).toBe(STATUS_COLOR_MAP['error']);
        expect(statusCircleRow4).toBeTruthy();
      },
      { timeout: 100 },
    );
  });

  it('Shows error popper with content', async () => {
    mockDebounceWithImmediatelyCalledFn();
    const wrapper = renderInSaveStateManager(
      <TestExample
        validationSchema={{
          inputField: Yup.string().required(),
        }}
        initialRows={[
          {
            inputField: '',
            inputField2: '',
            selectField: '',
            customField: 'baz',
          },
        ]}
      />,
    );

    await wait(
      () => {
        expect(wrapper.getByLabelText('Open status popover for row 1').dataset.testColor).toBe(
          STATUS_COLOR_MAP['error'],
        );
      },
      { timeout: 100 },
    );

    fireEvent.click(wrapper.getByLabelText('Open status popover for row 1'));

    within(wrapper.getByTestId('status-error-popover-content-1')).getByText('Input Field');
    wrapper.getByText('1 Error in This Row');
  });

  it('validation schema can clear a server error', async () => {
    mockDebounceWithImmediatelyCalledFn();
    const wrapper = renderInSaveStateManager(
      <TestExample
        validationSchema={{
          inputField: Yup.string().required(),
        }}
        initialRows={[
          {
            inputField: '',
            inputField2: '',
            selectField: '',
            customField: 'baz',
          },
        ]}
      />,
    );

    // Since the status column is updated after the component mounts we need to this await
    await wait(
      () => {
        const statusCircleRow = wrapper.getByLabelText('Open status popover for row 1');
        expect(statusCircleRow.dataset.testColor).toBe(STATUS_COLOR_MAP['error']);
      },
      { timeout: 100 },
    );

    editFirstInput('test');
    fireGridKeydown(KEY_CODES.TAB);

    // Needs to wait for next tick for validation to run
    await wait(
      () => {
        const statusCircleRow = wrapper.getByLabelText('Open status popover for row 1');
        expect(statusCircleRow.dataset.testColor).toBe(STATUS_COLOR_MAP['clean']);
      },
      { timeout: 0 },
    );
  });

  describe('address columns', () => {
    type AddressRow = {
      id: number;
      line1: string;
      city: string;
      stateProvince: string;
      country: string;
      postalCode: string;
    };

    const addressRows: AddressRow[] = [
      { id: 1, line1: '123 Main st.', city: 'Vancouver', stateProvince: 'BC', country: 'CA', postalCode: 'V6B 2X5' },
      { id: 2, line1: '123 Main st.', city: 'Boston', stateProvince: 'Mass', country: 'US', postalCode: '02111' },
    ];

    const AddressTable = (props: { initialRows?: AddressRow[] }) => (
      <EditableTable<AddressRow> getRowKey={row => row.id} rows={addressRows}>
        <EditableTable.InputColumn<AddressRow> width={200} fieldKey="line1" headerLabel="Address line 1" />
        <EditableTable.InputColumn<AddressRow> width={200} fieldKey="city" headerLabel="City" />
        <EditableTable.CountryColumn<AddressRow> width={200} fieldKey="country" headerLabel="Country" />
        <EditableTable.StateColumn<AddressRow>
          width={200}
          fieldKey="stateProvince"
          countryFieldKey="country"
          headerLabel="State"
        />
        <EditableTable.PostalCodeColumn<AddressRow> width={200} fieldKey="postalCode" headerLabel="Postal code/ZIP" />
      </EditableTable>
    );

    it('Shows label for stateProvince value', () => {
      const wrapper = renderInSaveStateManager(<AddressTable />);

      wrapper.getByText('British Columbia');
      // Leaves text that doesn't match state value for country
      wrapper.getByText('Mass');
    });
  });

  const assertTableIsReadOnly = () => {
    expect(document.querySelectorAll('input').length).toBe(0);
    ReactTestUtils.Simulate.mouseEnter(document.querySelectorAll('tr')[1]);
    expect(document.querySelectorAll('input').length).toBe(0);
  };

  it("doesn't activate inputs when table is set to read-only", () => {
    renderInSaveStateManager(
      <EditableTable<ExampleRow> rows={exampleRows} gridId={gridTestId} readOnly getRowKey={row => row.id}>
        {getFullInputColumnSet()}
      </EditableTable>,
    );
    assertTableIsReadOnly();
  });

  it("doesn't activate inputs if columns are set to read-only", () => {
    // setColumnsReadOnly is only a property on this example, not on EditableTable
    renderInSaveStateManager(
      <EditableTable<ExampleRow> rows={exampleRows} gridId={gridTestId} getRowKey={row => row.id}>
        {getFullInputColumnSet({ setColumnsReadOnly: true })}
      </EditableTable>,
    );
    assertTableIsReadOnly();
  });

  it("doesn't focus input on hover", () => {
    jest.useFakeTimers();
    renderInSaveStateManager(
      <div>
        <EditableTable<Row> rows={rows} gridId={gridTestId} getRowKey={row => row.inputField}>
          <EditableTable.InputColumn<Row> fieldKey="inputField" headerLabel="Input Field" />
        </EditableTable>
        <input id="external-input" />
      </div>,
    );

    const grid = getGrid();
    grid.focus();
    fireGridKeydown(KEY_CODES.DOWN_ARROW);
    const activeCellId = checkActiveCell(1, 0);
    expect(document.activeElement).toBe(document.querySelector(`#${activeCellId} input`));
    fireGridKeydown(KEY_CODES.ESC);
    fireGridKeydown(KEY_CODES.TAB);
    expect(document.activeElement).toBe(document.querySelector(`#external-input`));
    ReactTestUtils.Simulate.mouseEnter(document.querySelectorAll('tr')[1]);
    jest.runOnlyPendingTimers();
    expect(document.activeElement).toBe(document.querySelector(`#external-input`));
  });

  it('auto-saves row', async done => {
    mockDebounceWithManuallyCalledFn();
    const mockedSave = jest.fn(() => Promise.resolve());
    renderInSaveStateManager(<TestExample saveHandler={mockedSave} />);

    expect(mockedSave.mock.calls.length).toBe(0);
    editFirstInput('hello world');

    callPendingDebouncedFunctions();

    await waitForInternalPromises();

    expect(mockedSave.mock.calls.length).toBe(1);

    await waitForInternalPromises();

    editSecondInput('hello world');
    callPendingDebouncedFunctions();

    await waitForInternalPromises();

    expect(mockedSave.mock.calls.length).toBe(2);
    done();
  });

  it('updates columns correctly', () => {
    const { getByText, getAllByText, queryByText } = renderInSaveStateManager(
      <Router>
        <DynamicColumnsExample />
      </Router>,
    );

    const querySet1 = ['name', 'universe', 'Fred Flintstone', 'Hanna-Barbera', 'birthplace', 'BR'];
    const omitSet1 = ['age', '46'];

    const querySet2 = ['name', 'universe', 'Fred Flintstone', 'Hanna-Barbera', 'age', '46'];
    const omitSet2 = ['birthplace', 'BR'];

    const querySet3 = ['name', 'universe', 'Fred Flintstone', 'Hanna-Barbera'];
    const omitSet3 = ['age', '46', 'birthplace', 'BR'];

    const assertDomState = (querySet: string[], omitSet: string[]) => {
      querySet.forEach(query => {
        getAllByText(query);
      });
      omitSet.forEach(omission => {
        expect(queryByText(omission)).toBe(null);
      });
    };

    assertDomState(querySet1, omitSet1);

    getByText('Show Age').click();
    assertDomState(querySet2, omitSet2);

    getByText('Toggle Dynamic Column').click();
    assertDomState(querySet3, omitSet3);

    getByText('Toggle Dynamic Column').click();
    getByText('Show Birthplace').click();

    assertDomState(querySet1, omitSet1);
  });

  it('adding rows works', () => {
    const { getByText } = renderInSaveStateManager(
      <Router>
        <DataSavingExample gridId={gridTestId} />
      </Router>,
    );

    getByText('Add Stormtrooper').click();
    getByText('Clone Trooper 9');
  });

  it('deleting rows works and active cell state updates gracefully', () => {
    const { getByText } = renderInSaveStateManager(
      <Router>
        <DataSavingExample gridId={gridTestId} />
      </Router>,
    );

    const grid = getGrid();
    grid.focus();

    fireGridKeydown(KEY_CODES.RIGHT_ARROW);
    fireGridKeydown(KEY_CODES.DOWN_ARROW);
    fireGridKeydown(KEY_CODES.DOWN_ARROW);
    fireGridKeydown(KEY_CODES.DOWN_ARROW);
    checkActiveCell(3, 1);

    const removeRowButton = getByText('Remove Row');

    while (document.querySelectorAll('tr').length > 6) {
      removeRowButton.click();
    }

    getGrid().focus();
    checkActiveCell(2, 1);

    while (document.querySelectorAll('tr').length > 0) {
      removeRowButton.click();
    }
    getByText('No data to show.');

    const addRowButton = getByText('Add Stormtrooper');
    addRowButton.click();
    expect(document.querySelectorAll('tr').length).toBeGreaterThan(0);
  });

  it('Sorts rows correctly', () => {
    const assertRowOrder = (queryElements: string[], tableSection: 'fixed' | 'fluid') => {
      queryElements.forEach((queryElement, i) => {
        const row = document.querySelector(`[data-testid="${tableSection}-table-body"]`).querySelectorAll('tr')[i];
        getByText(row, queryElement);
      });
    };

    const { getByText: wrapperGetByText } = renderInSaveStateManager(
      <Router>
        <DataSavingExample gridId={gridTestId} />
      </Router>,
    );

    assertRowOrder(['Fred Flintstone', 'Barney Rubble', 'Ned Stark'], 'fixed');
    assertRowOrder(['Hanna-Barbera', 'Hanna-Barbera', 'Song of Ice and Fire'], 'fluid');

    wrapperGetByText('Name').click();
    assertRowOrder(['anakin skywalker', 'Barney Rubble', 'Daenerys Targaryen'], 'fixed');
    assertRowOrder(['Star Wars', 'Hanna-Barbera', 'Song of Ice and Fire'], 'fluid');

    wrapperGetByText('Name').click();
    assertRowOrder(['Ned Stark', 'Melisandre', 'Luke Skywalker'], 'fixed');
    assertRowOrder(['Song of Ice and Fire', 'Song of Ice and Fire', 'Star Wars'], 'fluid');

    wrapperGetByText('Universe').click();
    assertRowOrder(['Fred Flintstone', 'Barney Rubble', 'Ned Stark'], 'fixed');
    assertRowOrder(['Hanna-Barbera', 'Hanna-Barbera', 'Song of Ice and Fire'], 'fluid');

    wrapperGetByText('Universe').click();
    assertRowOrder(['anakin skywalker', 'Leia Skywalker', 'Luke Skywalker'], 'fixed');
    assertRowOrder(['Star Wars', 'Star Wars', 'Star Wars'], 'fluid');
  });

  it('Rows can be marked as deleted', () => {
    renderInSaveStateManager(
      <Router>
        <MarkDeletionsExample />
      </Router>,
    );

    const assertRowIsMarkedDeleted = (row: HTMLTableRowElement) => {
      expect(queryAllByText(row, 'Deleted').length).toBe(1);
      fireEvent.mouseEnter(row.querySelector('td'));
      expect(row.querySelectorAll('input').length).toBe(0);
    };

    const assertRowIsActive = (row: HTMLTableRowElement) => {
      expect(queryAllByText(row, 'Deleted').length).toBe(0);
      fireEvent.mouseEnter(row.querySelector('td'));
      expect(row.querySelectorAll('input').length).toBeGreaterThan(0);
    };

    const getRow = (i: number, tableSection: 'fluid' | 'fixed') => {
      return document.querySelector(`[data-testid="${tableSection}-table-body"]`).querySelectorAll('tr')[i];
    };

    const row1 = getRow(0, 'fluid');
    assertRowIsActive(row1);

    assertRowIsMarkedDeleted(getRow(2, 'fluid'));
  });

  describe('time column', () => {
    type TimeInputTableRow = {
      id: number;
      time: string;
      place: string;
    };

    const timeInputTableRows = [
      { id: 1, time: '4:11 PM', place: 'Home' },
      { id: 2, time: '5:22 AM', place: 'Work' },
    ];

    const TimeInputTable = () => (
      <EditableTable<TimeInputTableRow> gridId={gridTestId} getRowKey={row => row.id} rows={timeInputTableRows}>
        <EditableTable.TimeColumn<TimeInputTableRow> width={200} fieldKey="time" headerLabel="Time" />
        <EditableTable.InputColumn<TimeInputTableRow> width={200} fieldKey="place" headerLabel="Place" />
      </EditableTable>
    );

    it('time inputs autocomplete on tab key', () => {
      const wrapper = renderInSaveStateManager(<TimeInputTable />);

      // Hover first row below header
      // This is required because if the row is not hovered, the time input unmounts after tabbed out.
      const rowCell = wrapper.getByText('4:11 PM');
      const row = rowCell.closest('tr');
      fireEvent.mouseEnter(row.querySelector('td'));

      // Click into the time input and change value
      const timeInput = wrapper.getByDisplayValue('4:11 PM');
      fireEvent.click(timeInput);
      ReactTestUtils.Simulate.change(timeInput, { target: { value: '2345' } } as any);
      fireGridKeydown(KEY_CODES.TAB);

      wrapper.getByDisplayValue('11:45 PM');
    });
  });

  describe('icon column', () => {
    it('Popover icon opens popover', async () => {
      const { getByText, getByLabelText } = renderInSaveStateManager(
        <Router>
          <DataSavingExample gridId={gridTestId} />
        </Router>,
      );

      getByLabelText('Example popover icon for Fred Flintstone').click();
      getByText('Example Popover Title');
      getByText('Example Popover Body for Fred Flintstone');
    });

    it('should call onClick when Enter key is pressed', () => {
      const mockOnClick = jest.fn(() => {});

      type IconTableRow = {
        id: number;
      };

      const iconTableRows = [{ id: 1 }, { id: 2 }];

      const IconTable = () => (
        <EditableTable<IconTableRow> gridId={gridTestId} getRowKey={row => row.id} rows={iconTableRows}>
          <EditableTable.IconColumn<IconTableRow>
            headerLabel="Icon 1"
            iconName="eye"
            getAriaLabelForCellIcon={row => `View ${row.id}`}
            onClick={mockOnClick}
          />
          <EditableTable.IconColumn<IconTableRow>
            headerLabel="Icon 2"
            iconName="edit"
            getAriaLabelForCellIcon={row => `View ${row.id}`}
          />
        </EditableTable>
      );

      const { getAllByTestId } = renderInSaveStateManager(<IconTable />);
      const icons = getAllByTestId('DataTableIconColumnIcon');
      expect(icons).toHaveLength(6); // 2 in header, 4 in body

      fireEvent.keyUp(icons[2], { key: 'Enter', keyCode: 13 });
      expect(mockOnClick.mock.calls).toHaveLength(1);
    });
  });
});
