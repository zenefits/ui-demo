import gql from 'graphql-tag';
import React, { Component } from 'react';

import { Box, Flex, Icon, Image } from 'zbase';
import { Button, Link } from 'z-frontend-elements';
import { styled, IconNameString } from 'z-frontend-theme';
import { Query } from 'z-frontend-network';

import { DropdownQuery } from '../../gqlTypes';
import { UserInfoBusinessCase } from '../types';

type CollapsibleSectionState = {
  tours: DropdownQuery.Tours[];
};

declare global {
  interface Window {
    walkme_ready: any;
  }
}
const DarkBlueBox = styled(Box)`
  /* stylelint-disable-next-line color-no-hex */
  background-color: #0f2b5b;
`;

const StyledCollapsibleDropdownSection = styled(Box)`
  &.open-demo-dropdown-section {
    min-height: 50px;
    transition: all 0.3s ease-in-out;
  }

  &.close-demo-dropdown-section {
    height: 0;
    overflow: hidden;
    opacity: 0;
    transition: all 0.3s ease-in-out;
  }
`;

const StyledDropDownIcon = styled(Icon)`
  text-align: center;
`;

const IconImage = styled(Image)`
  max-height: 100%;
`;

const startTour = (tourNumber: number) => {
  if (window.WalkMeAPI) {
    window.WalkMeAPI.startFlowById(tourNumber);
  } else {
    window.walkme_ready = () => {
      window.WalkMeAPI.startFlowById(tourNumber);
    };
  }
};

const activateShoutOut = (tourNumber: number) => {
  if (window.WalkMeAPI) {
    window.WalkMeAPI.activateDeployable(14, tourNumber);
  } else {
    window.walkme_ready = () => {
      window.WalkMeAPI.activateDeployable(14, tourNumber);
    };
  }
};

function triggerWalkme(fn: any, tourLink: string) {
  const tourNumber = parseInt(tourLink.split('-')[1], 10);

  if (window.location.pathname === '/dashboard/') {
    const onDashboard = window.location.href.endsWith('/dashboard/') || window.location.href.endsWith('/dashboard/#/');

    const escKeyEvent = new KeyboardEvent('keydown', {
      keyCode: 27,
      bubbles: false,
    } as any);

    // Trigger ESC key to close the dropdown
    document.dispatchEvent(escKeyEvent);
    window.location.href = '/dashboard/#/';
    if (!onDashboard) {
      location.reload();
    }
    fn(tourNumber);
  } else {
    const walkme_tour_prefix = '/dashboard/?walkme=';
    window.location.href = walkme_tour_prefix + tourLink;
  }
}

type CollapsibleSectionProps = {
  tours: DropdownQuery.Tours[];
};

class CollapsibleSection extends Component<CollapsibleSectionProps, CollapsibleSectionState> {
  constructor(props: any) {
    super(props);
    const { tours } = this.props;
    this.state = {
      tours,
    };
  }

  handleToggle = (tourName: string) => {
    const { tours } = this.state;
    const currTourIndex = tours.findIndex((tour: DropdownQuery.Tours) => tour.name === tourName);

    const newDataTours = tours.map(tour => ({ ...tour }));
    newDataTours.map((newDataTour: DropdownQuery.Tours, index: number) => {
      if (newDataTour.isOpened && index !== currTourIndex) {
        newDataTour.isOpened = false;
      }
    });
    newDataTours[currTourIndex].isOpened = !newDataTours[currTourIndex].isOpened;
    this.setState({ tours: newDataTours });
  };

