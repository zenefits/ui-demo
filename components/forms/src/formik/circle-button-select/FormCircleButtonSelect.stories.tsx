import React from 'react';
import { range } from 'lodash';

import { Box } from 'zbase';

import { storiesOf } from '../../../.storybook/storyHelpers';
import { Form, FormCircleButton, FormCircleButtonSelect } from '../../..';

storiesOf('forms|Form.CircleButtonSelect', module)
  .addDecorator((getStory: Function) => (
    <Box p={20} w={[1, 1 / 2]} bg="grayscale.white">
      {getStory()}
    </Box>
  ))
  .add('checkbox', () => <CheckboxExample />)
  .add('radio', () => <RadioExample />)
  .add('disabled', () => <DisabledExample />)
  .add('sizes', () => <SizesExample />);

export const CheckboxExample = () => (
  <Form onSubmit={() => {}} initialValues={{ numbers: [false, false, true, false, false] }}>
    <FormCircleButtonSelect name="numbers" label="Numbers" behavior="checkbox" numOptions={5}>
      {range(5).map(integer => (
        <FormCircleButton key={integer.toString()} aria-label={integer.toString()}>
          {integer}
        </FormCircleButton>
      ))}
    </FormCircleButtonSelect>
  </Form>
);

export const RadioExample = () => (
  <Form onSubmit={() => {}} initialValues={{ rating: 3 }}>
    <FormCircleButtonSelect name="rating" label="Rating" behavior="radio" numOptions={5}>
      {range(5).map(integer => (
        <FormCircleButton key={integer.toString()} aria-label={integer.toString()}>
          {integer}
        </FormCircleButton>
      ))}
    </FormCircleButtonSelect>
  </Form>
);

export const DisabledExample = () => (
  <Form onSubmit={() => {}} initialValues={{ numbers: [false, false, true, false, false] }}>
    <FormCircleButtonSelect name="numbers" label="Numbers" behavior="checkbox" numOptions={5} disabled>
      {range(5).map(integer => (
        <FormCircleButton key={integer.toString()} aria-label={integer.toString()}>
          {integer}
        </FormCircleButton>
      ))}
    </FormCircleButtonSelect>
  </Form>
);

export const SizesExample = () => (
  <Form
    onSubmit={() => {}}
    initialValues={{
      small: 3,
      large: 3,
    }}
  >
    <FormCircleButtonSelect name="small" label="Small" behavior="radio" numOptions={7}>
      {range(7).map(integer => (
        <FormCircleButton key={integer.toString()} aria-label={integer.toString()} s="small">
          {integer}
        </FormCircleButton>
      ))}
    </FormCircleButtonSelect>
    <FormCircleButtonSelect name="large" label="Large" behavior="radio" numOptions={5}>
      {range(5).map(integer => (
        <FormCircleButton key={integer.toString()} aria-label={integer.toString()} s="large">
          {integer}
        </FormCircleButton>
      ))}
    </FormCircleButtonSelect>
  </Form>
);
