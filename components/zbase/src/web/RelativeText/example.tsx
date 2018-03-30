import React from 'react';
import { RelativeText } from '../index';

const now = Date.now();
const second = 1000;
const hour = second * 60 * 60;
const day = hour * 24;
export default () => (
  <ul>
    <li>
      recently (auto updates): <RelativeText value={now - second} color="tertiary.a" />
    </li>
    <li>
      past: <RelativeText value={now - 3 * day} color="tertiary.a" />
    </li>
    <li>
      future: <RelativeText value={now + day} color="tertiary.a" />
    </li>
  </ul>
);
