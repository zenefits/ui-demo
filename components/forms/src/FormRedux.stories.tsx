import React, { Component } from 'react';
// @ts-ignore
import { action } from '@storybook/addon-actions';
import { reduxForm, Form, InjectedFormProps } from 'redux-form';
import { compose, graphql, ChildDataProps, MutationFunc } from 'react-apollo';
import gql from 'graphql-tag';
import moment from 'moment';

import { Box } from 'zbase';
import { Button } from 'z-frontend-elements';

import { storiesOf } from '../.storybook/storyHelpers';
import TextField from './fields/TextField';
import CheckboxField from './fields/CheckboxField';
import RadioField from './fields/RadioField';
import TextareaField from './fields/TextareaField';
import SelectField from './fields/SelectField';
import DatePickerField from './fields/DatePickerField';
import { FieldsWrapper, FormRow } from './fields/FieldWrapper';

const allStories = storiesOf('forms|ReduxForm (Deprecated)', module);

const selectOptions = [
  { value: 'yes', label: 'As a matter of fact, I have!' },
  { value: 'booked', label: `I've already booked my flight` },
  { value: 'no', label: 'Not yet' },
];

const planetOptions = [
  { value: 'mercury', label: 'Mercury' },
  { value: 'venus', label: 'Venus' },
  { value: 'mars', label: 'Mars' },
  { value: 'jupiter', label: 'Jupiter' },
];

const heightUnitOptions = [{ value: 'cm', label: 'Centimetre' }, { value: 'inch', label: 'Inch' }];

/**
 * Simple form with redux-form
 */

// define a type for form data, that is being collected by the form
interface SimpleFormData {
  username: string;
  email: string;
  newsletterEnabled: boolean;
  comment: string;
  moon: string;
  game: string;
  height: number;
  heightUnit: string;
  endDate: string;
}

// define component props
interface UserSimpleProps {
  createUser: (data: SimpleFormData) => any;
  onSaveIt?: () => any;
  data?: any;
}

// define a type for props that being injected by redux-form
type UserSimpleFormProps = InjectedFormProps<SimpleFormData, UserSimpleProps>;

// define a type that is a union of component props and injected props type
type UserSimplePropsCombined = UserSimpleProps & UserSimpleFormProps;

const radioButtonExample = (
  <FormRow label="Favorite Game">
    <RadioField name="game" value="camel-up" label="Camel Up" />
    <RadioField name="game" value="risk" label="Risk" />
    <RadioField name="game" value="catan" label="Settlers of Catan" />
  </FormRow>
);

class UserSimple extends Component<UserSimplePropsCombined> {
  render() {
    return (
      <Box p={2} w={[1, 4 / 5, 3 / 4, 2 / 3]}>
        <h2>Create new user</h2>
        <Form onSubmit={this.props.handleSubmit(this.props.createUser)}>
          <TextField
            label="Username *"
            name="username"
            required
            minLength={5}
            maxLength={20}
            tooltipText="Enter your username"
          />
          <TextField label="Email" type="email" name="email" required minLength={3} tooltipText="Enter your email" />
          <DatePickerField
            label="End date"
            name="endDate"
            required
            minDate={moment().toDate()}
            maxDate={moment()
              .add({ day: 10 })
              .toDate()}
          />
          <FormRow>
            <CheckboxField label="Sign up for newsletter" name="newsletterEnabled" />
          </FormRow>
          {radioButtonExample}
          <TextareaField label="Comment" name="comment" rows={4} helpText="Tell us something" />
          <DatePickerField label="Most recent moon voyage *" name="moonDate" maxDate={moment().toDate()} required />
          <SelectField label="Have you been to the Moon?" name="moon" options={selectOptions} required />
          <SelectField label="Which other planets have you visited?" name="planets" multi options={planetOptions} />
          <FieldsWrapper label="How tall are you?">
            <TextField w={[1 / 2, 1 / 3]} name="height" />
            <SelectField w={[1 / 2, 2 / 3]} name="heightUnit" options={heightUnitOptions} />
          </FieldsWrapper>{' '}
          <FormRow>
            <Button type="submit" mode="primary">
              Sign Up
            </Button>
          </FormRow>
        </Form>
      </Box>
    );
  }
}

// apply redux-form decorator
const UserSimpleWithForm = reduxForm<SimpleFormData, UserSimpleProps>({
  form: 'User',
  initialValues: { game: 'catan' },
})(UserSimple);

allStories.add('simple redux form', () => (
  <div>
    <UserSimpleWithForm createUser={action('submit-simple-form')} />
  </div>
));

