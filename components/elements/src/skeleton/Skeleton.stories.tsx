import React from 'react';

import { paddedSizedBox, Example } from 'z-frontend-storybook-config';
import { Heading, TextBlock } from 'zbase';

import { storiesOf } from '../../.storybook/storyHelpers';
import Skeleton from './Skeleton';

storiesOf('elements|Skeleton', module)
  .addDecorator(paddedSizedBox(300))
  .add('default', () => <Skeleton />)
  .add('variants', () => (
    <>
      <Example label="Sized">
        <Skeleton width={100} height={100} />
      </Example>
      <Example label="Circle">
        <Skeleton width={100} height={100} isCircle />
      </Example>
      <Example label="Heading">
        <Heading level={2}>
          <Skeleton />
        </Heading>
      </Example>
      <Example label="TextBlock (small)">
        <TextBlock fontStyle="paragraphs.s">
          <Skeleton />
        </TextBlock>
      </Example>
    </>
  ));
