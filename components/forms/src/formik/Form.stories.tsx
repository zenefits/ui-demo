import React, { ChangeEvent, Component } from 'react';
import { debounce } from 'lodash';
// @ts-ignore
import { action } from '@storybook/addon-actions';
import { FormikActions } from 'formik';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

import { Box, Heading, TextBlock } from 'zbase';
import { Button } from 'z-frontend-elements';
import { Card } from 'z-frontend-composites';
import { DialogManager, Modal } from 'z-frontend-overlays';

import { storiesOf } from '../../.storybook/storyHelpers';
import { AddressValue, Form } from './Form';
import { LoginUserMutation } from './gqlTypesExample';
import { narrowSignature } from '../signature/signatureData';
import { fakeFetch } from '../file-uploader/fakeFetchUtil';
import { SignatureValue } from './signature/FormSignature';

interface LoginFormValues {
  type: { value: string; label: string };
  email: string;
  password: string;
  remember: boolean;
  source: string;
  secondaryEmail: string;
}

storiesOf('forms|Form', module)
  .addDecorator((getStory: Function) => (
    <Box p={20} w={[1, 2 / 3]} bg="grayscale.white">
      {getStory()}
    </Box>
  ))
  .add('debug', () => <DebugForm />)
  .add('login form', () => <LoginForm onSubmit={action('formik-basic-submit-fields')} />)
  .add('login form (graphql)', () => <LoginFormGraphql />)
  .add('dynamic form', () => <DynamicForm onSubmit={action('formik-dynamic-submit-fields')} />)
  .add('all the things', () => <AllTheThingsForm onSubmit={action('formik-all-submit-fields')} />)
  // TODO: example of enableReinitialize
  // .add('with dynamic initialValues', () => <DynamicInitialValues onSubmit={action('formik-dynamic-initial-values-fields')} />)
  .add('modal form', () => <ModalForm onSubmit={action('formik-modal-submit-fields')} />)
  .add('reset form', () => <ResetForm onSubmit={action('formik-modal-submit-fields')} />)
  .add('autosave form', () => <AutosaveForm />)
  .add('filter form', () => <FilterForm />);

export function simulateNetworkDelay(callback?: Function) {
  // returning a promise allows Form to handle submitting state automatically
  return new Promise(resolve => {
    setTimeout(() => {
      callback && callback();
      resolve();
    }, 500);
  });
}

type DebugFormValues = {
  name: string;
};

class DebugForm extends Component {
  render() {
    return (
      <Form<DebugFormValues>
        initialValues={{
          name: '',
        }}
        validationSchema={{}}
        onSubmit={() => {}}
        debug
      >
        <Form.TextInput name="name" label="Name" />
      </Form>
    );
  }
}

const loginOptions = [
  { value: 'login', label: 'Log in existing user' },
  { value: 'signup', label: 'Sign up new user' },
];

const loginValidationSchema = {
  email: Form.Yup.string()
    .email('Email must be a valid email.')
    .required('Email is a required field.'),
  password: Form.Yup.string()
    .min(5, 'Password must be at least 5 characters.')
    .required('Password is a required field.'),
  source: Form.Yup.string().required('Source is a required field.'),
};

type LoginFormProps = {
  onSubmit?: Function;
  error?: any; // ApolloError
};

class LoginForm extends Component<LoginFormProps> {
  onSubmit = (values: LoginFormValues, actions: FormikActions<LoginFormValues>) => {
    return simulateNetworkDelay(() => {
      this.props.onSubmit(values);
    });
  };

  render() {
    const { error } = this.props;
    const networkError =
      error && error.networkError ? 'Sorry, failed to submit form. Please try again in a minute.' : null;

    return (
      <Box>
        <Heading level={3} mb={3}>
          Login
        </Heading>
        <Form<LoginFormValues>
          initialValues={{
            type: loginOptions[0],
            email: '',
            password: '',
            remember: false,
            source: '',
            secondaryEmail: '',
          }}
          validationSchema={loginValidationSchema}
          onSubmit={this.onSubmit}
        >
          {props => (
            <>
              <Form.SimpleSelect<{ value: string; label: string }>
                name="type"
                label="Login Type"
                getOptionText={o => o.label}
              >
                {({ SelectOption }) => loginOptions.map(option => <SelectOption key={option.value} option={option} />)}
              </Form.SimpleSelect>
              <Form.TextInput name="email" type="email" label="Email" />
              <Form.TextInput name="secondaryEmail" type="email" label="Secondary Email" optional />
              <Form.TextInput name="password" type="password" label="Password" />
              <Form.Textarea name="source" label="How did you hear about us?" />
              {networkError && <Form.Error textDefault={networkError} />}
              <Form.Checkbox name="remember" label="Remember me" />
              <Form.Footer primaryText="Login" />
            </>
          )}
        </Form>
      </Box>
    );
  }
}