/**
 * Redux Form with Apollo GraphQL queries and mutations
 */

// a sample query that component loads on mount
const sampleDataQuery = gql`
  query {
    dashboard {
      id
      company {
        name
        employees {
          id
        }
      }
      employee {
        first_name
      }
    }
  }
`;

// sample mutation that component runs on form submit
const submitUserMutation = gql`
  mutation SubmitUser($username: String!, $email: String!) {
    submitUser(username: $username, email: $email) {
      id
      createdAt
    }
  }
`;

// a type for the collected form data
type UserFormData = {
  username: string;
  email: string;
  newsletterEnabled: boolean;
  comment: string;
  moon: string;
  game: string;
  height: number;
  heightUnit: string;
};

// a type for our props for the component
type UserFormProps = {
  createUser?: () => any;
  onSaveIt?: () => any;
  mutate: MutationFunc<any, any>;
};

// a type for redux-form injected props
type PropsInjected = InjectedFormProps<UserFormData, UserFormProps>;
// combined type for our props and redux-form props
type AllProps = ChildDataProps<UserFormProps & PropsInjected, any, any>;

class UserGql extends Component<AllProps> {
  constructor(props: AllProps) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onSubmit(values: UserFormData) {
    console.log('onsubmit', values);
    this.props
      .mutate({ variables: values })
      .then(({ data }: any) => {
        console.log('got data', data);
      })
      .catch((error: any) => {
        console.log('there was an error sending the query', error);
      });
  }
  render() {
    const { loading, error, dashboard } = this.props.data;
    const loaded = !(loading || error);
    return (
      <Box p={2} w={[1, 4 / 5, 3 / 4, 2 / 3]}>
        <h2>Create new user</h2>
        <Box>
          Example of loading data with graphql:
          <br />
          Employee count: {loaded ? dashboard.company.employees.length : '...'}
        </Box>
        <Form onSubmit={this.props.handleSubmit(this.onSubmit)}>
          <TextField label="Username" name="username" required tooltipText="Enter your username" />
          <TextField label="Email" type="email" name="email" tooltipText="Enter your email" />
          <FormRow>
            <CheckboxField label="Sign up for newsletter" name="newsletterEnabled" />
          </FormRow>
          {radioButtonExample}
          <TextareaField label="Comment" name="comment" rows={4} helpText="Tell us something" />
          <DatePickerField label="Most recent moon voyage *" name="moonDate" minDate={moment().toDate()} required />
          <SelectField label="Have you been to the Moon?" name="moon" options={selectOptions} required />
          <SelectField label="Which other planets have you visited?" name="planets" multi options={planetOptions} />
          <FieldsWrapper label="How tall are you?">
            <TextField w={[1 / 2, 1 / 3]} name="height" required />
            <SelectField w={[1 / 2, 2 / 3]} name="heightUnit" options={heightUnitOptions} />
          </FieldsWrapper>
          <FormRow>
            <Button type="submit" mode="primary">
              Sign Up
            </Button>
          </FormRow>
        </Form>
      </Box>
    );
  }
}

const UserGqlWithData = compose(
  reduxForm<UserFormData, UserFormProps>({ form: 'form4' }),
  graphql<any, AllProps>(sampleDataQuery),
  graphql<any, AllProps>(submitUserMutation),
)(UserGql);

allStories.add('with graphql', () => <UserGqlWithData />);

interface TextFieldsFormData {
  minMax: string;
  money: string;
  percent: string;
}

type TextFieldsCombined = InjectedFormProps<TextFieldsFormData, {}>;

class TextFieldsForm extends Component<TextFieldsCombined> {
  render() {
    return (
      <Box p={2} w={[1, 4 / 5, 3 / 4, 2 / 3]}>
        <h2>Field examples</h2>
        <Form onSubmit={() => {}}>
          <TextField
            type="money"
            min={1000}
            max={5000}
            label="Money *"
            name="money"
            required
            tooltipText="Enter at least $1000"
          />
          <TextField
            type="percent"
            min={5}
            max={50}
            label="Percent *"
            name="percent"
            required
            tooltipText="Enter at least 5%"
          />
          <TextField
            label="Number *"
            name="minMax"
            required
            min={0}
            max={100}
            tooltipText="Enter a number between 0 and 100"
          />
        </Form>
      </Box>
    );
  }
}

interface TextFieldsFormProps {}

const TextFieldsWithData = reduxForm<TextFieldsFormData, TextFieldsFormProps>({
  form: 'TextFields',
})(TextFieldsForm);

allStories.add('Text fields', () => <TextFieldsWithData />);
