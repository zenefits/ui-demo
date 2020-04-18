import React from 'react';

import { storiesOf } from '../../.storybook/storyHelpers';
import ExampleClickTop from './exampleInformationPopoverTop';
import OpenByDefault from './exampleInformationPopoverOpenByDefault';
import ExampleInfoButton from './exampleInfoButton';

storiesOf('overlays|InformationPopover', module)
  .add('click top', () => <ExampleClickTop />)
  .add('open by default', () => <OpenByDefault />)
  .add('triggered by InfoButton', () => <ExampleInfoButton />);
