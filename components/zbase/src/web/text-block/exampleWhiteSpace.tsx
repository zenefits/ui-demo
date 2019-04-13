import React from 'react';

import { TextBlock } from '../index';

const text = `Many employers aren’t keeping pace with what young workers want on the flexibility front, however.

“People find it challenging to get the flexibility to work from home,” says Broderick.`;
export default () => (
  <TextBlock whiteSpace="pre-wrap" wordBreak="break-word" bg="grayscale.f" w={1 / 2} p={2}>
    {text}
  </TextBlock>
);
