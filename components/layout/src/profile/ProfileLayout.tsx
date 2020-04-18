import React, { Component } from 'react';

import { Box, Flex, Heading, TextBlock } from 'zbase';
import { styled } from 'z-frontend-theme';
import { space } from 'z-frontend-theme/utils';

import { LoadingScreen } from 'z-frontend-elements';

interface ProfileLayoutProps {
  /**
   * Whether the profile is currently loading.
   * @default false
   */
  isLoading?: boolean;

  /** Name of the employee or company being profiled. Serves as title in the header.  */
  name?: string;
  /** Renders Additional profile details to display in the header. */
  detailsRender?: () => React.ReactNode;

  /** Renders main content. Normally one or more cards. */
  mainRender?: () => React.ReactNode;
  /** Renders the avatar of the employee or profile. */
  avatarRender?: () => React.ReactNode;
  /** Renders navigation between sections of the profile. */
  navRender?: () => React.ReactNode;

  // later, will support action dropdown (Terminate, Export etc)
}

const StyledHeader = styled(Flex)`
  min-height: ${space(7)};
`;

const AvatarContainer = styled(Flex)`
  position: relative;
`;

const AbsoluteBox = styled(Box)`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;

const columnSpacing = 3;
const rowSpacing = 3;

/**
 * A layout component for a profile, such as a company or employee.
 */
class ProfileLayout extends Component<ProfileLayoutProps> {
  render() {
    const { isLoading, name, detailsRender, avatarRender, mainRender, navRender } = this.props;
    if (isLoading) {
      return <LoadingScreen />;
    }

    return (
      <Flex wrap>
        <Flex pr={columnSpacing} w={[1, null, 2 / 12]} column>
          {avatarRender && (
            <AvatarContainer align="center" w={[200, null, '100%']} pb={[200, null, '100%']}>
              <AbsoluteBox>{avatarRender()}</AbsoluteBox>
            </AvatarContainer>
          )}
          {navRender && <Box pt={5}>{navRender()}</Box>}
        </Flex>
        <Box px={columnSpacing} w={[1, null, 8 / 12]}>
          {(name || detailsRender) && (
            <StyledHeader pb={rowSpacing} align="center">
              <Box data-testid="ProfileHeader">
                {name && <Heading level={2}>{name}</Heading>}
                {detailsRender && <TextBlock pt={1}>{detailsRender()}</TextBlock>}
              </Box>
            </StyledHeader>
          )}
          {mainRender && (
            <Box pb={rowSpacing} data-testid="Profile">
              {mainRender()}
            </Box>
          )}
        </Box>
      </Flex>
    );
  }
}

export default ProfileLayout;
