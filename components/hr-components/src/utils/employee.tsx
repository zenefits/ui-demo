import { AvatarBadge } from 'z-frontend-composites';

import { EmploymentType } from '../../schema/schemaTypes';

export const getEmployeeDisplayName = (
  preferredOrFirstName: string,
  lastName: string,
  employmentType: EmploymentType,
  showContingentInfo: boolean,
): string => {
  const employmentInfoText = showContingentInfo && employmentType === EmploymentType.CO ? ' - Contingent Worker' : '';
  return `${preferredOrFirstName} ${lastName}${employmentInfoText}`;
};

export const getEmployeeBadge = (employee: { employmentType: EmploymentType }): AvatarBadge =>
  isContingentWorker(employee) ? 'contingent' : null;

export const isContingentWorker = (employee: { employmentType: EmploymentType }): boolean =>
  Boolean(employee && employee.employmentType === EmploymentType.CO);
