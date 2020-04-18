import React from 'react';
import { render } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';

import DataManager, { DataManagerRenderProps } from './DataManager';
import { updateFilters } from './filterUtils';
import { RowSelectionContext } from './data-selection/RowSelectionContext';

type EmptyItem = {
  id: number;
  name: string;
  department: string;
};
const emps: EmptyItem[] = [
  { id: 1, name: 'Edison Keebler', department: 'Games' },
  { id: 2, name: 'Lonnie Deckow', department: 'Outdoor' },
  { id: 3, name: 'Alene Keeling', department: 'Auto' },
  { id: 4, name: '', department: 'Secret Service' },
];

function renderFiltered(managerProps: DataManagerRenderProps<EmptyItem>) {
  return <div>{managerProps.filtering.outputData.map((emp: any) => emp.name || 'n/a')}</div>;
}

describe('DataManager', () => {
  it('should render without throwing an error', () => {
    expect(
      render(
        <Router>
          <DataManager sourceData={[]} render={managerProps => <p>Hi</p>} />
        </Router>,
      ).text(),
    ).toEqual('Hi');
  });

  describe('selection', () => {
    it('updates count properly', () => {
      render(
        <Router>
          <DataManager<EmptyItem>
            sourceData={emps}
            selectionKey="id"
            initialSelections={new Set([1, 2, 3, 4])}
            render={() => (
              <RowSelectionContext.Consumer>
                {selectionContext => {
                  expect(selectionContext.selectionCount).toBe(4);
                  expect(selectionContext.anyDisplayedDataIsSelected).toBe(true);
                  expect(selectionContext.allDisplayedDataIsSelected).toBe(true);
                  return null;
                }}
              </RowSelectionContext.Consumer>
            )}
          />
        </Router>,
      );
    });

    it('handles none selected', () => {
      render(
        <Router>
          <DataManager<EmptyItem>
            sourceData={emps}
            initialFilter={{ name: { stringContains: 'nothing-matches' } }}
            render={() => (
              <RowSelectionContext.Consumer>
                {selectionContext => {
                  expect(selectionContext.selectionCount).toBe(0);
                  expect(selectionContext.anyDisplayedDataIsSelected).toBe(false);
                  expect(selectionContext.allDisplayedDataIsSelected).toBe(false);
                  return null;
                }}
              </RowSelectionContext.Consumer>
            )}
          />
        </Router>,
      );
    });
  });

  describe('filtering', () => {
    describe('stringContains', () => {
      it('should find results', () => {
        const eeNameFilter = { name: { stringContains: 'ee' } };
        expect(
          render(
            <Router>
              <DataManager<EmptyItem> sourceData={emps} initialFilter={eeNameFilter} render={renderFiltered} />
            </Router>,
          ).text(),
        ).toEqual('Edison KeeblerAlene Keeling');
      });

      it('should not match empty results', () => {
        const zeroMatchNameFilter = { name: { stringContains: 'asdfasdf' } };
        expect(
          render(
            <Router>
              <DataManager<EmptyItem> sourceData={emps} initialFilter={zeroMatchNameFilter} render={renderFiltered} />
            </Router>,
          ).text(),
        ).toEqual('');
      });
    });

    it('should filter data correctly by matchAny', () => {
      const deptFilter = updateFilters({}, 'matchAny', 'department', 'Auto', true);
      expect(
        render(
          <Router>
            <DataManager<EmptyItem> sourceData={emps} initialFilter={deptFilter} render={renderFiltered} />
          </Router>,
        ).text(),
      ).toEqual('Alene Keeling');

      const updatedDeptFilter = updateFilters(deptFilter, 'matchAny', 'department', 'Outdoor', true);
      expect(
        render(
          <Router>
            <DataManager<EmptyItem> sourceData={emps} initialFilter={updatedDeptFilter} render={renderFiltered} />
          </Router>,
        ).text(),
      ).toEqual('Lonnie DeckowAlene Keeling');
    });

    it('should filter data correctly by customMatchAny', () => {
      const nameFilter = {
        key: 'firstNameLessThanSixChars',
        function: (value: string) => {
          const first = value.split(' ')[0];
          return first && first.length < 6;
        },
      };
      const initialFilter = updateFilters({}, 'customMatchAny', 'name', nameFilter, true);
      expect(
        render(
          <Router>
            <DataManager<EmptyItem> sourceData={emps} initialFilter={initialFilter} render={renderFiltered} />
          </Router>,
        ).text(),
      ).toEqual('Alene Keeling');

      const firstCharNameFilter = {
        key: 'nameStartsWithE',
        function: (value: string) => value[0] === 'E',
      };
      const updatedInitialFilter = updateFilters(initialFilter, 'customMatchAny', 'name', firstCharNameFilter, true);
      expect(
        render(
          <Router>
            <DataManager<EmptyItem> sourceData={emps} initialFilter={updatedInitialFilter} render={renderFiltered} />
          </Router>,
        ).text(),
      ).toEqual('Edison KeeblerAlene Keeling');
    });
  });
});
