import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { reduxForm, Form } from 'redux-form';

import { Box, Flex } from 'zbase';

import DatePicker from './DatePicker';
import DatePickerField, { formatIsoString } from './fields/DatePickerField';
import Button from './Button';

const withDisabled = {
  disabledDays: {
    before: new Date(),
  },
};

class SimpleForm extends React.Component<any> {
  render() {
    return (
      <Form onSubmit={this.props.handleSubmit(this.props.onSubmit)}>
        <DatePickerField label="Choose date" name="chosenDate" />
        <Button type="submit" mode="primary">
          Submit
        </Button>
      </Form>
    );
  }
}

interface SimpleFormData {
  chosenDate: string;
}

const SimpleReduxForm = reduxForm<SimpleFormData, any>({
  form: 'User',
  initialValues: { chosenDate: formatIsoString(new Date(2010, 1 - 1, 2)) },
})(SimpleForm);

const required = value => (value ? undefined : 'Required');

class RequiredForm extends React.Component<any> {
  render() {
    const { invalid } = this.props;
    return (
      <Form onSubmit={this.props.handleSubmit(this.props.onSubmit)}>
        <DatePickerField label="Choose date" name="chosenDate" validate={required} />
        <Button type="submit" mode="primary" disabled={invalid}>
          Submit
        </Button>
      </Form>
    );
  }
}
const RequiredReduxForm = reduxForm<SimpleFormData, any>({
  form: 'User',
})(RequiredForm);

storiesOf('DatePicker', module)
  .addDecorator(getStory => (
    <Box p={20} w={[1, 1 / 2]} bg="grayscale.white">
      {getStory()}
    </Box>
  ))
  .add('default', () => <DatePicker />)
  .add('placeholder', () => <DatePicker placeholder="Custom placeholder" />)
  .add('disabled', () => <DatePicker disabled />)
  .add('autofocus', () => <DatePicker autoFocus />)
  .add('custom date format', () => <DatePicker format="LL" placeholder="Month day, year" value="2010-01-02" />)
  .add('util props', () => <DatePicker my={50} />)
  .add('disabled dates', () => <DatePicker pickerOptions={withDisabled} />)
  .add('fires events', () => (
    <DatePicker
      onChange={action('datepicker-change')}
      onClick={action('datepicker-click')}
      onFocus={action('datepicker-focus')}
      onBlur={action('datepicker-blur')}
      onKeyUp={action('datepicker-key-up')}
    />
  ))
  .add('sizes', () => (
    <Flex wrap align="center">
      <Box w={1 / 3}>Large</Box>
      <Box w={2 / 3} mb="5px">
        <DatePicker s="large" />
      </Box>
      <Box w={1 / 3}>Medium</Box>
      <Box w={2 / 3} mb="5px">
        <DatePicker s="medium" />
      </Box>
      <Box w={1 / 3}>Small</Box>
      <Box w={2 / 3} mb="5px">
        <DatePicker s="small" />
      </Box>
    </Flex>
  ))
  .add('field - initial value', () => <SimpleReduxForm onSubmit={action('submit-simple-form')} />)
  .add('field - required', () => <RequiredReduxForm onSubmit={action('submit-required-form')} />);
