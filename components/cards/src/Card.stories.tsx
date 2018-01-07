import React from 'react';
import { storiesOf } from '@storybook/react';
import Card from './Card';

storiesOf('Card', module).add('default', () => (
  <Card>
    <Card.Header> Header </Card.Header>
    <Card.Row> Row 1</Card.Row>
    <Card.Row> Row 2</Card.Row>
    <Card.Footer> Footer </Card.Footer>
  </Card>
));
