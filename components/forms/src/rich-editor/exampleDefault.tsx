import React from 'react';

import RichEditor from './RichEditor';

const text =
  'Managers have been talking about employee satisfaction for what feels like ages, but what’s this new topic called <i>employee engagement</i> that’s entered the HR lexicon in recent years?';

export default () => <RichEditor defaultValue={text} />;
