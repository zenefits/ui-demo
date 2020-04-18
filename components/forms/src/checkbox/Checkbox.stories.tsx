import React from 'react';
// @ts-ignore
import { action } from '@storybook/addon-actions';

import { skipVisualTest } from 'z-frontend-app-bootstrap';
import { Box } from 'zbase';
import { Example } from 'z-frontend-storybook-config';

import { storiesOf } from '../../.storybook/storyHelpers';
import Checkbox from './Checkbox';

storiesOf('forms|Checkbox', module)
  .addDecorator((getStory: Function) => (
    <Box p={20} w={[1, 1 / 2]} bg="grayscale.white">
      {getStory()}
    </Box>
  ))
  .add('default', () => <Checkbox label="Label" />)
  .add('states', () => (
    <>
      <Box mb={4}>
        <Example mb={1} label="Unselected - Normal">
          <Checkbox label="Label" />
        </Example>
        <Example mb={1} label="Unselected - Hover">
          <Checkbox label="Label" className="simulate-hover" />
        </Example>
        <Example mb={1} label="Unselected - Focus">
          <Checkbox label="Label" className="simulate-focus" />
        </Example>
        <Example mb={1} label="Unselected - Active">
          <Checkbox label="Label" className="simulate-active" />
        </Example>
        <Example mb={1} label="Unselected - Disabled">
          <Checkbox label="Label" disabled />
        </Example>
        <Example mb={1} label="Unselected - Error">
          <Checkbox label="Label" className="error" />
        </Example>
      </Box>
      <Box>
        <Example mb={1} label="Selected - Normal">
          <Checkbox label="Label" defaultChecked />
        </Example>
        <Example mb={1} label="Selected - Hover">
          <Checkbox label="Label" defaultChecked className="simulate-hover" />
        </Example>
        <Example mb={1} label="Selected - Focus">
          <Checkbox label="Label" defaultChecked className="simulate-focus" />
        </Example>
        <Example mb={1} label="Selected - Active">
          <Checkbox label="Label" defaultChecked className="simulate-active" />
        </Example>
        <Example mb={1} label="Selected - Disabled">
          <Checkbox label="Label" defaultChecked disabled />
        </Example>
        <Example mb={1} label="Selected - Error">
          <Checkbox label="Label" defaultChecked className="error" />
        </Example>
      </Box>
    </>
  ))

  .add('indeterminate', () => <Checkbox indeterminate name="name" label="Label" />)
  .add('util props', () => <Checkbox label="Label" my={50} />)
  .add(
    'fires events',
    () => (
      <Checkbox
        label="Try interacting"
        onFocus={action('checkbox-onfocus')}
        onBlur={action('checkbox-onblur')}
        onKeyUp={action('checkbox-onkeyup')}
        onChange={action('checkbox-onchange')}
      />
    ),
    skipVisualTest,
  );
