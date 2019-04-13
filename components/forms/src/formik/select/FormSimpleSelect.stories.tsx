import React from 'react';
// @ts-ignore
import { action } from '@storybook/addon-actions';

import { Box } from 'zbase';

import { storiesOf } from '../../../.storybook/storyHelpers';
import { Form } from '../Form';

storiesOf('forms|Form.SimpleSelect', module)
  .addDecorator((getStory: Function) => (
    <Box p={20} w={[1, 1 / 2]} bg="grayscale.white">
      {getStory()}
    </Box>
  ))
  .add('default', () => <DefaultExample />)
  .add('not clearable', () => <UnclearableExample />)
  .add('option values as objects', () => <ObjectOptionsExample />)
  .add('grouped options', () => <GroupsExample />)
  .add('disabled options', () => <DisabledOptionExample />);

const optionList = ['Chicken', 'Beef', 'Fish', 'Tofu'];

const DefaultExample = () => (
  <Form
    onSubmit={() => {}}
    initialValues={{ entree: 'Tofu' }}
    validationSchema={{ entree: Form.Yup.string().required('Entree is a required field') }}
  >
    <Form.SimpleSelect<string> name="entree" label="Entree" onChange={action('Select updated')} getOptionText={o => o}>
      {({ SelectOption }) => optionList.map(option => <SelectOption key={option} option={option} />)}
    </Form.SimpleSelect>
  </Form>
);

const UnclearableExample = () => (
  <Form
    onSubmit={() => {}}
    initialValues={{ entree: 'Tofu' }}
    validationSchema={{ entree: Form.Yup.string().required('Entree is a required field') }}
  >
    <Form.SimpleSelect<string> name="entree" label="Entree" clearable={false} getOptionText={o => o}>
      {({ SelectOption }) => optionList.map(option => <SelectOption key={option} option={option} />)}
    </Form.SimpleSelect>
  </Form>
);

const objectsList = [
  { id: 0, label: 'Chicken' },
  { id: 1, label: 'Beef' },
  { id: 2, label: 'Fish' },
  { id: 3, label: 'Tofu' },
];

const ObjectOptionsExample = () => (
  <Form
    onSubmit={() => {}}
    initialValues={{ entree: { id: 0, label: 'Chicken' } }}
    validationSchema={{
      entree: Form.Yup.object()
        .nullable(true)
        .required('Entree is a required field'),
    }}
  >
    <Form.SimpleSelect<{ id: number; label: string }>
      name="entree"
      label="Entree"
      onChange={action('Select updated')}
      getOptionText={o => o.label}
    >
      {({ SelectOption }) => objectsList.map(option => <SelectOption key={option.id} option={option} />)}
    </Form.SimpleSelect>
  </Form>
);

const groupedOptionList = [
  {
    groupName: 'Androids',
    options: ['C-3PO', 'Data', 'The Terminator'],
  },
  {
    groupName: 'Humans',
    options: ['Luke Skywalker', 'Jean-Luc Picard', 'Sarah Connor'],
  },
];

const GroupsExample = () => (
  <Form
    onSubmit={() => {}}
    initialValues={{ entree: 'Tofu' }}
    validationSchema={{ entree: Form.Yup.string().required('Entree is a required field') }}
  >
    <Form.SimpleSelect<string> name="entree" label="Entree" onChange={action('Select updated')} getOptionText={o => o}>
      {({ SelectOption, SelectGroup }) =>
        groupedOptionList.map(group => (
          <SelectGroup key={group.groupName} label={group.groupName}>
            {group.options.map(option => (
              <SelectOption option={option} key={option} />
            ))}
          </SelectGroup>
        ))
      }
    </Form.SimpleSelect>
  </Form>
);

const DisabledOptionExample = () => (
  <Form
    onSubmit={() => {}}
    initialValues={{ entree: 'Tofu' }}
    validationSchema={{ entree: Form.Yup.string().required('Entree is a required field') }}
  >
    <Form.SimpleSelect<string> name="entree" label="Entree" onChange={action('Select updated')} getOptionText={o => o}>
      {({ SelectOption }) =>
        optionList.map((option, i) => <SelectOption key={option} option={option} disabled={i === 0} />)
      }
    </Form.SimpleSelect>
  </Form>
);
