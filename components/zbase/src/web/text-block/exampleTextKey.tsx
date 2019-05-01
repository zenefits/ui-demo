import React from 'react';

import { TextBlock } from '../index';

const employee = { name: 'Miguel' };
export default () => <TextBlock textKey="homepage.hello" textValues={{ name: employee.name }} />;
