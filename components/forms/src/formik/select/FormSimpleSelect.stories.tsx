import React from 'react';
// @ts-ignore
import { action } from '@storybook/addon-actions';

import { Box } from 'zbase';
import { Button } from 'z-frontend-elements';

import { storiesOf } from '../../../.storybook/storyHelpers';
import { Form, FormSimpleSelect } from '../../..';

storiesOf('forms|Form.SimpleSelect', module)
  .addDecorator((getStory: Function) => (
    <Box p={20} w={[1, 1 / 2]} bg="grayscale.white">
      {getStory()}
    </Box>
  ))
  .add('default', () => <DefaultExample />)
  .add('placeholder', () => <PlaceholderExample />)
  .add('with help text', () => <DefaultExample helpText="Choose your main meal." />)
  .add('not clearable', () => <DefaultExample clearable={false} />)
  .add('option values as objects', () => <ObjectOptionsExample />)
  .add('grouped options', () => <GroupsExample />)
  .add('disabled options', () => <DisabledOptionExample />)
  .add('displayOnly', () => <DisplayOnlyExample />);

const optionList = ['Chicken', 'Beef', 'Fish', 'Tofu'];

const commonFormProps = {
  onSubmit: () => {},
  initialValues: { entree: 'Tofu' },
  validationSchema: { entree: Form.Yup.string().required('Entree is a required field') },
};

const DefaultExample = (fieldProps: any) => (
  <Form {...commonFormProps}>
    <FormSimpleSelect<string>
      name="entree"
      label="Entree"
      onChange={action('Select updated')}
      getOptionText={o => o}
      {...fieldProps}
    >
      {({ SelectOption }) => optionList.map(option => <SelectOption key={option} option={option} />)}
    </FormSimpleSelect>
  </Form>
);

const PlaceholderExample = () => (
  <Form onSubmit={() => {}} initialValues={{}}>
    <FormSimpleSelect<string> name="entree" label="Entree" getOptionText={o => o}>
      {({ SelectOption }) => optionList.map(option => <SelectOption key={option} option={option} />)}
    </FormSimpleSelect>
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
    <FormSimpleSelect<{ id: number; label: string }>
      name="entree"
      label="Entree"
      onChange={action('Select updated')}
      getOptionText={o => o.label}
    >
      {({ SelectOption }) => objectsList.map(option => <SelectOption key={option.id} option={option} />)}
    </FormSimpleSelect>
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
  <Form {...commonFormProps}>
    <FormSimpleSelect<string> name="entree" label="Entree" onChange={action('Select updated')} getOptionText={o => o}>
      {({ SelectOption, SelectGroup }) =>
        groupedOptionList.map(group => (
          <SelectGroup key={group.groupName} label={group.groupName}>
            {group.options.map(option => (
              <SelectOption option={option} key={option} />
            ))}
          </SelectGroup>
        ))
      }
    </FormSimpleSelect>
  </Form>
);

const DisabledOptionExample = () => (
  <Form {...commonFormProps}>
    <FormSimpleSelect<string> name="entree" label="Entree" onChange={action('Select updated')} getOptionText={o => o}>
      {({ SelectOption }) =>
        optionList.map((option, i) => <SelectOption key={option} option={option} disabled={i === 0} />)
      }
    </FormSimpleSelect>
  </Form>
);

const commonDisplayProps = {
  name: 'entree',
  label: 'Entree',
  getOptionText: (o: string) => o,
  containerProps: { mb: 3 },
};

const optionsRenderProp = ({ SelectOption }: any) =>
  optionList.map(option => <SelectOption key={option} option={option} />);

class DisplayOnlyExample extends React.Component {
  state = {
    displayOnly: true,
  };

  render() {
    const { displayOnly } = this.state;
    return (
      <Box>
        <Form onSubmit={() => {}} initialValues={{ entree: 'Tofu' }}>
          <FormSimpleSelect<string> {...commonDisplayProps} s="small" displayOnly={displayOnly}>
            {optionsRenderProp}
          </FormSimpleSelect>
          <FormSimpleSelect<string> {...commonDisplayProps} s="medium" displayOnly={displayOnly}>
            {optionsRenderProp}
          </FormSimpleSelect>
          <FormSimpleSelect<string> {...commonDisplayProps} s="large" displayOnly={displayOnly}>
            {optionsRenderProp}
          </FormSimpleSelect>
        </Form>
        <Button onClick={() => this.setState({ displayOnly: !displayOnly })}>Toggle mode</Button>
      </Box>
    );
  }
}
