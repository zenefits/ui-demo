import React, { Component } from 'react';

import { Box, Flex, TextBlock } from 'zbase';
import { truncateFix, Ellipsis, EllipsisProps } from 'z-frontend-elements';
import { FontStyleString } from 'z-frontend-theme';
import { Avatar } from 'z-frontend-composites';

import { getEmployeeBadge } from '../utils/employee';
import { EmploymentType } from '../../schema/schemaTypes';

export type EmployeeType = {
  id: string;
  preferredOrFirstName: string;
  last_name: string;
  photoUrl: string;
  title?: string;
  /**
   * Being used to show the Contingent worker circle on the avatar if applicable
   */
  employmentType: EmploymentType;
  department?: {
    id: string;
    name: string;
  };
  reportToEmployee?: {
    id: string;
    preferredOrFirstName: string;
    last_name: string;
  };
};

declare type Props = {
  employee: EmployeeType;
  size?: 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge' | 'xxlarge';
  mode?: 'horizontal' | 'vertical';
  showManager?: boolean;
  /*
  In case ellipsis used, whether to show the tooltip.
  Default: true
  */
  showTooltip?: boolean;
  showTitle?: boolean;
  showDepartment?: boolean;
};

const sizeMap = {
  xsmall: ['paragraphs.m', 'paragraphs.s'],
  small: ['paragraphs.l', 'paragraphs.m'],
  medium: ['paragraphs.xl', 'paragraphs.m'],
  large: ['paragraphs.xl', 'paragraphs.l'],
  xlarge: ['paragraphs.xl', 'paragraphs.l'],
  xxlarge: ['paragraphs.xl', 'paragraphs.l'],
};

const getEmployeeTitle = (
  employee: { title?: string; department?: { name: string } },
  showDepartment: boolean,
): string => {
  if (!employee.title) {
    return null;
  }
  if (!showDepartment || !employee.department || !employee.department.name) {
    return `${employee.title}`;
  }
  return `${employee.title} | ${employee.department.name}`;
};
class EmployeeProfileBlock extends Component<Props> {
  static defaultProps = {
    size: 'xlarge',
    mode: 'horizontal',
    showManager: true,
    showTooltip: true,
    showTitle: true,
    showDepartment: true,
  };

  render() {
    const { employee, size, mode, showManager, showTooltip, showTitle, showDepartment } = this.props;
    const [nameFontSize, titleFontSize] = sizeMap[size] as [FontStyleString, FontStyleString];
    const avatarSize = size;

    const isVertical = mode === 'vertical';
    const flexDirection = isVertical ? 'column' : 'row';
    const flexAlign = isVertical ? 'center' : 'flex-start';
    return (
      <Box style={truncateFix}>
        <Flex mx={-2} direction={flexDirection} align={flexAlign}>
          <Box px={2} pb={showManager || showTitle ? 2 : null} flex="0 0 auto">
            <Avatar
              firstName={employee.preferredOrFirstName}
              lastName={employee.last_name}
              s={avatarSize}
              photoUrl={employee.photoUrl}
              badge={getEmployeeBadge(employee)}
              data-testid="employee-avatar"
            />
          </Box>
          <Box px={2} flex="1 1 auto" w={1} style={truncateFix}>
            <EllipsisInfoText
              fontStyle={nameFontSize}
              data-testid="employee-name"
              textAlign={isVertical ? 'center' : null}
              mb={1}
              color="grayscale.b"
              fullTextPlacement="right"
              showTooltip={showTooltip}
              value={`${employee.preferredOrFirstName} ${employee.last_name}`}
            />
            {showTitle &&
              (isVertical ? (
                <>
                  <EllipsisInfoText
                    fontStyle={titleFontSize}
                    color="grayscale.c"
                    textAlign="center"
                    fullTextPlacement="right"
                    showTooltip={showTooltip}
                    value={employee.title}
                  />
                  {employee.department && showDepartment && (
                    <EllipsisInfoText
                      fontStyle={titleFontSize}
                      color="grayscale.c"
                      textAlign="center"
                      fullTextPlacement="right"
                      showTooltip={showTooltip}
                      value={employee.department.name}
                    />
                  )}
                </>
              ) : (
                <EllipsisInfoText
                  fontStyle={titleFontSize}
                  color="grayscale.c"
                  data-testid="horizontal-employee-detail"
                  fullTextPlacement="right"
                  showTooltip={showTooltip}
                  value={getEmployeeTitle(employee, showDepartment)}
                />
              ))}
            {showManager && employee.reportToEmployee && employee.reportToEmployee.preferredOrFirstName && (
              <EllipsisInfoText
                fontStyle="paragraphs.s"
                color="grayscale.d"
                data-testid="employee-reports-to"
                showTooltip={showTooltip}
                value={`Reports to ${employee.reportToEmployee.preferredOrFirstName} ${employee.reportToEmployee.last_name}`}
              />
            )}
          </Box>
        </Flex>
      </Box>
    );
  }
}

export default EmployeeProfileBlock;

class EllipsisInfoText extends Component<{ value: string | string[]; showTooltip: boolean } & EllipsisProps> {
  render() {
    const { value, showTooltip, ...rest } = this.props;
    if (showTooltip) {
      return <Ellipsis {...rest}>{value}</Ellipsis>;
    }
    return (
      <TextBlock ellipsis {...rest}>
        {value}
      </TextBlock>
    );
  }
}
