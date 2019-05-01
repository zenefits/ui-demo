import React from 'react';

import ButtonGroup from './ButtonGroup';
import Button from '../button/Button';

export default () => (
  <ButtonGroup>
    <Button.Link>Previous</Button.Link>
    <Button.Link>Current</Button.Link>
    <Button.Link>Upcoming</Button.Link>
  </ButtonGroup>
);
