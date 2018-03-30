import React from 'react';
import { storiesOf } from '@storybook/react';
import { Flex, Box, Heading } from 'zbase';
import Link from './Link';
import Truncate from './Truncate';

const defaultText =
  'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?';

function getCustomEllipsis() {
  return (
    <Link href="https://www.google.com/" target="_blank" fontSize={0}>
      Custom ellipsis
    </Link>
  );
}

storiesOf('Truncate', module)
  .addDecorator(getStory => <Flex p={20}>{getStory()}</Flex>)
  .add('Basic', () => (
    <Box ml={4} mt={4} w={1 / 2}>
      <Heading level={5} my={2}>
        Default
      </Heading>
      <Truncate>{defaultText}</Truncate>
      <Heading level={5} my={2}>
        Default w/custom ellipsis:
      </Heading>
      <Truncate ellipsis={getCustomEllipsis()}>{defaultText}</Truncate>
      <Heading level={5} my={2}>
        Hide custom ellipsis on resize if the whole text fits
      </Heading>
      <Truncate ellipsis={getCustomEllipsis()} isCustomEllipsisHiddenOnResize>
        the custom ellipsis Control will hide if you resize me to fit >>>>>>>>>>>>>>>>>> if im showing all the way, the
        control should be hidden
      </Truncate>
      <Heading level={5} my={2}>
        Specified the number of lines and custom ellipsis:
      </Heading>
      <Truncate lines={3} ellipsis={getCustomEllipsis()}>
        {defaultText}
      </Truncate>
    </Box>
  ));