// NOTE: normally types are auto-generated

const loginUserMutation = gql`
  mutation LoginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      id
      createdAt
    }
  }
`;

class LoginFormGraphql extends Component {
  render() {
    return (
      <Mutation<LoginUserMutation.Mutation, LoginUserMutation.Variables> mutation={loginUserMutation}>
        {(loginUser, data) => (
          <LoginForm
            error={data.error}
            onSubmit={(values: LoginFormValues) => {
              console.log('graphql submit', values);
              return loginUser({ variables: values }).then(data => {
                console.log('got result', data);
              });
            }}
          />
        )}
      </Mutation>
    );
  }
}

interface DynamicFormValues {
  subjects: string;
  people?: string;
  email?: string;
  sameEmail?: boolean;
}

const subjectOptions = [
  { value: 'company', label: 'Entire Company' },
  { value: 'team', label: 'My Team' },
  { value: 'people', label: 'Specific People' },
];

class DynamicForm extends Component<{ onSubmit: Function }> {
  onSubmit = (values: DynamicFormValues, actions: FormikActions<DynamicFormValues>) => {
    return simulateNetworkDelay(() => {
      this.props.onSubmit(values);
    });
  };

  render() {
    return (
      <Box>
        <Heading level={3} mb={3}>
          Review
        </Heading>
        <Form<DynamicFormValues>
          initialValues={{
            subjects: '',
            people: '',
            email: '',
            sameEmail: false,
          }}
          validationSchema={{
            subjects: Form.Yup.string().required('Please choose subjects.'),
            people: Form.Yup.string().when('subjects', {
              is: 'people',
              then: Form.Yup.string().required('Please enter at least one name.'),
            }),
            email: Form.Yup.string().required('Please enter an email.'),
          }}
          onSubmit={this.onSubmit}
        >
          {props => (
            <>
              <Form.RadioGroup label="Choose Subjects" name="subjects">
                {subjectOptions.map(subject => (
                  <Form.Radio key={subject.value} label={subject.label} value={subject.value} />
                ))}
              </Form.RadioGroup>
              {props.values.subjects === 'people' && <Form.TextInput name="people" label="Which people?" />}

              <Form.Row name="email" label="Subject" fieldType="block">
                <TextBlock>You</TextBlock>
                <TextBlock>Your teammates</TextBlock>
              </Form.Row>

              <Form.Row name="email" label="Email">
                <Form.TextInput
                  name="email"
                  type="email"
                  disabled={props.values.sameEmail}
                  containerProps={{ mb: 2 }}
                />
                <Form.Checkbox
                  name="sameEmail"
                  label="Same as employee"
                  onChange={(e: ChangeEvent<any>) => {
                    props.handleChange(e);
                    props.setFieldValue('email', e.target.checked ? 'same@email.com' : '');
                  }}
                />
              </Form.Row>

              <Form.Footer primaryText="Save" />
            </>
          )}
        </Form>
      </Box>
    );
  }
}

type LabelValue = { value: string; label: string };

const proteinOptions: LabelValue[] = [
  { value: 'beef', label: 'Beef' },
  { value: 'chicken', label: 'Chicken' },
  { value: 'pork', label: 'Pork' },
  { value: 'tofu', label: 'Tofu' },
];

interface AllTheThingsFormValues {
  subscribe: boolean;
  chicken: boolean;
  pork: boolean;
  proteins: string[];
  subjects: string;
  week: { from: Date; to: Date };
  signature: SignatureValue;
  address: AddressValue;
  documents: [];
}

class AllTheThingsForm extends Component<{ onSubmit: Function }> {
  onSubmit = (values: AllTheThingsFormValues, actions: FormikActions<AllTheThingsFormValues>) => {
    return simulateNetworkDelay(() => {
      this.props.onSubmit(values);
    });
  };

