import React from 'react';

import { PluralText } from '../index';

const count = 1234;
export default () => (
  <PluralText none="No reviews" one="{count, number} review" other="{count, number} reviews" count={count} />
);
