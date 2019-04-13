import React from 'react';
// @ts-ignore
import { action } from '@storybook/addon-actions';
// @ts-ignore
import { withViewport } from '@storybook/addon-viewport';

import { Box } from 'zbase';
import { setViewports, skipVisualTest } from 'z-frontend-app-bootstrap';

import { storiesOf } from '../../../.storybook/storyHelpers';
import { Form } from '../Form';

storiesOf('forms|Form.Footer', module)
  .addDecorator(withViewport())
  .addDecorator((getStory: Function) => (
    <Box p={20} w={[1, 1 / 2]} bg="grayscale.white">
      {getStory()}
    </Box>
  ))
  .add('default', () => <Form.Footer primaryText="Save" cancelOnClick={action('footer-cancel-clicked')} />)
  .add('primary disabled', () => <Form.Footer primaryText="Save" primaryDisabled />)
  .add('custom button text', () => <Form.Footer primaryText="Finish" cancelText="Back" />)
  .add(
    'custom actions',
    () => (
      <Form.Footer
        primaryText="Save"
        primaryOnClick={action('footer-primary-clicked')}
        cancelOnClick={action('footer-cancel-clicked')}
      />
    ),
    skipVisualTest,
  )
  .add('without cancel', () => <Form.Footer primaryText="Save" cancelShown={false} />)
  .add('util props', () => <Form.Footer primaryText="Save" bg="secondary.c" mt={3} />)
  .add('mobile - default', () => <Form.Footer primaryText="Save" />, setViewports([0]))
  .add('mobile - without cancel', () => <Form.Footer primaryText="Save" cancelShown={false} />, setViewports([0]));
