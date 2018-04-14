import React from 'react';

import { TimeText } from '../index';

const someDate = new Date('2017-11-18 19:55:34');
export default () => <TimeText value={someDate} color="tertiary.a" />;
