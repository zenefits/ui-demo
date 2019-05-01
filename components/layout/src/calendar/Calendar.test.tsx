import React from 'react';

import { mountWithTheme } from 'z-frontend-theme/test-utils/theme';

import Calendar from './Calendar';

interface NameViewRow {
  employee?: {
    name: string;
  };
  columns: Cell[];
}

type Cell = Block[];

type Block = Shift | Timeoff;

interface BlockBase {
  startTime: Date;
  endTime: Date;
}

interface Shift extends BlockBase {
  role?: string;
}

interface Timeoff extends BlockBase {
  status: 'requested' | 'approved';
}

describe('Calendar', () => {
  it.skip('should render', () => {
    const rowsData: NameViewRow[] = [
      {
        employee: { name: 'Brody Chen' },
        columns: [undefined, [{ role: 'Cook', startTime: new Date(), endTime: new Date() }]],
      },
    ];

    const wrapper = mountWithTheme(
      <Calendar<Cell, NameViewRow>
        startDate={new Date()}
        rows={rowsData}
        cellTemplate={() => <div>cell template</div>}
        rowHeaderTemplate={rowData => <div>{rowData.employee.name}</div>}
      />,
    );

    expect(wrapper.text()).toEqual('Brody Chen');
  });
});
