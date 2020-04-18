import React from 'react';

import { Box, TextBlock } from 'zbase';
import { paddedSizedBox } from 'z-frontend-storybook-config';

import { storiesOf } from '../../../.storybook/storyHelpers';
import ReadMore from './ReadMore';

const defaultText =
  'Sally sets very high standards, aware that this will bring attention and promotion. When ideas are challenged by others, Sally listens to their view politely, but is able to maintain a position firmly and persuasively without aggression. Sets an example of bravery that inspires others. Always contributes vigorously to the efforts of the team, whether as a leader or a team member.';

storiesOf('elements|ReadMore', module)
  .addDecorator(paddedSizedBox(1 / 2))
  .add('default', () => <ReadMore lines={3}>{defaultText}</ReadMore>)
  .add('util props', () => (
    <ReadMore fontStyle="paragraphs.l" color="primary.a">
      {defaultText}
    </ReadMore>
  ))
  .add('single line', () => (
    <ReadMore lines={1} isExpandControlHiddenOnResize>
      {defaultText}
    </ReadMore>
  ))
  .add('non-white bg', () => (
    <Box bg="grayscale.f" p={3}>
      <ReadMore bg="grayscale.f" lines={3}>
        {defaultText}
      </ReadMore>
    </Box>
  ))
  .add('isExpandControlHiddenOnResize', () => (
    <ReadMore isExpandControlHiddenOnResize>
      Expand control will hide if you resize me to fit>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    </ReadMore>
  ))
  .add('custom expandedText', () => (
    <ReadMore
      expandedText={
        <TextBlock color="affirmation.a" fontStyle="paragraphs.l" tag="p">
          At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti
          atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique
          sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum
          facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil
          impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor
          repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et
          voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus,
          ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat
        </TextBlock>
      }
    >
      {defaultText}
    </ReadMore>
  ));
