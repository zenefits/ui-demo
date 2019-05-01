import React from 'react';

import { TextInline } from 'zbase';

import Link from './Link';

export default () => (
  <TextInline>
    Get in touch: <Link href="tel:+1-555-555-7111">555-555-5555</Link> or{' '}
    <Link href="mailto:info@zenefits.com">info@zenefits.com</Link>
  </TextInline>
);