  render() {
    const { tours } = this.state;
    return (
      <DarkBlueBox>
        {tours.map((tour: DropdownQuery.Tours) => (
          <Box pt={3} px={4} color="grayscale.g" key={tour.name} onClick={() => this.handleToggle(tour.name)}>
            <Flex align="center">
              <StyledDropDownIcon
                iconName={tour.iconName as IconNameString}
                mr={3}
                s="large"
                w={20}
                text-align="center"
              />
              <Link fontStyle="paragraphs.m" color="grayscale.g">
                {tour.name}
              </Link>
            </Flex>

            <StyledCollapsibleDropdownSection
              className={tour.isOpened ? 'open-demo-dropdown-section' : 'close-demo-dropdown-section'}
              pb={0}
              pt={3}
            >
              {tour.tourItems.map(item => (
                <Link key={item.tourName} onClick={e => triggerWalkme(startTour, item.tourId)}>
                  <Flex py={3} px={4} pl={5} align="center" color="grayscale.g">
                    <Box fontStyle="paragraphs.s" color="grayscale.g">
                      {item.tourName}
                    </Box>
                  </Flex>
                </Link>
              ))}
            </StyledCollapsibleDropdownSection>
          </Box>
        ))}
      </DarkBlueBox>
    );
  }
}

type DemoCenterDropdownProps = {
  userInfo: UserInfoBusinessCase;
};

class DemoCenterDropdown extends Component<DemoCenterDropdownProps> {
  render() {
    const { firstName, lastName, userEmail, companyName } = this.props.userInfo;
    const businessCaseUrl = `https://zenefits.com/business-case/questionnaire/?person_firstname=${firstName}&person_lastname=${lastName}&email=${userEmail}&company_name=${companyName}`;
    const competitorComparisonUrl = 'https://zenefits.com/compare-zenefits/';
    const pricingUrl = 'https://www.zenefits.com/pricing/';

    return (
      <Query<DropdownQuery.Query> query={dropdownQuery} handleLoading={false} handleError={false}>
        {({ data, loading, error }) => {
          if (error || loading) {
            return null;
          }
          return (
            <Flex color="grayscale.g" fontStyle="paragraphs.m" w="270px" bg="secondary.a" column>
              <Link href="/app/demo-center/#/overview">
                <Flex py={3} px={4} mt={3} align="center" color="grayscale.g">
                  <Icon iconName="home" mr={3} s="large" />
                  <Box>Demo Center Home</Box>
                </Flex>
              </Link>

              <DarkBlueBox>
                <Link onClick={e => triggerWalkme(activateShoutOut, '14-146664')}>
                  <Flex py={3} px={4} color="grayscale.g">
                    <Flex w={20} height={24} justify="center" mr={3}>
                      <IconImage src="/static/img/growth/zenefits-dropdown-logo.svg" alt="" />
                    </Flex>
                    <Box>Zenefits Overview</Box>
                  </Flex>
                </Link>
              </DarkBlueBox>

              {data.demoCenterDropdownOptions.tours && (
                <CollapsibleSection tours={data.demoCenterDropdownOptions.tours} />
              )}

              <Link href={competitorComparisonUrl} target="_blank">
                <Flex py={3} px={4} align="center" color="grayscale.g">
                  <Flex w={20} height={24} justify="center" align="center" mr={3}>
                    <IconImage src="/static/img/growth/compare_us.png" alt="" />
                  </Flex>
                  <Box>Compare Us</Box>
                </Flex>
              </Link>

              <Link href={businessCaseUrl} target="_blank">
                <Flex py={3} px={4} align="center" color="grayscale.g">
                  <Flex w={20} height={24} justify="center" mr={3}>
                    <StyledDropDownIcon iconName="plus-circle-o" s="large" w={20} text-align="center" />
                  </Flex>
                  <Box>Create Business Case</Box>
                </Flex>
              </Link>

              <Link href={pricingUrl} target="_blank">
                <Flex py={3} px={4} align="center" color="grayscale.g">
                  <Flex w={20} height={21} justify="center" align="center" mr={3}>
                    <IconImage src="/static/img/growth/pricing.png" alt="" />
                  </Flex>
                  <Box>Pricing</Box>
                </Flex>
              </Link>

              <Flex mb={3} mt={2} mx={4} align="center" justify="center" height="60px">
                <Button.Link href="/dashboard" height="40" w="100%" mode="primary">
                  Explore the Platform
                </Button.Link>
              </Flex>
            </Flex>
          );
        }}
      </Query>
    );
  }
}

const dropdownQuery = gql`
  query DropdownQuery {
    demoCenterDropdownOptions {
      tours {
        name
        isOpened
        iconName
        tourItems {
          tourName
          tourId
        }
      }
    }
  }
`;

export default DemoCenterDropdown;
