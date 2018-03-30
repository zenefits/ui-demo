import React from 'react';
import { DateText } from '../index';

const someDate = new Date('2017-11-18 19:55:34');
export default () => (
  <ul>
    <li>
      short (default): <DateText value={someDate} color="tertiary.a" />
    </li>
    <li>
      long: <DateText long value={someDate} color="tertiary.a" />
    </li>
  </ul>
);
