import React from 'react';

import TimeTag from './TimeTag';
import { TextBlock } from '../index';

export default () => (
  <TextBlock>
    I need to make dinner on <TimeTag value={'2018-12-25 20:00'}>Christmas</TimeTag>.
  </TextBlock>
);
