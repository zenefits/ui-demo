import React from 'react';

import ObscureToggle from './ObscureToggle';

const socialSecurityNumber = '123456789';
export default () => <ObscureToggle valueType="ssn" value={socialSecurityNumber} />;
