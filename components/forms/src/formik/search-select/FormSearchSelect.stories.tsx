import React from 'react';
// @ts-ignore
import { action } from '@storybook/addon-actions';

import { Box } from 'zbase';
import { Button } from 'z-frontend-elements';
import { skipVisualTest } from 'z-frontend-app-bootstrap';

import { storiesOf } from '../../../.storybook/storyHelpers';
import { Form, FormSearchSelect } from '../../..';
import { simulateNetworkDelay } from '../Form.stories';

storiesOf('forms|Form.SearchSelect', module)
  .addDecorator((getStory: Function) => (
    <Box p={20} w={[1, 1 / 2]} bg="grayscale.white">
      {getStory()}
    </Box>
  ))
  .add('default', () => <ExampleDefault />)
  .add('async option loading', () => <ExampleAsync />)
  .add('grouped options', () => <ExampleGroups />)
  .add('expanded, no icon', () => <OmitIconExample />)
  .add('with select side effect', () => <ExampleSelectSideEffect />)
  .add('with external reset', () => <ExampleExternalReset />, skipVisualTest);

const fruits = ['Apple', 'Banana', 'Grapefruit', 'Strawberry', 'Blueberry', 'Lemon', 'Lime', 'Orange', 'Mango', 'Kiwi'];

const ExampleDefault = () => (
  <Form
    initialValues={{}}
    onSubmit={values => simulateNetworkDelay(() => action('search-select-default-submit')(values))}
  >
    <FormSearchSelect<string>
      name="fruit"
      label="Fruit"
      onSelect={action('Item selected')}
      onBlur={action('Input blurred')}
      getOptionText={o => o}
    >
      {({ SelectOption, basicOptionFilter }) =>
        basicOptionFilter(fruits).map(fruit => <SelectOption option={fruit} key={fruit} />)
      }
    </FormSearchSelect>
    <Form.Footer primaryText="Submit" />
  </Form>
);

type FormState = { isLoadingFruit: boolean; options: string[] };

class ExampleAsync extends React.Component<{}, FormState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      options: fruits,
      isLoadingFruit: false,
    };
  }

  updateOptions = (value: string) => {
    const checkOption = (option: string) => option.toLowerCase().indexOf(value.toLowerCase()) !== -1;

    this.setState({ isLoadingFruit: true });

    setTimeout(() => {
      this.setState({
        options: fruits.filter(checkOption),
        isLoadingFruit: false,
      });
    }, 300);
  };

  render() {
    const { isLoadingFruit, options } = this.state;
    return (
      <Form onSubmit={() => {}} initialValues={{ fruit: undefined }}>
        <FormSearchSelect<string>
          name="fruit"
          label="Fruit"
          onChange={this.updateOptions}
          isLoading={isLoadingFruit}
          getOptionText={o => o}
        >
          {({ SelectOption }) => options.map(fruit => <SelectOption option={fruit} key={fruit} />)}
        </FormSearchSelect>
      </Form>
    );
  }
}

const OmitIconExample = () => (
  <Form onSubmit={() => {}} initialValues={{ fruit: '' }}>
    <FormSearchSelect<string>
      name="fruit"
      label="Fruit"
      alwaysExpandInput
      omitIcon
      placeholder="Enter a fruit..."
      getOptionText={o => o}
    >
      {({ SelectOption, basicOptionFilter }) =>
        basicOptionFilter(fruits).map(fruit => <SelectOption option={fruit} key={fruit} />)
      }
    </FormSearchSelect>
  </Form>
);

const fruitGroups = [
  {
    label: 'Citrus',
    fruits: ['Orange', 'Lemon', 'Lime', 'Grapefruit'],
  },
  {
    label: 'Berry',
    fruits: ['Strawberry', 'Raspberry', 'Blueberry'],
  },
  {
    label: 'Other',
    fruits: ['Apple', 'Banana', 'Mango', 'Kiwi'],
  },
];

const ExampleGroups = () => (
  <Form onSubmit={() => {}} initialValues={{ fruit: 'Orange' }}>
    <FormSearchSelect<string> name="fruit" label="Fruit" getOptionText={o => o}>
      {({ SelectOption, SelectGroup, basicOptionFilter }) =>
        fruitGroups.map(group => {
          const filteredFruits = basicOptionFilter(group.fruits);
          if (filteredFruits.length === 0) {
            return null;
          } else {
            return (
              <SelectGroup label={group.label} key={group.label}>
                {filteredFruits.map(fruit => (
                  <SelectOption key={fruit} option={fruit} />
                ))}
              </SelectGroup>
            );
          }
        })
      }
    </FormSearchSelect>
  </Form>
);

const fruitObjects = [
  { id: 1, name: 'Apple' },
  { id: 2, name: 'Banana' },
  { id: 3, name: 'Grapefruit' },
];

const ExampleSelectSideEffect = () => (
  <Form onSubmit={() => {}} initialValues={{ fruit: 'Orange' }}>
    <FormSearchSelect<{ id: number; name: string }>
      name="fruit"
      label="Fruit"
      onSelect={option => alert(`Select callback fired on option: ${option}`)}
      getOptionText={o => o.name}
    >
      {({ SelectOption, basicOptionFilter }) =>
        basicOptionFilter(fruitObjects).map(fruit => <SelectOption key={fruit.id} option={fruit} />)
      }
    </FormSearchSelect>
  </Form>
);

const ExampleExternalReset = () => (
  <Form onSubmit={() => {}} initialValues={{ fruit: 'Orange' }}>
    {({ setFieldValue }) => (
      <>
        <FormSearchSelect<{ id: number; name: string }> name="fruit" label="Fruit" getOptionText={o => o.name}>
          {({ SelectOption, basicOptionFilter }) =>
            basicOptionFilter(fruitObjects).map(fruit => <SelectOption key={fruit.id} option={fruit} />)
          }
        </FormSearchSelect>
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
