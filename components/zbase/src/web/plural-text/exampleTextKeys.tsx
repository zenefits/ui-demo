import React from 'react';

import { PluralText } from '../index';

const count = 1;
export default () => (
  <PluralText
    noneKey="reviews.assigned.none"
    oneKey="reviews.assigned.one"
    otherKey="reviews.assigned.other"
    count={count}
  />
);
