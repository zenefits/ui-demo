import React from 'react';

import { Box } from 'zbase';
import { Example } from 'z-frontend-storybook-config';

import { storiesOf } from '../../../.storybook/storyHelpers';
import ExampleEIN from './exampleEIN';
import ExampleZIP from './exampleZIP';
import { Form, FormMaskedInput } from '../../..';

const einMask = [/\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/];

storiesOf('forms|Form.MaskedInput', module)
  .addDecorator((getStory: Function) => (
    <Box p={20} w={[1, 1 / 2]} bg="grayscale.white">
      {getStory()}
    </Box>
  ))
  .add('EIN input', ExampleEIN)
  .add('ZIP', ExampleZIP)
  .add('states', () => (
    <>
      <Example label="Optional field">
        <Form onSubmit={() => {}} initialValues={{ ein: '123456789' }}>
          <FormMaskedInput optional label="EIN" name="ein" mask={einMask} />
        </Form>
      </Example>
      <Example label="Empty value">
        <Form onSubmit={() => {}} initialValues={{ ein: '' }}>
          <FormMaskedInput label="EIN" name="ein" mask={einMask} />
        </Form>
      </Example>
      <Example label="Guide shows future characters">
        {/* but this may make validation trickier */}
        <Form onSubmit={() => {}} initialValues={{ ein: '12' }}>
          <FormMaskedInput guide label="EIN" name="ein" mask={einMask} />
        </Form>
      </Example>
    </>
  ));
