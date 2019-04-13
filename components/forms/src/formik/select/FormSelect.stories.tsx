import React from 'react';
// @ts-ignore
import { action } from '@storybook/addon-actions';

import { Box, Flex } from 'zbase';
import { Button } from 'z-frontend-elements';
import { skipVisualTest } from 'z-frontend-app-bootstrap';

import { storiesOf } from '../../../.storybook/storyHelpers';
import { Form } from '../Form';
import { simulateNetworkDelay } from '../Form.stories';

storiesOf('forms|Form.Select', module)
  .addDecorator((getStory: Function) => (
    <Box p={20} w={[1, 1 / 2]} bg="grayscale.white">
      {getStory()}
    </Box>
  ))
  .add('default', () => <DefaultExample />)
  .add('optional', () => <OptionalExample />)
  .add('custom rendering', () => <CustomRenderingExample />)
  .add('groups', () => <GroupsExample />)
  .add('async option loading', () => <AsyncExample />)
  .add('add new option', () => <AddNewExample />)
  .add('sizes', () => <SizesExample />)
  .add('disabled options', () => <DisabledOptionExample />)
  .add('with external reset', () => <ExternalResetExample />, skipVisualTest);

// Default example
const optionList = [{ id: 1, label: 'Chicken' }, { id: 2, label: 'Beef' }, { id: 3, label: 'Tofu' }];

const defaultValidationSchema = {
  entree: Form.Yup.object()
    .nullable(true)
    .required('Entree is a required field.'),
};

const DefaultExample = () => (
  <Form
    onSubmit={values => simulateNetworkDelay(() => action('select-default-submit')(values))}
    initialValues={{ entree: null }}
    validationSchema={defaultValidationSchema}
  >
    <Form.Select<{ id: number; label: string }> name="entree" label="Entree" getOptionText={o => o.label}>
      {({ SelectOption, basicOptionFilter }) =>
        basicOptionFilter(optionList).map(option => <SelectOption key={option.id} option={option} />)
      }
    </Form.Select>
    <Form.Footer primaryText="Submit" />
  </Form>
);

// Optional example
const optionalExampleValidationSchema = {
  name: Form.Yup.string().required('name is a required field.'),
};

const OptionalExample = () => (
  <Form
    onSubmit={values => simulateNetworkDelay(() => action('select-optional-submit')(values))}
    initialValues={{ name: '', entree: null }}
    validationSchema={optionalExampleValidationSchema}
  >
    <Form.TextInput name="name" label="Name" />
    <Form.Select<{ id: number; label: string }> name="entree" label="Entree" getOptionText={o => o.label} optional>
      {({ SelectOption, basicOptionFilter }) =>
        basicOptionFilter(optionList).map(option => <SelectOption key={option.id} option={option} />)
      }
    </Form.Select>
    <Form.Footer primaryText="Submit" />
  </Form>
);

// Custom rendering example
const entreesWithPrices = [
  { id: 1, label: 'Chicken', price: '$10.00' },
  { id: 2, label: 'Beef', price: '$12.00' },
  { id: 3, label: 'Tofu', price: '8.00' },
];
const CustomRenderingExample = () => (
  <Form onSubmit={() => {}} initialValues={{ entree: entreesWithPrices[0] }}>
    <Form.Select<{ id: number; label: string; price: string }>
      name="entree"
      label="Entree"
      getOptionText={o => o.label}
    >
      {({ SelectOption, basicOptionFilter, withMatchEmphasis }) =>
        basicOptionFilter(entreesWithPrices).map(option => (
          <SelectOption key={option.id} option={option}>
            <Flex justify="space-between">
              {withMatchEmphasis(option.label)}
              {option.price}
            </Flex>
          </SelectOption>
        ))
      }
    </Form.Select>
  </Form>
);

// Groups example
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
    fruits: ['Apple', 'Mango', 'Kiwi'],
  },
];

const GroupsExample = () => (
  <Form onSubmit={() => {}} initialValues={{ fruit: 'Orange' }}>
    <Form.Select<string> name="fruit" label="Fruit" placeholder="Select a Fruit..." getOptionText={o => o}>
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
    </Form.Select>
  </Form>
);

// Add new example
const AddNewExample = () => (
  <Form onSubmit={() => {}} initialValues={{ entree: null }}>
    <Form.Select<{ id: number; label: string }>
      name="entree"
      label="Entree"
      onCreateNewOption={() => alert('Create new entree callback fired')}
      getOptionText={o => o.label}
    >
      {({ SelectOption, basicOptionFilter, NewOption }) => (
        <>
          <NewOption>Create New Entree...</NewOption>
          {basicOptionFilter(optionList).map(option => (
            <SelectOption key={option.id} option={option} />
          ))}
        </>
      )}
    </Form.Select>
  </Form>
);

// Async example
const fruits = ['Apple', 'Banana', 'Lemon', 'Lime', 'Orange', 'Mango', 'Kiwi'];
type FormState = { isLoadingFruit: boolean; options: string[] };

class AsyncExample extends React.Component<{}, FormState> {
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
      <Form onSubmit={() => {}} initialValues={{}}>
        <Form.Select<string>
          name="fruit"
          label="Fruit"
          onInputValueChange={this.updateOptions}
          isLoading={isLoadingFruit}
          getOptionText={o => o}
        >
          {({ SelectOption }) => options.map(fruit => <SelectOption option={fruit} key={fruit} />)}
        </Form.Select>
      </Form>
    );
  }
}

// Sizes example

const stringOptionList = ['Chicken', 'Beef', 'Fish', 'Tofu', 'Dirt and Rocks'];
const SizesExample = () => (
  <Form onSubmit={() => {}} initialValues={{}}>
    <Form.Select<string> name="large" label="Large" s="large" getOptionText={o => o}>
      {({ SelectOption, basicOptionFilter }) =>
        basicOptionFilter(stringOptionList).map(option => <SelectOption key={option} option={option} />)
      }
    </Form.Select>
    <Form.Select<string> name="medium" label="Medium" s="medium" getOptionText={o => o}>
      {({ SelectOption, basicOptionFilter }) =>
        basicOptionFilter(stringOptionList).map(option => <SelectOption key={option} option={option} />)
      }
    </Form.Select>
    <Form.Select<string> name="small" label="Small" s="small" getOptionText={o => o}>
      {({ SelectOption, basicOptionFilter }) =>
        basicOptionFilter(stringOptionList).map(option => <SelectOption key={option} option={option} />)
      }
    </Form.Select>
  </Form>
);

const DisabledOptionExample = () => (
  <Form onSubmit={() => {}} initialValues={{}}>
    <Form.Select<string> name="fruit" label="Fruit" getOptionText={o => o}>
      {({ SelectOption, basicOptionFilter }) =>
        basicOptionFilter(stringOptionList).map((option, i) => (
          <SelectOption key={option} option={option} disabled={i === 0} />
        ))
      }
    </Form.Select>
  </Form>
);

const ExternalResetExample = () => (
  <Form onSubmit={() => {}} initialValues={{}}>
    {({ setFieldValue }) => (
      <>
        <Form.Select<string> name="fruit" label="Fruit" getOptionText={o => o}>
          {({ SelectOption, basicOptionFilter }) =>
            basicOptionFilter(stringOptionList).map((option, i) => <SelectOption key={option} option={option} />)
          }
        </Form.Select>
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
