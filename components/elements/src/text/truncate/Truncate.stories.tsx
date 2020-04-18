import React from 'react';

import { Box, TextBlock } from 'zbase';

import { storiesOf } from '../../../.storybook/storyHelpers';
import Truncate from './Truncate';

const defaultText =
  'Uninitiated our because war, seven of and up, this relations the area objects little line it an gentlemen, over people I to our when table long both been have my of taken of move tag by the intention chance get the an his as the of bit real dresses getting self-interest. Caches I cheek, to smaller would of watching of chance display the said even feel the and space he could a all abundantly the it unavoidable, impatient my of human the this been to the offering point the that roman back traveler tones. Arranged kind lack good rain that.';

storiesOf('elements|Truncate', module)
  .addDecorator((getStory: Function) => (
    <Box p={20} w={[1, 1 / 2]} bg="grayscale.white">
      {getStory()}
    </Box>
  ))
  .add('default', () => <Truncate>{defaultText}</Truncate>)
  .add('alternative: TextBlock ellipsis', () => <TextBlock ellipsis>{defaultText}</TextBlock>)
  .add('centered', () => <Truncate textAlign="center">This is shorter to demonstrate centering.</Truncate>)
  .add('custom ellipsis text', () => <Truncate ellipsisText="[...]">{defaultText}</Truncate>)
  .add('lines', () => <Truncate lines={3}>{defaultText}</Truncate>)
  .add('lines with custom ellipsis text', () => (
    <Truncate lines={3} ellipsisText="[...]">
      {defaultText}
    </Truncate>
  ))
  .add('hide custom ellipsis on resize if the whole text fits', () => (
    <Truncate ellipsisText="[...]" isCustomEllipsisHiddenOnResize>
      The custom ellipsis control will hide if you resize me to fit >>>>>>>>>>>>>>
    </Truncate>
  ));
