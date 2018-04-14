import React from 'react';

import { ObscureToggle } from '../../index';

const socialSecurityNumber = '123456789';
export default () => <ObscureToggle valueType="ssn" value={socialSecurityNumber} />;
