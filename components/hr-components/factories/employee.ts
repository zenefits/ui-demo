import { images } from 'z-frontend-theme';

import { AllEmployee } from '../schema/schemaTypes';

export function employee(overrides?: Partial<AllEmployee>): AllEmployee {
  return {
    id: '10',
    preferredOrFirstName: 'Bob',
    last_name: 'Pug',
    photoUrl: images.pug,
    title: 'Software Developer',
    department: {
      id: '1',
      name: 'Engineering',
    },
    ...overrides,
  };
}

export function employeeWithManager(overrides?: Partial<AllEmployee>): AllEmployee {
  return employee({
    reportToEmployee: {
      id: '1',
      preferredOrFirstName: 'Sara',
      last_name: 'Golden',
    },
    ...overrides,
  });
}
