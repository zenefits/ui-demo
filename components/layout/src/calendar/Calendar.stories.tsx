import React, { Component } from 'react';
// @ts-ignore
import { action } from '@storybook/addon-actions';
// @ts-ignore
import { date, number } from '@storybook/addon-knobs';

import { Box, Flex, TextBlock } from 'zbase';
import { Avatar } from 'z-frontend-composites';
import { DragAndDrop } from 'z-frontend-drag-and-drop';

import { storiesOf } from '../../.storybook/storyHelpers';
import Calendar from './Calendar';
import { CellPosition, CellTemplateParams, DropHandler } from './interfaces';

interface NameViewRow {
  employee?: {
    firstName: string;
    lastName: string;
    photoUrl?: string;
    hours: number;
  };
  columns: Cell[];
  height?: string; // E.g. '80px'
}

type Cell = Block[];

interface Block {
  startTime: Date;
  endTime: Date;
  role?: string;
  status?: 'requested' | 'approved';
}

const dateString = '2018-07-17T03:24:00';

interface DragAndDropCell {
  text: string;
}

interface DragAndDropRow {
  employee?: {
    firstName: string;
    lastName: string;
    photoUrl?: string;
  };
  columns: DragAndDropCell[];
  height?: string; // E.g. '80px'
}

interface DragAndDropCalendarExampleState {
  rows: DragAndDropRow[];
}

interface Props {}

interface DragSource {
  cellPosition: CellPosition;
  cellData: DragAndDropCell;
}

class DragAndDropCalendarExample extends Component<Props, DragAndDropCalendarExampleState> {
  constructor(props: Props) {
    super(props);

    const startTime = new Date(dateString);
    startTime.setHours(8);
    const endTime = new Date(dateString);
    endTime.setHours(10);

    this.state = {
      rows: [
        {
          columns: [undefined, undefined, undefined, undefined, undefined, undefined, undefined],
        },
        {
          employee: {
            firstName: 'Brody',
            lastName: 'Chen',
          },
          columns: [
            { text: "I'm draggable. Drag me!" },
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
          ],
          height: '110px',
        },
        {
          employee: { firstName: 'Sunny', lastName: 'Rekhi' },
          columns: [undefined, undefined, undefined, undefined, undefined, undefined, undefined],
        },
      ],
    };
  }

  onDrop: DropHandler<DragSource> = event => {
    const {
      source: {
        cellPosition: { column: sourceColumn, row: sourceRow },
        cellData: sourceCellData,
      },
      target: { column: targetColumn, row: targetRow },
    } = event;

    if (sourceColumn !== targetColumn || sourceRow !== targetRow) {
      this.setState((prevState: DragAndDropCalendarExampleState) => {
        const rows = prevState.rows;

        // Set target
        rows[targetRow].columns[targetColumn] = sourceCellData;

        // Clear drag source cell
        rows[sourceRow].columns[sourceColumn] = null;

        return { rows };
      });
    }
  };

  render() {
    const { rows } = this.state;

    const topLeftCellTemplate = () => <TextBlock>EMPLOYEE VIEW</TextBlock>;

    const rowHeaderTemplate = (rowData: DragAndDropRow) => {
      if (rowData.employee) {
        const employee = rowData.employee;

        return (
          <Flex pl={3} align="center">
            <Avatar firstName={employee.firstName} lastName={employee.lastName} photoUrl={employee.photoUrl} mr={2} />
            <TextBlock>
              {employee.firstName} {employee.lastName}
            </TextBlock>
          </Flex>
        );
      } else {
        return <Box>unassigned</Box>;
      }
    };

    const cellTemplate = ({ cellData, cellPosition }: CellTemplateParams<DragAndDropCell, DragAndDropRow>) => {
      return (
        <DragAndDrop.Source data={{ cellData, cellPosition }}>
          <Flex justify="center" align="center" w={1}>
            <TextBlock>{cellData.text}</TextBlock>
          </Flex>
        </DragAndDrop.Source>
      );
    };
    const startDate = new Date(date('startDate', new Date(dateString)));
    const numberOfDays = number('numberOfDays', 7);

    return (
      <Calendar<DragAndDropCell, DragAndDropRow>
        startDate={startDate}
        rows={rows}
        cellTemplate={cellTemplate}
        rowHeaderTemplate={rowHeaderTemplate}
        topLeftCellTemplate={topLeftCellTemplate}
        onCellClick={action('onCellClick')}
        numberOfDays={numberOfDays}
        onDrop={this.onDrop}
      />
    );
  }
}

storiesOf('layout|Calendar', module)
  .add('Default', () => {
    const startTime = new Date(dateString);
    startTime.setHours(8);
    const endTime = new Date(dateString);
    endTime.setHours(10);

    const rowsData: NameViewRow[] = [
      {
        columns: [undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      },
      {
        employee: {
          firstName: 'Brody',
          lastName: 'Chen',
          hours: 14,
        },
        columns: [
          [{ startTime, endTime, role: 'Hosts' }],
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
        ],
        height: '110px',
      },
      {
        employee: { firstName: 'Sunny', lastName: 'Rekhi', hours: 10 },
        columns: [undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      },
    ];

    const topLeftCellTemplate = () => <TextBlock>EMPLOYEE VIEW</TextBlock>;

    const rowHeaderTemplate = (rowData: NameViewRow) => {
      if (rowData.employee) {
        const employee = rowData.employee;

        return (
          <Flex pl={3} align="center">
            <Avatar firstName={employee.firstName} lastName={employee.lastName} photoUrl={employee.photoUrl} mr={2} />
            <Box>
              <TextBlock>
                {employee.firstName} {employee.lastName}
              </TextBlock>
              <TextBlock>Total hrs: {employee.hours}</TextBlock>
            </Box>
          </Flex>
        );
      } else {
        return <Box>unassigned</Box>;
      }
    };

    const cellTemplate = ({ cellData }: { cellData: Cell; rowData: NameViewRow }) => {
      return (
        <Box>
          <TextBlock>{cellData && cellData[0].role}</TextBlock>
          <TextBlock>time range</TextBlock>
        </Box>
      );
    };

    const startDate = new Date(date('startDate', new Date(dateString)));
    const numberOfDays = number('numberOfDays', 7);
    return (
      // Adding a top padding to see the top border of Calendar
      <Box pt={3}>
        <Calendar<Cell, NameViewRow>
          startDate={startDate}
          rows={rowsData}
          cellTemplate={cellTemplate}
          rowHeaderTemplate={rowHeaderTemplate}
          topLeftCellTemplate={topLeftCellTemplate}
          onCellClick={action('onCellClick')}
          numberOfDays={numberOfDays}
        />
      </Box>
    );
  })
  .add('Drag and drop', () => {
    return <DragAndDropCalendarExample />;
  });