  render() {
    return (
      <Form<AllTheThingsFormValues>
        initialValues={{
          subscribe: false,
          chicken: true,
          pork: false,
          proteins: [],
          subjects: '',
          week: {
            from: new Date(2018, 7 - 1, 8),
            to: new Date(2018, 7 - 1, 14),
          },
          signature: { dataUrl: narrowSignature, date: new Date('2019-01-01') },
          address: Form.AddressUS.getEmptyValue(),
          documents: [],
        }}
        validationSchema={{
          documents: Form.Yup.array().required('Please upload a document.'),
          proteins: Form.Yup.array().required('Please choose at least one protein.'),
        }}
        onSubmit={this.onSubmit}
      >
        {props => (
          <Card>
            <Card.Header>All The Things!</Card.Header>
            <Card.Row>
              <Form.Section label="Basic Details">
                <Form.CheckboxGroupDeprecated label="Subscribe">
                  <Form.Checkbox name="subscribe" label="Yes, I would like to get the newsletter" />
                </Form.CheckboxGroupDeprecated>
                <Form.CheckboxGroupDeprecated label="Protein Preferences">
                  <Form.Checkbox name="chicken" label="Chicken" />
                  <Form.Checkbox name="pork" label="Pork" />
                </Form.CheckboxGroupDeprecated>
                {/* single field, which is an array */}
                <Form.CheckboxGroup name="proteins" label="Protein Preferences">
                  {({ Checkbox }) =>
                    proteinOptions.map(option => (
                      <Checkbox key={option.value} name={option.value} label={option.label} />
                    ))
                  }
                </Form.CheckboxGroup>
                <Form.RadioGroup label="Choose Subjects" name="subjects">
                  {subjectOptions.map(subject => (
                    <Form.Radio key={subject.value} label={subject.label} value={subject.value} />
                  ))}
                </Form.RadioGroup>
                <Form.WeekPicker label="Week" name="week" />
                <Form.Signature label="Signature" name="signature" width={275} />
                <Form.FileUploader name="documents" label="Upload Your Documents" internalFetch={fakeFetch} />
              </Form.Section>
            </Card.Row>
            <Card.Row>
              <Form.Section label="Legal Address">
                <Form.AddressUS name="address" />
              </Form.Section>
            </Card.Row>
            <Card.Footer>
              <Form.Footer primaryText="Save" />
            </Card.Footer>
          </Card>
        )}
      </Form>
    );
  }
}

type ModalFormValues = {
  username: string;
};

class ModalForm extends Component<{ onSubmit?: Function }> {
  render() {
    return (
      <DialogManager
        openByDefault // for visual regression testing
        render={dialog => (
          <Form<ModalFormValues>
            initialValues={{
              username: 'bob',
            }}
            onSubmit={(values: ModalFormValues) => {
              this.props.onSubmit(values);
              dialog.close();
            }}
          >
            <Modal title="New User" onCancel={dialog.close} isVisible={dialog.isVisible} controlEl={dialog.controlEl}>
              <Modal.Body>
                <Form.TextInput name="username" label="Username" />
              </Modal.Body>
              <Modal.Footer buttons={[{ text: 'Save', type: 'submit' }]} onCancel={dialog.close} />
            </Modal>
            <Button onClick={dialog.open}>Show modal</Button>
          </Form>
        )}
      />
    );
  }
}

type ResetFormValues = {
  username: string;
  protein: LabelValue;
};

class ResetForm extends Component<{ onSubmit?: Function }> {
  render() {
    return (
      <Form<ResetFormValues>
        debug
        initialValues={{
          username: '',
          protein: proteinOptions[1],
        }}
        onSubmit={(values: ResetFormValues) => {
          this.props.onSubmit(values);
        }}
      >
        {props => (
          <>
            <Form.TextInput name="username" label="Username" />
            <Form.Select<LabelValue> name="protein" label="Protein" getOptionText={option => option.label}>
              {({ SelectOption, basicOptionFilter }) =>
                basicOptionFilter(proteinOptions).map(option => (
                  <SelectOption key={option.value} option={option}>
                    {option.label}
                  </SelectOption>
                ))
              }
            </Form.Select>
            <Button type="reset" onClick={props.handleReset}>
              Clear All
            </Button>
          </>
        )}
      </Form>
    );
  }
}

