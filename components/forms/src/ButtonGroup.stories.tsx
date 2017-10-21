import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import ButtonGroup from './ButtonGroup';
import Button from './Button';
import ButtonLink from './ButtonLink';

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

    <h3>Mix of Buttons and ButtonLinks</h3>
    <ButtonGroup>
      <Button>Click!</Button>
      <ButtonLink>Click!</ButtonLink>
      <Button>Click!</Button>
      <ButtonLink>Click!</ButtonLink>
    </ButtonGroup>
  </div>
));
