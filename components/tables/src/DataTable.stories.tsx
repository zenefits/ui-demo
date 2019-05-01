import React from 'react';
import _ from 'lodash';

import { Box } from 'zbase';
import { DataManager } from 'z-frontend-data-manager';

import { storiesOf } from '../.storybook/storyHelpers';
import DataTable from './DataTable';

storiesOf('tables|DataTable', module)
  .addDecorator((getStory: Function) => (
    <Box p={20} w={1} bg="grayscale.white">
      {getStory()}
    </Box>
  ))
  .add('default', () => <DefaultExample />)
  .add('with spanned rows', () => <SpannedRowsExample />)
  .add('with data manager', () => <DataManagerExample />)
  .add('with mouse interactions', () => <MouseInteractionsExample />)
  .add('with data manager -- no fixed columns', () => <NoFixedColumnsExample />)
  .add('explicit columns widths', () => <ExplicitColumnWidthsExample />);

type Row = {
  name: string;
  location: string;
  alive: boolean;
  age: number;
  occupation: string;
  duties: string[];
};

const rows: Row[] = [
  {
    name: 'Fred Flintstone',
    location: 'Bedrock',
    alive: true,
    age: 46,
    occupation: 'Cave man',
    duties: ['Works on rocks', 'Feed Dino'],
  },
  {
    name: 'Barney Rubble',
    location: 'Bedrock',
    alive: true,
    age: 48,
    occupation: 'Cave man',
    duties: ['Works on rocks', 'Watch Bam-Bam'],
  },
  {
    name: 'Ned Stark',
    location: "King's Landing",
    alive: false,
    age: 40,
    occupation: 'Lord of Winterfell',
    duties: ['Rule Winterfell', 'Keep the peace', 'Support Robert Baratheon'],
  },
  {
    name: 'Sansa Stark',
    location: "King's Landing",
    alive: true,
    age: 18,
    occupation: 'Lady of Winterfell',
    duties: ['Rule Winterfell', 'Defeat the White Walkers'],
  },
];

const DefaultExample = () => (
  <DataTable<Row> rows={rows} width={500} height={200}>
    <DataTable.Column<Row> isFixed headerLabel="Location" fieldKey="location" />
    <DataTable.Column<Row> isFixed headerLabel="Name" fieldKey="name" />
    <DataTable.Column<Row> headerLabel="Alive" fieldKey="alive">
      {({ row }) => (row.alive ? 'Alive' : 'Dead')}
    </DataTable.Column>
    <DataTable.Column<Row> headerLabel="Age" fieldKey="age" />
  </DataTable>
);

const SpannedRowsExample = () => (
  <DataTable<Row> rows={rows} width={500} height={200}>
    <DataTable.Column<Row> isFixed headerLabel="Location" fieldKey="location" spanByFieldKey />
    <DataTable.Column<Row> headerLabel="Name" fieldKey="name" />
    <DataTable.Column<Row> headerLabel="Age" fieldKey="age" />
    <DataTable.Column<Row> headerLabel="Occupation" fieldKey="occupation" />
  </DataTable>
);

const DataManagerExample = () => (
  <DataManager<Row>
    sourceData={rows}
    selectionKey="name"
    render={() => (
      <DataTable<Row> width={500} height={200} enableRowSelection>
        <DataTable.Column<Row> isFixed headerLabel="Name" fieldKey="name" />
        <DataTable.Column<Row> headerLabel="Location" fieldKey="location" />
        <DataTable.Column<Row> headerLabel="Alive" fieldKey="alive">
          {({ row }) => (row.alive ? 'Alive' : 'Dead')}
        </DataTable.Column>
        <DataTable.Column<Row> headerLabel="Age" fieldKey="age" />
      </DataTable>
    )}
  />
);

const MouseInteractionsExample = () => (
  <DataTable<Row> rows={rows} width={500} height={200} shouldClickActivateTable>
    <DataTable.Column<Row> isFixed headerLabel="Name" fieldKey="name" />
    <DataTable.Column<Row> headerLabel="Location" fieldKey="location" />
    <DataTable.Column<Row> headerLabel="Age" fieldKey="age" />
    <DataTable.Column<Row> headerLabel="Occupation" fieldKey="occupation" />
  </DataTable>
);

const NoFixedColumnsExample = () => (
  <DataManager<Row>
    sourceData={rows}
    selectionKey="name"
    render={() => (
      <DataTable<Row> width={500} height={200} enableRowSelection>
        <DataTable.Column<Row> headerLabel="Name" fieldKey="name" />
        <DataTable.Column<Row> headerLabel="Location" fieldKey="location" />
        <DataTable.Column<Row> headerLabel="Alive" fieldKey="alive">
          {({ row }) => (row.alive ? 'Alive' : 'Dead')}
        </DataTable.Column>
        <DataTable.Column<Row> headerLabel="Age" fieldKey="age" />
      </DataTable>
    )}
  />
);

const ExplicitColumnWidthsExample = () => (
  <DataManager<Row>
    sourceData={rows}
    selectionKey="name"
    render={() => (
      <DataTable<Row> width={800} height={200} enableRowSelection>
        <DataTable.Column<Row> headerLabel="Name" fieldKey="name" width={1 / 2} />
        <DataTable.Column<Row> headerLabel="Location" fieldKey="location" width={1 / 4} />
        <DataTable.Column<Row> headerLabel="Age" fieldKey="age" width={1 / 4} />
      </DataTable>
    )}
  />
);

/*
const ExpandRowExample = () => (
  <DataTable<Row> rows={rows} width={500} height={200} border>
    <DataTable.Column<Row>
      isFixed
      headerLabel="Location"
      contentType="read-only"
      spanByFieldKey
      fieldKey="location"
    />
    <DataTable.Column<Row> isFixed headerLabel="Name" contentType="read-only" fieldKey="name" />
    <DataTable.Column<Row> headerLabel="Age" contentType="read-only" fieldKey="age" />
    <DataTable.Column<Row> headerLabel="Occupation" contentType="read-only">
      {({ row, gridState, expandRow, collapseRow }) => (
        <Box>
          {row.occupation}
          <Button onClick={gridState.isExpanded ? collapseRow : expandRow}>Expand</Button>
          {gridState.isExpanded && (
            <ul>
              {row.duties.map(duty => (
                <li key={duty}>{duty}</li>
              ))}
            </ul>
          )}
        </Box>
      )}
    </DataTable.Column>
  </DataTable>
);
*/
