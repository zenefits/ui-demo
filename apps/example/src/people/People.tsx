import React, { Component } from 'react';

import { DataManager, DataPager } from 'z-frontend-data-manager';
import { DataTable } from 'z-frontend-tables';
import { DataLayout, PageLayout } from 'z-frontend-layout';

type Row = {
  name: string;
  location: string;
  alive: boolean;
  age: number;
  occupation: string;
  duties: string[];
  salary?: number;
};

// NOTE: usually fetched with graphql
const peopleData: Row[] = [
  {
    name: 'Fred Flintstone',
    location: 'Bedrock',
    alive: true,
    age: 46,
    occupation: 'Caveman',
    duties: ['Works on rocks', 'Feed Dino'],
    salary: 100,
  },
  {
    name: 'Wilma Flintstone',
    location: 'Bedrock',
    alive: true,
    age: 36,
    occupation: 'Caveman',
    duties: ['Bailing out Fred', 'Caring for Pebbles'],
    salary: 10000,
  },
  {
    name: 'Barney Rubble',
    location: 'Bedrock',
    alive: true,
    age: 48,
    occupation: 'Caveman',
    duties: ['Works on rocks', 'Watch Bamm-Bamm'],
  },
  {
    name: 'Pebbles Flintstone',
    location: 'Bedrock',
    alive: true,
    age: 1,
    occupation: 'Infant',
    duties: ['Be cute', 'Require constant attention'],
  },
  {
    name: 'Luke Skywalker',
    location: 'Tatooine',
    alive: true,
    age: 20,
    occupation: 'Field hand',
    duties: ['Fix droids', 'Learn lightsaber'],
  },
  {
    name: 'Leia Skywalker',
    location: 'Tatooine',
    alive: true,
    age: 20,
    occupation: 'Rebel Leader',
    duties: ['Plan attacks'],
  },
  {
    name: 'Anakin skywalker',
    location: 'Tatooine',
    alive: false,
    age: 50,
    occupation: 'Sith Lord',
    duties: ['Obey the emperor', 'Crush the rebels'],
  },
];

const PeopleTable = () => (
  <DataTable<Row> border={false}>
    <DataTable.Column<Row> headerLabel="Name" fieldKey="name" />
    <DataTable.Column<Row> headerLabel="Location" fieldKey="location" />
    <DataTable.Column<Row> headerLabel="Age" fieldKey="age" textAlign="right" />
    <DataTable.Column<Row> headerLabel="Alive" fieldKey="alive">
      {params => {
        return params.row.alive ? 'Alive' : 'Dead';
      }}
    </DataTable.Column>
  </DataTable>
);

export default class PeoplePage extends Component<{}> {
  render() {
    return (
      <PageLayout mode="fluid" columns="12" data-testid="PageLayout">
        <PageLayout.Main>
          <DataManager<Row>
            sourceData={peopleData}
            selectionKey="name"
            initialPageSize="xs"
            render={() => <DataLayout title="People" main={<PeopleTable />} pager={<DataPager />} />}
          />
        </PageLayout.Main>
      </PageLayout>
    );
  }
}
