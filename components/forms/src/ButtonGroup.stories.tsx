import React from 'react';
import { storiesOf } from '@storybook/react';

import ButtonGroup from './ButtonGroup';
import Button from './Button';

storiesOf('Button', module).add('ButtonGroup', () => (
  <div>
    <h1>ButtonGroups</h1>

    <h3>One Button</h3>
    <ButtonGroup>
      <Button>Click!</Button>
    </ButtonGroup>

    <h3>Two Buttons</h3>
    <ButtonGroup>
      <Button>Click!</Button>
      <Button>Click!</Button>
    </ButtonGroup>

    <h3>Three Buttons</h3>
    <ButtonGroup>
      <Button>Click!</Button>
      <Button>Click!</Button>
      <Button>Click!</Button>
    </ButtonGroup>

    <h3>Mix of Buttons and Button Links</h3>
    <ButtonGroup>
      <Button>Click!</Button>
      <Button.Link>Click!</Button.Link>
      <Button>Click!</Button>
      <Button.Link>Click!</Button.Link>
    </ButtonGroup>
  </div>
));
