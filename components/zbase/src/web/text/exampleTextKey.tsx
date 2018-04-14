import React from 'react';

import { Text } from '../index';

const employee = { fullName: 'Airat Aminev' };
export default () => <Text color="primary.a" textKey="homepage.hello" textValues={{ name: employee.fullName }} />;
