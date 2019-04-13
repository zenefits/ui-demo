import React from 'react';

import { storiesOf } from '../../../.storybook/storyHelpers';
import FrequentlyAskedQuestions from './FrequentlyAskedQuestions';

storiesOf('example|FrequentlyAskedQuestions', module)
  .add('default', () => <FrequentlyAskedQuestions />)
  .add('with util props', () => <FrequentlyAskedQuestions width={1 / 2} m={4} />);
