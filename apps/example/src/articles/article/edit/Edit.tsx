import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { Flex, Heading, TextBlock } from 'zbase';
import { AddressValue, Form } from 'z-frontend-forms';
import { Card } from 'z-frontend-composites';

const checkboxGroupOptions = [
  { value: 'beef', label: 'Beef' },
  { value: 'chicken', label: 'Chicken' },
  { value: 'tofu', label: 'Tofu' },
];

const featureOptions = [
  {
    label: 'Bi-Weekly',
    value: 'BW',
  },
  {
    label: 'Monthly',
    value: 'Mo',
  },
  {
    label: 'Semi-Monthly',
    value: 'SM',
  },
  {
    label: 'Weekly',
    value: 'We',
  },
];

const groups = [
  {
    groupName: 'Warriors',
    options: [
      { value: 30, label: 'Steph' },
      { value: 35, label: 'Kevin' },
      { value: 11, label: 'Klay' },
      { value: 23, label: 'Draymond' },
    ],
  },
  {
    groupName: 'Celtics',
    options: [
      { value: 11, label: 'Kyrie' },
      { value: 0, label: 'Jayson' },
      { value: 7, label: 'Jaylen' },
      { value: 20, label: 'Gordon' },
      { value: 42, label: 'Al' },
    ],
  },
];

const mentionOptions = [
  {
    id: '234',
    menuLabel: `Meghan Markle — marklesparkle@zenefits.com`,
    tagLabel: 'Meghan',
  },
  {
    id: '11',
    menuLabel: `Elizabeth Queen — thequeen@zenefits.com`,
    tagLabel: 'Elizabeth',
  },
];

const fruits = ['Apple', 'Banana', 'Grapefruit', 'Strawberry', 'Blueberry', 'Lemon', 'Lime', 'Orange', 'Mango', 'Kiwi'];
const fruitOptions = fruits.map(fruit => ({ label: fruit, value: fruit }));

const radioGroupOptions = [
  { value: 'biweekly', label: 'Bi-weekly' },
  { value: 'semimonthly', label: 'Semi-monthly' },
  { value: 'monthly', label: 'Monthly' },
];

// const optionList = ['Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5', 'Option 6'];

interface MatchProps {
  articleId: string;
}

type Props = RouteComponentProps<MatchProps> & {};

type EditArticleFormValues = {
  title: string;
  title2: string;
  remember: boolean;
  address: AddressValue;
  uncheked: boolean;
  beef: boolean;
  chicken: boolean;
  tofu: boolean;
};

class EditArticlePage extends Component<Props> {
  render() {
    const { articleId } = this.props.match.params;

    return (
      <Flex column w={[1, 3 / 4, 2 / 3]} m="0 auto">
        <Form<EditArticleFormValues>
          initialValues={{
            title: '',
            title2: 'foo',
            address: Form.AddressUS.getEmptyValue(),
            uncheked: true,
            remember: false,
            beef: false,
            chicken: false,
            tofu: true,
          }}
          validationSchema={{ title: Form.Yup.string().required('Title is a required field.') }}
          onSubmit={(values, actions) => {
            setTimeout(() => {
              actions.setSubmitting(false);
              console.log(values); // TODO
            }, 1000);
          }}
        >
          {props => (
            <Card>
              <Card.Header>
                <Heading level={5}>Edit article #{articleId}</Heading>
              </Card.Header>
              <Card.Row>
                {/* text input based fields */}
                <Form.TextInput name="title" label="Title" />
                <Form.Textarea name="description" label="Description" />
                <Form.MaskedInput
                  label="EIN"
                  name="ein"
                  mask={[/\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/]}
                />
                <Form.MoneyInput name="salary" label="Annual Salary" />
                <Form.NumberInput name="timeOffDays" label="Time off days (Default number input)" />
                <Form.PercentageInput name="ownershipPercentage" label="Percentage owned" />
                <Form.AddressUS name="address" />
                <Form.TimeInput name="time" label="Time" />
                <Form.DateInput name="date" label="Date" />
                <Form.TimeRange name="timeRange" label="Time Range" />
                {/* options list fields */}
                <Form.CheckboxGroup label="Proteins">
                  {({ Checkbox }) =>
                    checkboxGroupOptions.map(option => (
                      <Checkbox key={option.value} name={option.value} label={option.label} />
                    ))
                  }
                </Form.CheckboxGroup>

                <Form.GroupSelect name="player" label="Player" groups={groups} />
                <Form.OpenListSelect<{ value: string; label: string }>
                  name="fruit-1"
                  label="Fruit"
                  getOptionText={o => o.label}
                >
                  {({ SelectOption }) => fruitOptions.map((fruit, i) => <SelectOption option={fruit} key={i} />)}
                </Form.OpenListSelect>
                <Form.RadioGroup name="frequency" label="Pay Frequency">
                  {radioGroupOptions.map(option => (
                    <Form.Radio key={option.value} value={option.value} label={option.label} />
                  ))}
                </Form.RadioGroup>
                {featureOptions.map(option => (
                  <Form.CustomTileInput name="paySchedule" key={option.value} value={option.value}>
                    <TextBlock p={3}>{option.label}</TextBlock>
                  </Form.CustomTileInput>
                ))}
                {/* other fields components */}
                <Form.Checkbox name="remember" label="Remember Me" />
                <Form.CheckboxGroup label=" ">
                  {({ Checkbox }) => <Checkbox key="rememberMe2" name="rememberMe2" label="Remember Me 2" />}
                </Form.CheckboxGroup>

                <Form.Checkbox name="uncheked" label="Should be unchecked" />

                <Form.MentionTextarea name="comment" label="Comment" options={mentionOptions} />
                <Form.Section label="Legal Address">
                  <Form.SearchSelect<string> name="fruit-2" label="Fruit" getOptionText={o => o}>
                    {({ SelectOption, basicOptionFilter }) =>
                      basicOptionFilter(fruits).map((fruit, i) => <SelectOption option={fruit} key={i} />)
                    }
                  </Form.SearchSelect>
                </Form.Section>
                {/* <Form.Select<string> name="example" label="example" s="large">
                  {({ SelectOption, basicOptionFilter, withMatchEmphasis }) => (
                    <>
                      {basicOptionFilter(optionList).map(option => (
                        <SelectOption key={option} option={option}>
                          {withMatchEmphasis(option)}
                        </SelectOption>
                      ))}
                    </>
                  )}
                </Form.Select> */}
                <Form.Signature name="signature" label="Sign here" />

                <Form.WeekPicker name="week" label="Week" />
              </Card.Row>
              <Card.Footer>
                <Form.Footer
                  primaryText="Save"
                  cancelOnClick={() => this.props.history.push(`/articles/${articleId}`)}
                />
              </Card.Footer>
            </Card>
          )}
        </Form>
      </Flex>
    );
  }
}

export default EditArticlePage;
