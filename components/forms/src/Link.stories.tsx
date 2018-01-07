import React from 'react';
import { storiesOf } from '@storybook/react';
import Link from './Link';

storiesOf('Link', module).add('default', () => (
  <Link href="https://help.zenefits.com/" target="_blank" py={1}>
    This is a link. It'll go to help.zenefits.com
  </Link>
));