// Autosave Form
class AutosaveForm extends Component<{}, { shouldDisplayMessage: boolean }> {
  AUTOSAVE_MESSAGE = 'Your progress has been saved.';
  fireSaveAction = action('auto-save event');

  constructor(props: {}) {
    super(props);
    this.state = { shouldDisplayMessage: false };
  }

  clearMessage = debounce(() => {
    this.setState({ shouldDisplayMessage: false });
  }, 5000);

  onChange = debounce(({ updatedValues, previousValues, isValid }) => {
    if (isValid) {
      this.fireSaveAction({
        updatedValues,
        previousValues,
      });
      this.setState({
        shouldDisplayMessage: true,
      });
      this.clearMessage();
    }
  }, 300);

  render() {
    return (
      <Form<{ first: string; last: string; email: string }>
        initialValues={{ first: '', last: '', email: '' }}
        validationSchema={{
          first: Form.Yup.string(),
          last: Form.Yup.string(),
          email: Form.Yup.string().email(),
        }}
        onChange={this.onChange}
        onSubmit={() => {}}
      >
        <Form.TextInput name="first" label="First Name" />
        <Form.TextInput name="last" label="Last Name" />
        <Form.TextInput name="email" type="email" label="Email" />
        {this.state.shouldDisplayMessage && <Box aria-live="polite">{this.AUTOSAVE_MESSAGE}</Box>}
      </Form>
    );
  }
}

// Filter Form
type FruitColor = 'Red' | 'Green' | 'Yellow' | 'Other';
const fruitColors: FruitColor[] = ['Red', 'Green', 'Yellow', 'Other'];

type FruitType = 'Citris' | 'Berry' | 'Other';
const fruitTypes: FruitType[] = ['Citris', 'Berry', 'Other'];

type Fruit = {
  name: string;
  color: FruitColor;
  type: FruitType;
};

type FruitFilters = {
  color: FruitColor | '';
  type: FruitType | '';
};
type FilterFormState = {
  filteredFruits: Fruit[];
};

const fruits: Fruit[] = [
  { name: 'Apple', color: 'Red', type: 'Other' },
  { name: 'Pear', color: 'Green', type: 'Other' },
  { name: 'Raspberry', color: 'Red', type: 'Berry' },
  { name: 'Strawberry', color: 'Red', type: 'Berry' },
  { name: 'Blueberry', color: 'Other', type: 'Berry' },
  { name: 'Kiwi', color: 'Green', type: 'Other' },
  { name: 'Lemon', color: 'Yellow', type: 'Citris' },
  { name: 'Lime', color: 'Green', type: 'Citris' },
];

const getFilteredFruits = ({ color, type }: FruitFilters) =>
  fruits.filter(fruit => !color || color === fruit.color).filter(fruit => !type || type === fruit.type);

class FilterForm extends Component<{}, FilterFormState> {
  constructor(props: {}) {
    super(props);
    this.state = { filteredFruits: fruits };
  }

  // If only a single field is used as a filter, it is better to put the onChange on the field directly
  onChange = ({ updatedValues }: { updatedValues: FruitFilters }) => {
    this.setState({ filteredFruits: getFilteredFruits(updatedValues) });
  };

  render() {
    return (
      <Form<FruitFilters>
        initialValues={{ color: '', type: '' }}
        validationSchema={{
          color: Form.Yup.string(),
          type: Form.Yup.string(),
        }}
        onChange={this.onChange}
        onSubmit={() => {}}
      >
        <Heading id="fruit header" level={3}>
          Filters:
        </Heading>
        <Form.SimpleSelect<FruitColor> name="color" label="Fruit Color" getOptionText={o => o}>
          {({ SelectOption }) => fruitColors.map(color => <SelectOption key={color} option={color} />)}
        </Form.SimpleSelect>
        <Form.SimpleSelect<FruitType> name="type" label="Fruit Type" getOptionText={o => o}>
          {({ SelectOption }) => fruitTypes.map(type => <SelectOption key={type} option={type} />)}
        </Form.SimpleSelect>
        <Heading id="fruit-list-header" level={3}>
          Filtered Fruits:
        </Heading>
        <Box role="list" aria-labelledby="fruit-list-header">
          {this.state.filteredFruits.map(fruit => (
            <Box role="listitem">{fruit.name}</Box>
          ))}
        </Box>
      </Form>
    );
  }
}
