import React from 'react';
import { Text } from '../index';

const employee = { fullName: 'John Smith' };
export default () => <Text color="primary.a" textKey="homepage.hello" textValues={{ name: employee.fullName }} />;
