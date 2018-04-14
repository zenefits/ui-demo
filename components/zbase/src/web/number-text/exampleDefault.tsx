import React from 'react';

import { NumberText } from '../index';

export default () => (
  <ul>
    <li>
      Decimal: <NumberText value={2345} style="decimal" />
    </li>
    <li>
      Currency: <NumberText value={2345} style="currency" currency="USD" />
    </li>
    <li>
      Currency (name): <NumberText value={2345} style="currency" currency="USD" currencyDisplay="name" />
    </li>
    <li>
      Currency (euros): <NumberText value={2345} style="currency" currency="EUR" />
    </li>
    <li>
      Percent (0 - 1): <NumberText value={0.5} style="percent" currency="EUR" />
    </li>
  </ul>
);
