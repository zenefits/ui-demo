import React from 'react';
// @ts-ignore
import { action } from '@storybook/addon-actions';
// @ts-ignore
import { withViewport } from '@storybook/addon-viewport';

import { Box } from 'zbase';
import { setViewports } from 'z-frontend-app-bootstrap';
import { Example } from 'z-frontend-storybook-config';

import { storiesOf } from '../../../.storybook/storyHelpers';
import { Form } from '../../..';

storiesOf('forms|Form.Footer', module)
  .addDecorator(withViewport())
  .addDecorator((getStory: Function) => (
    <Box p={20} w={[1, 1 / 2]} bg="grayscale.white">
      {getStory()}
    </Box>
  ))
  .add('default', () => (
    <FormWrapper>
      <Form.Footer primaryText="Save" cancelOnClick={action('footer-cancel-clicked')} />
    </FormWrapper>
  ))
  .add('options', () => (
    <>
      <Example label="custom button text">
        <FormWrapper>
          <Form.Footer primaryText="Finish" cancelText="Back" />
        </FormWrapper>
      </Example>
      <Example label="primary disabled">
        <FormWrapper>
          <Form.Footer primaryText="Save" primaryDisabled />
        </FormWrapper>
      </Example>
      <Example label="without cancel">
        <FormWrapper>
          <Form.Footer primaryText="Save" cancelShown={false} />
        </FormWrapper>
      </Example>
      <Example label="with tertiary">
        <FormWrapper>
          <Form.Footer primaryText="Continue" cancelText="Back" tertiaryShown tertiaryText="Cancel Import" />
        </FormWrapper>
      </Example>
      <Example label="with util props">
        <FormWrapper>
          <Form.Footer primaryText="Save" bg="secondary.c" mt={3} />
        </FormWrapper>
      </Example>
    </>
  ))
  .add(
    'mobile',
    () => (
      <>
        <Example label="default">
          <FormWrapper>
            <Form.Footer primaryText="Save" />
          </FormWrapper>
        </Example>
        <Example label="without cancel">
          <FormWrapper>
            <Form.Footer primaryText="Save" cancelShown={false} />
          </FormWrapper>
        </Example>
        <Example label="with tertiary">
          <FormWrapper>
            <Form.Footer primaryText="Continue" cancelText="Back" tertiaryShown tertiaryText="Cancel Import" />
          </FormWrapper>
        </Example>
        <Example label="without cancel, with tertiary">
          <FormWrapper>
            <Form.Footer primaryText="Continue" cancelShown={false} tertiaryShown tertiaryText="Cancel Import" />
          </FormWrapper>
        </Example>
      </>
    ),
    setViewports([0]),
  )
  .add('Form Footer with Error', () => (
    <FormWrapper showError>
      <Form.Footer primaryText="Save" cancelOnClick={action('footer-cancel-clicked')} />
    </FormWrapper>
  ));

class FormWrapper extends React.Component<{ showError: boolean }> {
  static defaultProps = {
    showError: false,
  };

  render() {
    return (
      <Form initialValues={{}} onSubmit={() => {}}>
        {({ errors }) => {
          if (this.props.showError) {
            (errors as any).onSubmitError = 'There was an error while talking to the server.';
          }
          return this.props.children;
        }}
      </Form>
    );
  }
}
