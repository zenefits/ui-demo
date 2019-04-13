import React from 'react';

import { Box, TextBlock } from 'zbase';

import { storiesOf } from '../../../.storybook/storyHelpers';
import { Link } from '../../../index';
import Truncate from './Truncate';

const defaultText =
  'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?';

function getCustomEllipsis() {
  return (
    <Link href="https://www.google.com/" target="_blank" fontSize__deprecated__doNotUse={0}>
      Read more
    </Link>
  );
}

storiesOf('elements|Truncate', module)
  .addDecorator((getStory: Function) => (
    <Box p={20} w={[1, 1 / 2]} bg="grayscale.white">
      {getStory()}
    </Box>
  ))
  .add('default', () => <Truncate>{defaultText}</Truncate>)
  .add('alternative: TextBlock ellipsis', () => <TextBlock ellipsis>{defaultText}</TextBlock>)
  .add('centered', () => <Truncate textAlign="center">This is shorter to demonstrate centering.</Truncate>)
  .add('specified number of lines', () => (
    <Truncate lines={3} ellipsisText={getCustomEllipsis()}>
      {defaultText}
    </Truncate>
  ))
  .add('custom ellipsis text', () => <Truncate ellipsisText={getCustomEllipsis()}>{defaultText}</Truncate>)
  .add('hide custom ellipsis on resize if the whole text fits', () => (
    <Truncate ellipsisText={getCustomEllipsis()} isCustomEllipsisHiddenOnResize>
      The custom ellipsis control will hide if you resize me to fit >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    </Truncate>
  ));
