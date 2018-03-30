import React from 'react';
import { storiesOf } from '@storybook/react';
import Card from './Card';

storiesOf('Card', module)
  .add('header, rows, footer', () => (
    <Card>
      <Card.Header>Header</Card.Header>
      <Card.Row>Row 1</Card.Row>
      <Card.Row>Row 2</Card.Row>
      <Card.Footer>Footer</Card.Footer>
    </Card>
  ))
  .add('only rows', () => (
    <Card>
      <Card.Row>Row 1</Card.Row>
      <Card.Row>Row 2</Card.Row>
      <Card.Row>Row 3</Card.Row>
    </Card>
  ))
  .add('no rows', () => (
    <Card>
      <Card.Header>Header</Card.Header>
      <Card.Footer>Footer</Card.Footer>
    </Card>
  ))
  .add('with util props', () => (
    <Card>
      <Card.Header borderColor="tertiary.a">Header</Card.Header>
      <Card.Row p={6}>Row 1</Card.Row>
      <Card.Row bg="secondary.b">Row 2</Card.Row>
      <Card.Row bg="secondary.a" color="grayscale.white">
        Row 3
      </Card.Row>
      <Card.Footer borderLeft borderColor="primary.a">
        Footer
      </Card.Footer>
    </Card>
  ));
