import React from 'react';
// @ts-ignore
import { action } from '@storybook/addon-actions';

import { Box } from 'zbase';
import { skipVisualTest } from 'z-frontend-app-bootstrap';
import { paddedBox, Example } from 'z-frontend-storybook-config';

import { storiesOf } from '../../.storybook/storyHelpers';
import Radio from './Radio';

storiesOf('forms|Radio', module)
  .addDecorator(paddedBox)
  .add('default', () => (
    <Box>
      <Radio name="option" value="one" label="Option 1" />
      <Radio name="option" value="two" label="Option 2" />
    </Box>
  ))
  .add('states', () => (
    <>
      <Box mb={4}>
        <Example mb={1} label="Unselected - Normal">
          <Radio name="name1" value="one" label="Option label" />
        </Example>
        <Example mb={1} label="Unselected - Hover">
          <Radio name="name2" value="one" label="Option label" className="simulate-hover" />
        </Example>
        <Example mb={1} label="Unselected - Focus">
          <Radio name="name3" value="one" label="Option label" className="simulate-focus" />
        </Example>
        <Example mb={1} label="Unselected - Active">
          <Radio name="name4" value="one" label="Option label" className="simulate-active" />
        </Example>
        <Example mb={1} label="Unselected - Disabled">
          <Radio name="name5" value="one" label="Option label" disabled />
        </Example>
        <Example mb={1} label="Unselected - Error">
          <Radio name="name6" value="one" label="Option label" className="error" />
        </Example>
      </Box>
      <Box>
        <Example mb={1} label="Selected - Normal">
          <Radio name="name11" value="one" label="Option label" defaultChecked />
        </Example>
        <Example mb={1} label="Selected - Hover">
          <Radio name="name12" value="one" label="Option label" defaultChecked className="simulate-hover" />
        </Example>
        <Example mb={1} label="Selected - Focus">
          <Radio name="name13" value="one" label="Option label" defaultChecked className="simulate-focus" />
        </Example>
        <Example mb={1} label="Selected - Active">
          <Radio name="name14" value="one" label="Option label" defaultChecked className="simulate-active" />
        </Example>
        <Example mb={1} label="Selected - Disabled">
          <Radio name="name15" value="one" label="Option label" defaultChecked disabled />
        </Example>
        <Example mb={1} label="Selected - Error">
          <Radio name="name16" value="one" label="Option label" defaultChecked className="error" />
        </Example>
      </Box>
    </>
  ))
  .add('supports util props', () => (
    <Box>
      <Radio name="option" value="one" label="Option 1 (margin)" my={20} />
      <Radio name="option" value="two" label="Option 2 (font)" fontSize__deprecated__doNotUse={4} />
    </Box>
  ))

  .add(
    'handles events',
    () => (
      <Box>
        <Radio
          name="option"
          value="one"
          label="Option 1"
          onFocus={action('radio-onfocus')}
          onBlur={action('radio-onblur')}
          onKeyUp={action('radio-onkeyup')}
          onChange={action('radio-onchange')}
          onClick={action('radio-onclick')}
        />
        <Radio
          name="option"
          value="two"
          label="Option 2"
          onFocus={action('radio-onfocus')}
          onBlur={action('radio-onblur')}
          onKeyUp={action('radio-onkeyup')}
          onChange={action('radio-onchange')}
          onClick={action('radio-onclick')}
        />
      </Box>
    ),
    skipVisualTest,
  );
