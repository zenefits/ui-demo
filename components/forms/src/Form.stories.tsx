import React, { Component, ComponentType } from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Input from './Input';
import { Box } from 'rebass';
import { Field, Form, reduxForm, InjectedFormProps, ConfigProps } from 'redux-form';
import { gql, graphql, QueryProps, compose } from 'react-apollo';

const stories = storiesOf('Form', module);

/**
 * Simple form with redux-form
 */

// define a type for form data, that is being collected by the form
interface SimpleFormData {
  username: string;
  email: string;
}

// define component props
interface UserSimpleProps {
  createUser: (SimpleFormData) => any;
  onSaveIt?: () => any;
  data?: any;
}

// define a type for props that being injected by redux-form
declare type UserSimpleFormProps = InjectedFormProps<SimpleFormData, UserSimpleProps>;

// define a type that is a union of component props and injected props type
declare type UserSimplePropsCombined = UserSimpleProps & UserSimpleFormProps;

class UserSimple extends Component<UserSimplePropsCombined> {
  render() {
    return (
      <div>
        <h2>Create new user</h2>
        <Form onSubmit={this.props.handleSubmit(this.props.createUser)}>
          <div>
            <Field autoFocus required name="username" type="text" component="input" placeholder="Username" />
          </div>
          <div>
            <Field required name="email" type="email" component="input" placeholder="Email" />
          </div>
          <input type="submit" value="create" />
        </Form>
      </div>
    );
  }
}

// apply redux-form decorator
const UserSimpleWithForm = reduxForm<SimpleFormData, UserSimpleProps>({ form: 'User' })(UserSimple);

const onSubmit = (values: SimpleFormData) => {
  console.log('onSubmit', values.username);
};

stories.add('simple redux form', () => (
  <div>
    <p>Forms should be used for any data input.</p>
    <UserSimpleWithForm createUser={onSubmit} />
  </div>
));

/**
 * Redux Form with Apollo GraphQL queries and mutations
 */

// a sample query that component loads on mount
const SampleDataQuery = gql`
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
const SubmitUserMutation = gql`
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
  constructor() {
    super();
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
      <div>
        <h2>Create new user</h2>
        <div>
          Example of loading data with graphql:<br />
          Employee count: {loaded ? dashboard.company.employees.length : '...'}
        </div>
        <Form onSubmit={this.props.handleSubmit(this.onSubmit)}>
          <div>
            <Field component="input" autoFocus required name="username" type="text" placeholder="Username" />
          </div>
          <div>
            <Field component="input" required name="email" type="email" placeholder="Email" />
          </div>
          <input type="submit" value="create" />
        </Form>
      </div>
    );
  }
}

const UserGqlWithData = compose(
  reduxForm<UserFormData, UserFormProps>({ form: 'form4' }),
  graphql<any, AllProps>(SampleDataQuery),
  graphql<any, AllProps>(SubmitUserMutation),
)(UserGql);

stories.add('with graphql', () => (
  <div>
    <p>Forms should be used for any data input.</p>

    <UserGqlWithData />
  </div>
));
