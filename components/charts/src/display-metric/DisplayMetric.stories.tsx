import { storiesOf } from '../../.storybook/storyHelpers';

import ExampleDefault from './exampleDefault';
import ExampleColor from './exampleColor';
import ExampleFormatted from './exampleFormatted';

storiesOf('charts|DisplayMetric', module)
  .add('default', ExampleDefault)
  .add('with formatting', ExampleFormatted)
  .add('color prop', ExampleColor);
