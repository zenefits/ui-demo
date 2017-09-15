import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Checkbox from './Checkbox';

storiesOf('Checkbox', module)
  .add('default', () => <Checkbox id="default" onChange={action('checkbox-change')} />)
  .add('Disabled State', () => (
    <Checkbox id="disabledCheckbox" isDisabled onChange={action('disabled-checkbox-change')} />
  ));
