import React from 'react';

import { storiesOf } from '../../.storybook/storyHelpers';
import ExampleSelectable from './exampleSelectable';

storiesOf('tables|Table.CheckboxCell', module).add('selectable rows', () => <ExampleSelectable />);
