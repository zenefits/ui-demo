import React from 'react';
// @ts-ignore
import { withViewport } from '@storybook/addon-viewport';

import { Box } from 'zbase';
import { setViewports } from 'z-frontend-app-bootstrap';
import { Example } from 'z-frontend-storybook-config';

import { storiesOf } from '../../.storybook/storyHelpers';
import FormFieldWrapper from './FormFieldWrapper';
import Input from '../input/Input';

const commonProps = {
  name: 'name',
  label: 'Full Name',
};

storiesOf('forms|FormFieldWrapper', module)
  .addDecorator(withViewport())
  .addDecorator((getStory: Function) => (
    <Box p={20} w={[1, 400]} bg="grayscale.white">
      {getStory()}
    </Box>
  ))
  .add(
    'default',
    () => (
      <FormFieldWrapper {...commonProps}>
        <Input />
      </FormFieldWrapper>
    ),
    setViewports([3, 0]),
  )
  .add(
    'optional label',
    () => (
      <FormFieldWrapper {...commonProps} optional>
        <Input />
      </FormFieldWrapper>
    ),
    setViewports([3, 0]),
  )
  .add('top aligned label', () => (
    <FormFieldWrapper {...commonProps} format="form-row-top-label">
      <Input />
    </FormFieldWrapper>
  ))
  .add('top aligned label - optional', () => (
    <FormFieldWrapper {...commonProps} format="form-row-top-label" optional>
      <Input />
    </FormFieldWrapper>
  ))
  // TODO: delete others above
  .add(
    'variations',
    () => (
      <>
        <Example label="default">
          <FormFieldWrapper {...commonProps}>
            <Input />
          </FormFieldWrapper>
        </Example>
        <Example label="optional">
          <FormFieldWrapper {...commonProps} optional>
            <Input />
          </FormFieldWrapper>
        </Example>
        <Example label="help text">
          <FormFieldWrapper {...commonProps} helpText="Some extra help text.">
            <Input />
          </FormFieldWrapper>
        </Example>
        <Example label="optional + help text">
          <FormFieldWrapper {...commonProps} optional helpText="Some extra help text.">
            <Input />
          </FormFieldWrapper>
        </Example>
        <Example label="format top aligned label">
          <FormFieldWrapper {...commonProps} format="form-row-top-label">
            <Input />
          </FormFieldWrapper>
        </Example>
        <Example label="format top aligned label + optional">
          <FormFieldWrapper {...commonProps} format="form-row-top-label" optional>
            <Input />
          </FormFieldWrapper>
        </Example>
        <Example label="format top aligned label + optional + helpText">
          <FormFieldWrapper {...commonProps} format="form-row-top-label" optional helpText="Some extra help text">
            <Input />
          </FormFieldWrapper>
        </Example>
        <Example label="format raw">
          <FormFieldWrapper {...commonProps} format="raw">
            <Input />
          </FormFieldWrapper>
        </Example>
      </>
    ),
    setViewports([3, 0]),
  );
