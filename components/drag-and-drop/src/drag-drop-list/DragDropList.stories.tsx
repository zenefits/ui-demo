import { storiesOf } from '../../.storybook/storyHelpers';

import ExampleDefault from './exampleDefault';
import ExampleTypes from './exampleTypes';
import ExampleIsDragging from './exampleIsDragging';
import ExampleInModal from './exampleInModal';

storiesOf('drag-and-drop|DragDropList', module)
  .add('default', ExampleDefault)
  .add('types', ExampleTypes)
  .add('isDragging', ExampleIsDragging)
  .add('in modal', ExampleInModal);
