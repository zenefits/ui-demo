import React from 'react';
import { DateTimeText } from '../index';

const someDate = new Date('2017-11-18 19:55:34');
export default () => (
  <ul>
    <li>
      defaults: <DateTimeText value={someDate} color="tertiary.a" />
    </li>
    <li>
      customized:
      <DateTimeText
        value={someDate}
        month="short"
        day="numeric"
        year="numeric"
        weekday="long"
        hour="2-digit"
        minute="2-digit"
        second="2-digit"
        color="tertiary.a"
      />
    </li>
  </ul>
);
