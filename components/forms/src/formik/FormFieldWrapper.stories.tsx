import React from 'react';
// @ts-ignore
import { withViewport } from '@storybook/addon-viewport';

import { Box } from 'zbase';
import { setViewports } from 'z-frontend-app-bootstrap';

import { storiesOf } from '../../.storybook/storyHelpers';
import FormFieldWrapper from './FormFieldWrapper';
import Input from '../input/Input';

storiesOf('forms|FormFieldWrapper', module)
  .addDecorator(withViewport())
  .addDecorator((getStory: Function) => (
    <Box p={20} w={[1, 400]} bg="grayscale.white">
      {getStory()}
    </Box>
  ))
  .add('default', () => (
    <FormFieldWrapper name={name} label="Full Name">
      <Input />
    </FormFieldWrapper>
  ))
  .add(
    'optional label',
    () => (
      <FormFieldWrapper name={name} label="Full Name" optional>
        <Input />
      </FormFieldWrapper>
    ),
    setViewports([3, 0]),
  )
  .add('top aligned label', () => (
    <FormFieldWrapper name={name} label="Full Name" format="form-row-top-label">
      <Input />
    </FormFieldWrapper>
  ))
  .add('top aligned label - optional', () => (
    <FormFieldWrapper name={name} label="Full Name" format="form-row-top-label" optional>
      <Input />
    </FormFieldWrapper>
  ));
