import React from 'react';
// @ts-ignore
import { action } from '@storybook/addon-actions';

import { Box, Flex } from 'zbase';
import { Button } from 'z-frontend-elements';

import { storiesOf } from '../../../.storybook/storyHelpers';
import { Form, FormMultiSelect } from '../../..';
import { simulateNetworkDelay } from '../Form.stories';

storiesOf('forms|Form.MultiSelect', module)
  .addDecorator((getStory: Function) => (
    <Box p={20} w={[1, 1 / 2]} bg="grayscale.white">
      {getStory()}
    </Box>
  ))
  .add('default', () => <DefaultExample />)
  .add('help text', () => <DefaultExample helpText="The main course of your meal." />)
  .add('custom rendering', () => <CustomRenderingExample />)
  .add('add new option', () => <AddNewExample />)
  .add('with validation', () => <ValidationExample />)
  .add('select all', () => <SelectAllExample />);

const optionList = [
  { id: 1, label: 'Chicken' },
  { id: 2, label: 'Beef' },
  { id: 3, label: 'Fish' },
];
const stringOptionList = ['Chicken', 'Beef', 'Fish', 'Tofu'];

const DefaultExample = (fieldProps: any) => (
  <Form
    onSubmit={values => simulateNetworkDelay(() => action('multiselect-default-submit')(values))}
    initialValues={{ entree: [optionList[1]] }}
  >
    <FormMultiSelect<{ id: number; label: string }>
      name="entree"
      label="Entree"
      getOptionText={o => o.label}
      onChange={action('Select value changed')}
      {...fieldProps}
    >
      {({ SelectOption, multiOptionFilter }) =>
        multiOptionFilter(optionList).map(option => <SelectOption key={option.id} option={option} />)
      }
    </FormMultiSelect>
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
  <Form onSubmit={() => {}} initialValues={{ entree: [entreesWithPrices[0]] }}>
    <FormMultiSelect<{ id: number; label: string; price: string }>
      name="entree"
      label="Entree"
      getOptionText={o => o.label}
    >
      {({ SelectOption, multiOptionFilter, withMatchEmphasis }) =>
        multiOptionFilter(entreesWithPrices).map(option => (
          <SelectOption key={option.id} option={option}>
            <Flex justify="space-between">
              {withMatchEmphasis(option.label)}
              {option.price}
            </Flex>
          </SelectOption>
        ))
      }
    </FormMultiSelect>
  </Form>
);

const AddNewExample = () => (
  <Form onSubmit={() => {}} initialValues={{ entree: ['Tofu'] }}>
    <FormMultiSelect<string>
      name="entree"
      label="Entree"
      onCreateNewOption={() => alert('Create new entree callback fired')}
      getOptionText={o => o}
    >
      {({ SelectOption, multiOptionFilter, NewOption }) => (
        <>
          <NewOption>Add New Entree...</NewOption>
          {multiOptionFilter(stringOptionList).map(option => (
            <SelectOption key={option} option={option} />
          ))}
        </>
      )}
    </FormMultiSelect>
  </Form>
);

const SelectAllExample = () => (
  <Form onSubmit={() => {}} initialValues={{ entree: ['Tofu'] }}>
    {({ setFieldValue }) => (
      <>
        <FormMultiSelect<string> name="entree" label="Entree" getOptionText={o => o}>
          {({ SelectOption, multiOptionFilter }) => (
            <>
              {multiOptionFilter(stringOptionList).map(option => (
                <SelectOption key={option} option={option} />
              ))}
            </>
          )}
        </FormMultiSelect>
        <Button
          onClick={() => {
            setFieldValue('entree', stringOptionList);
          }}
          s="small"
        >
          Select All Entrees
        </Button>
      </>
    )}
  </Form>
);

// Validation Example
const ValidationExample = () => (
  <Form
    onSubmit={() => {}}
    initialValues={{ entree: ['Tofu'] }}
    validationSchema={{ entree: Form.Yup.array().required('Please select at least one entree') }}
  >
    <FormMultiSelect<string> name="entree" label="Entree" getOptionText={o => o}>
      {({ SelectOption, multiOptionFilter }) =>
        multiOptionFilter(stringOptionList).map(option => <SelectOption key={option} option={option} />)
      }
    </FormMultiSelect>
  </Form>
);
