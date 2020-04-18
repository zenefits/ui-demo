import React from 'react';

import { Box } from 'zbase';
import { Button } from 'z-frontend-elements';
import { skipVisualTest } from 'z-frontend-app-bootstrap';

import { storiesOf } from '../../../.storybook/storyHelpers';
import { Form, FormOpenListSelect } from '../../..';

storiesOf('forms|Form.OpenListSelect', module)
  .addDecorator((getStory: Function) => (
    <Box p={20} w={[1, 1 / 2]} bg="grayscale.white">
      {getStory()}
    </Box>
  ))
  .add('default', () => <DefaultExample />)
  .add('grouped', () => <GroupsExample />)
  .add('sizes', () => <SizesExample />)
  .add('with external reset', () => <ExternalResetExample />, skipVisualTest);

// Default Example
const fruits = ['Apple', 'Banana', 'Grapefruit', 'Strawberry', 'Blueberry', 'Lemon', 'Lime', 'Orange', 'Mango', 'Kiwi'];
const fruitOptions = fruits.map(fruit => ({ label: fruit, value: fruit }));

const DefaultExample = () => (
  <Form onSubmit={() => {}} initialValues={{ fruit: '' }}>
    <FormOpenListSelect<{ label: string; value: string }> name="fruit" label="Fruit" getOptionText={o => o.label}>
      {({ SelectOption }) => fruitOptions.map(fruit => <SelectOption option={fruit} key={fruit.value} />)}
    </FormOpenListSelect>
  </Form>
);

// Groups Example
const groups = [
  {
    groupName: 'Warriors',
    options: [
      { value: '30', label: 'Steph' },
      { value: '35', label: 'Kevin' },
      { value: '11', label: 'Klay' },
      { value: '23', label: 'Draymond' },
    ],
  },
  {
    groupName: 'Celtics',
    options: [
      { value: '11', label: 'Kyrie' },
      { value: '0', label: 'Jayson' },
      { value: '7', label: 'Jaylen' },
      { value: '20', label: 'Gordon' },
      { value: '42', label: 'Al' },
    ],
  },
];

const GroupsExample = () => (
  <Form onSubmit={() => {}} initialValues={{ value: 30, label: 'Steph' }}>
    <FormOpenListSelect<{ value: string; label: string }> name="player" label="Player" getOptionText={o => o.label}>
      {({ SelectGroup, SelectOption }) =>
        groups.map(group => (
          <SelectGroup label={group.groupName} key={group.groupName}>
            {group.options.map(option => (
              <SelectOption option={option} key={option.value} />
            ))}
          </SelectGroup>
        ))
      }
    </FormOpenListSelect>
  </Form>
);

// Sizes example
const SizesExample = () => (
  <>
    <Form onSubmit={() => {}} initialValues={{ fruit: 'Grapefruit' }}>
      <FormOpenListSelect<string> name="fruit" label="Fruit (large)" s="large" getOptionText={o => o}>
        {({ SelectOption }) => fruits.map(fruit => <SelectOption option={fruit} key={fruit} />)}
      </FormOpenListSelect>
    </Form>
    <Form onSubmit={() => {}} initialValues={{ fruit: 'Grapefruit' }}>
      <FormOpenListSelect<string> name="fruit" label="Fruit (medium)" s="medium" getOptionText={o => o}>
        {({ SelectOption }) => fruits.map(fruit => <SelectOption option={fruit} key={fruit} />)}
      </FormOpenListSelect>
    </Form>
    <Form onSubmit={() => {}} initialValues={{ fruit: 'Grapefruit' }}>
      <FormOpenListSelect<string> name="fruit" label="Fruit (small)" s="small" getOptionText={o => o}>
        {({ SelectOption }) => fruits.map(fruit => <SelectOption option={fruit} key={fruit} />)}
      </FormOpenListSelect>
    </Form>
  </>
);

const ExternalResetExample = () => (
  <Form onSubmit={() => {}} initialValues={{ fruit: '' }}>
    {({ setFieldValue }) => (
      <>
        <FormOpenListSelect<{ label: string; value: string }> name="fruit" label="Fruit" getOptionText={o => o.label}>
          {({ SelectOption }) => fruitOptions.map(fruit => <SelectOption option={fruit} key={fruit.value} />)}
        </FormOpenListSelect>
        <Button
          s="small"
          onClick={() => {
            setFieldValue('fruit', '');
          }}
        >
          Reset
        </Button>
      </>
    )}
  </Form>
);
