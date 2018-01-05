import React, { Component } from 'react';
import { Box } from 'rebass';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Form, reduxForm, InjectedFormProps } from 'redux-form';
import { gql, graphql, compose } from 'react-apollo';
import TextField from './fields/TextField';
import CheckboxField from './fields/CheckboxField';
import RadioField from './fields/RadioField';
import TextareaField from './fields/TextareaField';
import SelectField from './fields/SelectField';
import DatePickerField from './fields/DatePickerField';
import { FormRow } from './fields/FieldWrapper';
import Button from './Button';

const stories = storiesOf('Form', module);

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
}

// define component props
interface UserSimpleProps {
  createUser: (SimpleFormData) => any;
  onSaveIt?: () => any;
  data?: any;
}

const withDisabled = {
  disabledDays: {
    after: new Date(),
  },
};

// define a type for props that being injected by redux-form
declare type UserSimpleFormProps = InjectedFormProps<SimpleFormData, UserSimpleProps>;

// define a type that is a union of component props and injected props type
declare type UserSimplePropsCombined = UserSimpleProps & UserSimpleFormProps;

const radioButtonExample = (
  <FormRow label="Favorite Game">
    <RadioField name="game" value="camel-up" label="Camel Up" />
    <RadioField name="game" value="risk" label="Risk" />
    <RadioField name="game" value="catan" label="Settlers of Catan" />
  </FormRow>
);

class UserSimple extends Component<UserSimplePropsCombined> {
  render() {
    const { invalid } = this.props;
    return (
      <Box p={2} w={[1, 1 / 2]}>
        <h2>Create new user</h2>
        <Form onSubmit={this.props.handleSubmit(this.props.createUser)}>
          <TextField label="Username *" name="username" validate={required} />
          <TextField label="Email" type="email" name="email" />
          <FormRow>
            <CheckboxField label="Sign up for newsletter" name="newsletterEnabled" />
          </FormRow>
          {radioButtonExample}
          <TextareaField label="Comment" name="comment" rows={4} helpText="Tell us something" />
          <DatePickerField
            label="Most recent moon voyage *"
            name="moonDate"
            pickerOptions={withDisabled}
            validate={required}
          />
          <SelectField label="Have you been to the Moon?" name="moon" options={selectOptions} />
          <SelectField label="Which other planets have you visited?" name="planets" multi options={planetOptions} />
          <FormRow>
            <Button type="submit" mode="primary" disabled={invalid}>
              Sign Up
            </Button>
          </FormRow>
        </Form>
      </Box>
    );
  }
}

const required = value => (value ? undefined : 'Required');

// apply redux-form decorator
const UserSimpleWithForm = reduxForm<SimpleFormData, UserSimpleProps>({
  form: 'User',
  initialValues: { game: 'catan' },
})(UserSimple);

stories.add('simple redux form', () => (
  <div>
    <p>Forms should be used for any data input.</p>
    <UserSimpleWithForm createUser={action('submit-simple-form')} />
  </div>
));

/**
 * Redux Form with Apollo GraphQL queries and mutations
 */

// a sample query that component loads on mount
const sampleDataQuery = gql`
  query {
    dashboard(id: "me") {
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
  mutation submitUser($username: String!, $email: String!) {
    submitUser(username: $username, email: $email) {
      id
      createdAt
    }
  }
`;

// a type for the collected form data
declare type UserFormData = {
  username: string;
  email: string;
  newsletterEnabled: boolean;
  comment: string;
  moon: string;
  foo: string;
};

// a type for our props for the component
declare type UserFormProps = {
  createUser?: () => any;
  onSaveIt?: () => any;
  data?: any;
  mutate?: (any) => any;
};

// a type for redux-form injected props
declare type PropsInjected = InjectedFormProps<UserFormData, UserFormProps>;
// combined type for our props and redux-form props
declare type AllProps = UserFormProps & PropsInjected;

class UserGql extends Component<AllProps> {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onSubmit(values: UserFormData) {
    this.props
      .mutate({ variables: values })
      .then(({ data }) => {
        console.log('got data', data);
      })
      .catch(error => {
        console.log('there was an error sending the query', error);
      });
  }
  render() {
    const { loading, error, dashboard } = this.props.data;
    const loaded = !(loading || error);
    return (
      <Box p={2} w={[1, 1 / 2]}>
        <h2>Create new user</h2>
        <Box>
          Example of loading data with graphql:<br />
          Employee count: {loaded ? dashboard.company.employees.length : '...'}
        </Box>
        <Form onSubmit={this.props.handleSubmit(this.onSubmit)}>
          <TextField label="Username" name="username" required />
          <TextField label="Email" type="email" name="email" />
          <FormRow>
            <CheckboxField label="Sign up for newsletter" name="newsletterEnabled" />
          </FormRow>
          <SelectField name="foo" label="Test" />
          {radioButtonExample}
          <TextareaField label="Comment" name="comment" rows={4} helpText="Tell us something" />
          <DatePickerField label="Most recent moon voyage" name="moonDate" />
          <SelectField label="Have you been to the Moon?" name="moon" options={selectOptions} />
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

stories.add('with graphql', () => (
  <div>
    <p>Forms should be used for any data input.</p>

    <UserGqlWithData />
  </div>
));
