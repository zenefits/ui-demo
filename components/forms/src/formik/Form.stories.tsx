import React, { ChangeEvent, Component } from 'react';
import { debounce } from 'lodash';
import { Route, Switch } from 'react-router-dom';
// @ts-ignore
import { action } from '@storybook/addon-actions';
// @ts-ignore
import { withViewport } from '@storybook/addon-viewport';
import { FormikHelpers } from 'formik';
import gql from 'graphql-tag';
// eslint-disable-next-line zenefits-custom-rules/import-filter
import { Mutation } from 'react-apollo';

import { RenderProfiler } from 'z-frontend-cypress/components';
import { setViewports } from 'z-frontend-app-bootstrap';
import { Box, Flex, Heading, Label, TextBlock } from 'zbase';
import { Button, Link } from 'z-frontend-elements';
import { Card } from 'z-frontend-composites';
import { DialogManager, Modal } from 'z-frontend-overlays';
import { ColorString, FontStyleString } from 'z-frontend-theme';

import { storiesOf } from '../../.storybook/storyHelpers';
import {
  AddressValue,
  Form,
  FormAddressUS,
  FormCheckbox,
  FormCheckboxGroup,
  FormCheckboxGroupDeprecated,
  FormFileUploader,
  FormNumberInput,
  FormRadio,
  FormRadioGroup,
  FormSelect,
  FormSignature,
  FormSimpleSelect,
  FormTextarea,
  FormTextInput,
  FormWeekPicker,
} from '../..';
import { LoginUserMutation } from './gqlTypesExample';
import { narrowSignature } from '../signature/signatureData';
import { fakeFetch } from '../file-uploader/fakeFetchUtil';
import { SignatureValue } from '../signature/Signature';
import { inputWidths, labelWidths } from './FormLabel';
import {
  FormCustomTileInputGroup,
  FormDateInput,
  FormMaskedInput,
  FormMentionTextarea,
  FormMultiSelect,
  FormSearchSelect,
} from '.';
import FormDateRange from './date-range/FormDateRange';
import FormPhoneInput from './phone-input/FormPhoneInput';

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
  .addDecorator(withViewport())
  .add('debug', () => <DebugForm />)
  .add('login form', () => <LoginForm onSubmit={action('formik-basic-submit-fields')} />, setViewports([0, 3]))
  .add('login form (graphql)', () => <LoginFormGraphql />)
  .add('dynamic form', () => <DynamicForm onSubmit={action('formik-dynamic-submit-fields')} />)
  .add('all the things', () => <AllTheThingsForm onSubmit={action('formik-all-submit-fields')} />)
  // TODO: example of enableReinitialize
  // .add('with dynamic initialValues', () => <DynamicInitialValues onSubmit={action('formik-dynamic-initial-values-fields')} />)
  .add('modal form', () => <ModalForm onSubmit={action('formik-modal-submit-fields')} />)
  .add('reset form', () => <ResetForm onSubmit={action('formik-modal-submit-fields')} />)
  .add('autosave form', () => <AutosaveForm />)
  .add('filter form', () => <FilterForm />)
  .add('tabular form', () => <TableForm />)
  .add('onSubmit error', () => <NetworkErrorForm />)
  .add('onSubmit error - custom message', () => (
    <NetworkErrorForm message="Sorry we are facing some network issues. Please try again later." />
  ))
  .add('prevent Transition', () => (
    <>
      <Flex>
        <Box w={1 / 4}>
          <Link to="/"> Form </Link>
        </Box>
        <Box w={1 / 4}>
          <Link to="/test"> Another Route </Link>
        </Box>
      </Flex>

      <Switch>
        <Route path="/test" render={() => <Box mt={3}> Inside Another Route's Render </Box>} />
        <Route path="/" component={PreventTransitionForm} />
      </Switch>
    </>
  ))
  .add('Custom Transition Message', () => (
    <>
      <Flex>
        <Box w={1 / 4}>
          <Link to="/"> Form </Link>
        </Box>
        <Box w={1 / 4}>
          <Link to="/test"> Another Route </Link>
        </Box>
      </Flex>

      <Switch>
        <Route path="/test" render={() => <Box mt={3}> Inside Another Route's Render </Box>} />
        <Route path="/" render={() => <PreventTransitionForm preventTransitionMessage="My custom Message" />} />
      </Switch>
    </>
  ));

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
        <FormTextInput name="name" label="Name" />
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
  onSubmit = (values: LoginFormValues, actions: FormikHelpers<LoginFormValues>) => {
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
              <FormSimpleSelect<{ value: string; label: string }>
                name="type"
                label="Login Type"
                getOptionText={o => o.label}
              >
                {({ SelectOption }) => loginOptions.map(option => <SelectOption key={option.value} option={option} />)}
              </FormSimpleSelect>
              <FormTextInput name="email" type="email" label="Email" />
              <FormTextInput
                name="secondaryEmail"
                type="email"
                label="Secondary Email"
                optional
                helpText="A backup email in case you lose access to the original."
              />
              <FormTextInput name="password" type="password" label="Password" />
              <FormTextarea
                name="source"
                label="How did you hear about us?"
                helpText="We use this information to improve our marketing materials."
              />
              {networkError && <Form.Error textDefault={networkError} />}
              <FormCheckbox name="remember" label="Remember me" />
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
  onSubmit = (values: DynamicFormValues, actions: FormikHelpers<DynamicFormValues>) => {
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
              <FormRadioGroup label="Choose Subjects" name="subjects">
                {subjectOptions.map(subject => (
                  <FormRadio key={subject.value} label={subject.label} value={subject.value} />
                ))}
              </FormRadioGroup>
              {props.values.subjects === 'people' && <FormTextInput name="people" label="Which people?" />}

              <Form.Row name="email" label="Subject" fieldType="block">
                <TextBlock>You</TextBlock>
                <TextBlock>Your teammates</TextBlock>
              </Form.Row>

              <Form.Row name="email" label="Email">
                <FormTextInput name="email" type="email" disabled={props.values.sameEmail} containerProps={{ mb: 2 }} />
                <FormCheckbox
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

const tileOptions = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'N/A'];

const einMask = [/\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/];

interface AllTheThingsFormValues {
  ssn: string;
  ein: string;
  date: string;
  dateRange: string;
  phone: string;
  searchSelect: string;
  entree: string;
  subscribe: boolean;
  inputGroup: string;
  chicken: boolean;
  pork: boolean;
  comment: string;
  proteins: string[];
  subjects: string;
  week: { from: Date; to: Date };
  signature: SignatureValue;
  address: AddressValue;
  documents: [];
}

export class AllTheThingsForm extends Component<{ onSubmit: Function }> {
  onSubmit = (values: AllTheThingsFormValues, actions: FormikHelpers<AllTheThingsFormValues>) => {
    return simulateNetworkDelay(() => {
      this.props.onSubmit(values);
    });
  };

  render() {
    return (
      <RenderProfiler>
        <Form<AllTheThingsFormValues>
          initialValues={{
            ssn: '',
            ein: '',
            date: '',
            dateRange: '',
            phone: '',
            subscribe: false,
            chicken: true,
            pork: false,
            comment: '',
            proteins: [],
            searchSelect: null,
            entree: null,
            inputGroup: null,
            subjects: '',
            week: {
              from: new Date(2018, 7 - 1, 8),
              to: new Date(2018, 7 - 1, 14),
            },
            signature: { dataUrl: narrowSignature, date: new Date('2019-01-01') },
            address: FormAddressUS.getEmptyValue(),
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
                  <FormTextInput
                    label="SSN"
                    name="ssn"
                    helpText="Your Social Security Number is a nine digit number issued by the US government."
                  />
                  <FormMaskedInput label="EIN" name="ein" mask={einMask} />

                  <FormDateInput name="date" label="Date" />
                  <FormDateRange name="dateRange" label="Date Range" />
                  <FormPhoneInput name="phone" label="Phone number" />

                  <FormCheckboxGroupDeprecated label="Subscribe">
                    <FormCheckbox name="subscribe" label="Yes, I would like to get the newsletter" />
                  </FormCheckboxGroupDeprecated>
                  <FormCheckboxGroupDeprecated label="Delivery Date">
                    <FormCheckbox name="Monday" label="Monday" />
                    <FormCheckbox name="Wednesday" label="Wednesday" />
                    <FormCheckbox name="Friday" label="Friday" />
                  </FormCheckboxGroupDeprecated>
                  {/* single field, which is an array */}
                  <FormCheckboxGroup
                    name="proteins"
                    label="Protein Preferences"
                    helpText="Choose your preferred protein."
                  >
                    {({ Checkbox }) =>
                      proteinOptions.map(option => (
                        <Checkbox key={option.value} name={option.value} label={option.label} />
                      ))
                    }
                  </FormCheckboxGroup>
                  <FormRadioGroup label="Choose Subjects" helpText="test" optional name="subjects">
                    {subjectOptions.map(subject => (
                      <FormRadio key={subject.value} label={subject.label} value={subject.value} />
                    ))}
                  </FormRadioGroup>

                  <FormSearchSelect<string>
                    name="searchSelect"
                    label="Fruit"
                    onSelect={action('Item selected')}
                    onBlur={action('Input blurred')}
                    getOptionText={o => o}
                  >
                    {({ SelectOption, basicOptionFilter }) =>
                      basicOptionFilter(simpleFruits).map(fruit => <SelectOption option={fruit} key={fruit} />)
                    }
                  </FormSearchSelect>
                  <FormMultiSelect<{ value: string; label: string }>
                    name="entree"
                    label="Entree"
                    getOptionText={o => o.label}
                    onChange={action('Select value changed')}
                  >
                    {({ SelectOption, multiOptionFilter }) =>
                      multiOptionFilter(proteinOptions).map(option => (
                        <SelectOption key={option.value} option={option} />
                      ))
                    }
                  </FormMultiSelect>
                  <FormWeekPicker label="Week" name="week" />
                  <FormSignature label="Signature" name="signature" width={275} />
                  <FormFileUploader name="documents" label="Upload Your Documents" internalFetch={fakeFetch} />

                  <FormCustomTileInputGroup
                    name="inputGroup"
                    label="Rating"
                    stackMobileVertically
                    format="form-row-top-label"
                  >
                    {CustomTileInput =>
                      tileOptions
                        .slice(0, 5)
                        .map(option => <CustomTileInput name="radio2" value={option} label={option} key={option} />)
                    }
                  </FormCustomTileInputGroup>

                  <FormMentionTextarea
                    name="comment"
                    label="Comment"
                    options={[
                      {
                        id: 'a_234',
                        menuLabel: `Meghan Markle — marklesparkle@zenefits.com`,
                        tagLabel: 'Meghan',
                      },
                      {
                        id: '11',
                        menuLabel: `Elizabeth Queen — thequeen@zenefits.com`,
                        tagLabel: 'Elizabeth',
                      },
                    ]}
                    mt={0}
                  />
                </Form.Section>
              </Card.Row>
              <Card.Row>
                <Form.Section label="Legal Address">
                  <FormAddressUS name="address" />
                </Form.Section>
              </Card.Row>
              <Card.Footer>
                <Form.Footer primaryText="Save" />
              </Card.Footer>
            </Card>
          )}
        </Form>
      </RenderProfiler>
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
                <FormTextInput name="username" label="Username" />
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
  age: number;
  protein: LabelValue;
};

class ResetForm extends Component<{ onSubmit?: Function }> {
  render() {
    return (
      <Form<ResetFormValues>
        debug
        initialValues={{
          username: '',
          age: 12,
          protein: proteinOptions[1],
        }}
        onSubmit={(values: ResetFormValues) => {
          this.props.onSubmit(values);
        }}
      >
        {props => (
          <>
            <FormTextInput name="username" label="Username" />
            <FormNumberInput name="age" label="Age" allowNegative />
            <FormSelect<LabelValue> name="protein" label="Protein" getOptionText={option => option.label}>
              {({ SelectOption, basicOptionFilter }) =>
                basicOptionFilter(proteinOptions).map(option => (
                  <SelectOption key={option.value} option={option}>
                    {option.label}
                  </SelectOption>
                ))
              }
            </FormSelect>
            <Button type="reset" onClick={props.handleReset}>
              Reset
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
        <FormTextInput name="first" label="First Name" />
        <FormTextInput name="last" label="Last Name" />
        <FormTextInput name="email" type="email" label="Email" />
        {this.state.shouldDisplayMessage && <Box aria-live="polite">{this.AUTOSAVE_MESSAGE}</Box>}
      </Form>
    );
  }
}

// Filter Form
type FruitColor = 'Red' | 'Green' | 'Yellow' | 'Other';
const fruitColors: FruitColor[] = ['Red', 'Green', 'Yellow', 'Other'];

type FruitType = 'Citrus' | 'Berry' | 'Other';
const fruitTypes: FruitType[] = ['Citrus', 'Berry', 'Other'];

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
  { name: 'Lemon', color: 'Yellow', type: 'Citrus' },
  { name: 'Lime', color: 'Green', type: 'Citrus' },
];

const simpleFruits = fruits.map(fruit => fruit.name);

const getFilteredFruits = ({ color, type }: FruitFilters) =>
  fruits.filter(fruit => !color || color === fruit.color).filter(fruit => !type || type === fruit.type);

class FilterForm extends Component<{}, FilterFormState> {
  constructor(props: {}) {
    super(props);
    this.state = { filteredFruits: fruits };
  }

  // NOTE: If only a single field is used as a filter, it is better to put the onChange on the field directly
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
        <FormSimpleSelect<FruitColor> name="color" label="Fruit Color" getOptionText={o => o}>
          {({ SelectOption }) => fruitColors.map(color => <SelectOption key={color} option={color} />)}
        </FormSimpleSelect>
        <FormSimpleSelect<FruitType> name="type" label="Fruit Type" getOptionText={o => o}>
          {({ SelectOption }) => fruitTypes.map(type => <SelectOption key={type} option={type} />)}
        </FormSimpleSelect>
        <Heading id="fruit-list-header" level={3}>
          Filtered Fruits:
        </Heading>
        <Box role="list" aria-labelledby="fruit-list-header">
          {this.state.filteredFruits.map(fruit => (
            <Box key={fruit.name} role="listitem">
              {fruit.name}
            </Box>
          ))}
        </Box>
      </Form>
    );
  }
}

type TableFormValues = {
  ssn: string;
  tax: string;
  filingStatus: string;
};

type TableFormRowProps = {
  label: string;
  name: string;
  rowEnd?: string | React.ReactNode;
};

const TableFormRow = (props: TableFormRowProps) => {
  return (
    <Form.RowGroup label={props.label}>
      <Flex align={['flex-start', null, 'center']} direction={['column', 'row']}>
        <FormTextInput
          label={props.label}
          name={props.name}
          // this label provides everything a non-visual user needs to know
          // NOTE: this text needs to be app-specific
          aria-label={`
      Choose your column headers that correspond to Zenefits Field "${props.label}"`}
          mr={4}
          width={[1, 1, 1, 4 / 8]}
          format="raw"
        />
        <TextBlock>{props.rowEnd}</TextBlock>
      </Flex>
    </Form.RowGroup>
  );
};

class TableForm extends Component {
  render() {
    const commonLabelProps = {
      fontStyle: 'controls.s' as FontStyleString,
      fontSize__deprecated__doNotUse: 0, // override Label default
      color: 'text.default' as ColorString,
      'aria-hidden': true, // only for visual users
    };

    return (
      <Form<TableFormValues>
        initialValues={{
          ssn: '',
          tax: '',
          filingStatus: '',
        }}
        onSubmit={() => {}}
      >
        {props => (
          <>
            <Flex wrap mb={3}>
              <Label width={labelWidths} {...commonLabelProps}>
                Zenefits Field
              </Label>
              <Label width={inputWidths} {...commonLabelProps}>
                Your Column Headers
              </Label>
            </Flex>
            <TableFormRow label="Social Security Number" name="ssn" rowEnd="Value mapping required" />
            <TableFormRow label="Federal Tax Withholding" name="tax" />
            <TableFormRow label="Federal Filing Status" name="filingStatus" />
          </>
        )}
      </Form>
    );
  }
}

type NetworkErrorFormValues = {
  email: string;
  password: string;
  [key: string]: string;
};

interface NetworkErrorFormProps {
  message?: string;
}

class NetworkErrorForm extends Component<NetworkErrorFormProps> {
  render() {
    return (
      <Mutation<LoginUserMutation.Mutation, LoginUserMutation.Variables> mutation={loginUserMutation}>
        {loginUser => (
          <Form<NetworkErrorFormValues>
            initialValues={{
              email: '',
              password: '',
            }}
            onSubmit={async (values: NetworkErrorFormValues) => {
              console.log('graphql submit', values);
              // do not need this try/catch if default error message is fine
              try {
                await loginUser({
                  variables: {},
                });
              } catch (error) {
                throw this.props.message || error;
              }
            }}
          >
            {({ handleReset, submitForm }) => (
              <>
                <FormTextInput
                  name="email"
                  type="email"
                  label="Email"
                  // trigger error message
                  autoFocus
                  onFocus={() => {
                    submitForm();
                  }}
                />
                <FormTextInput name="password" type="password" label="Password" />
                <Form.Footer primaryText="Login" cancelOnClick={handleReset} />
              </>
            )}
          </Form>
        )}
      </Mutation>
    );
  }
}

interface PreventTransitionFormProps {
  preventTransitionMessage?: string;
}

class PreventTransitionForm extends Component<PreventTransitionFormProps> {
  render() {
    return (
      <Box mt={3}>
        <Form
          onSubmit={() => {}}
          initialValues={{ fName: '', lName: '' }}
          preventTransition
          preventTransitionMessage={this.props.preventTransitionMessage}
        >
          {() => {
            return (
              <>
                <FormTextInput name="fName" label="First Name" />
                <FormTextInput name="lName" label="Last Name" />
              </>
            );
          }}
        </Form>
      </Box>
    );
  }
}
