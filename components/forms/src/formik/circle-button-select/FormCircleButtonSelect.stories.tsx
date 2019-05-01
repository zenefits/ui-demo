import React from 'react';
import _ from 'lodash';

import { Box } from 'zbase';

import { storiesOf } from '../../../.storybook/storyHelpers';
import { Form } from '../Form';

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
    <Form.CircleButtonSelect name="numbers" label="Numbers" behavior="checkbox" numOptions={5}>
      {_.range(5).map(i => (
        <Form.CircleButton key={i} aria-label={i.toString()}>
          {i}
        </Form.CircleButton>
      ))}
    </Form.CircleButtonSelect>
  </Form>
);

export const RadioExample = () => (
  <Form onSubmit={() => {}} initialValues={{ rating: 3 }}>
    <Form.CircleButtonSelect name="rating" label="Rating" behavior="radio" numOptions={5}>
      {_.range(5).map(i => (
        <Form.CircleButton key={i} aria-label={i.toString()}>
          {i}
        </Form.CircleButton>
      ))}
    </Form.CircleButtonSelect>
  </Form>
);

export const DisabledExample = () => (
  <Form onSubmit={() => {}} initialValues={{ numbers: [false, false, true, false, false] }}>
    <Form.CircleButtonSelect name="numbers" label="Numbers" behavior="checkbox" numOptions={5} disabled>
      {_.range(5).map(i => (
        <Form.CircleButton key={i} aria-label={i.toString()}>
          {i}
        </Form.CircleButton>
      ))}
    </Form.CircleButtonSelect>
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
    <Form.CircleButtonSelect name="small" label="Small" behavior="radio" numOptions={7}>
      {_.range(7).map(i => (
        <Form.CircleButton key={i} aria-label={i.toString()} s="small">
          {i}
        </Form.CircleButton>
      ))}
    </Form.CircleButtonSelect>
    <Form.CircleButtonSelect name="large" label="Large" behavior="radio" numOptions={5}>
      {_.range(5).map(i => (
        <Form.CircleButton key={i} aria-label={i.toString()} s="large">
          {i}
        </Form.CircleButton>
      ))}
    </Form.CircleButtonSelect>
  </Form>
);
