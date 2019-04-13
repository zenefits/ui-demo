import React from 'react';

import ButtonGroup from './ButtonGroup';
import Button from '../button/Button';

export default () => (
  <ButtonGroup p={4} border w={1}>
    <Button>Bold</Button>
    <Button>Italic</Button>
    <Button>Underline</Button>
  </ButtonGroup>
);
