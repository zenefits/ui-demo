import React from 'react';

import { TextInline } from '../index';

const employee = { name: 'Miguel' };
export default () => <TextInline color="secondary.a" textKey="homepage.hello" textValues={{ name: employee.name }} />;
