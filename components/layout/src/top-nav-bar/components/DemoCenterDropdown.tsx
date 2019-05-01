import gql from 'graphql-tag';
import React, { Component } from 'react';

import { Box, Flex, Icon, Image } from 'zbase';
import { Button, Link } from 'z-frontend-elements';
import { styled, IconNameString } from 'z-frontend-theme';

import Query from '../../graphql/Query';
import { DropdownQuery } from '../../gqlTypes';

type CollapsibleSectionState = {
  tours: DropdownQuery.Tours[];
};

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

const ZenefitsIconImage = styled(Image)`
  max-height: 100%;
`;

function goToTour(tourLink: string, e: any) {
  const walkme_tour_prefix = '/dashboard/#/?walkme=';
  window.location.href = walkme_tour_prefix + tourLink;

  if (window.location.pathname === '/dashboard/') {
    window.location.reload();
  }

  e.stopPropagation();
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
    const idx = tours.findIndex((tour: DropdownQuery.Tours) => tour.name === tourName);

    const newDataTours = tours.map(tour => Object.assign({}, tour));
    newDataTours.map((newDataTour: DropdownQuery.Tours) => {
      if (newDataTour.isOpened) {
        newDataTour.isOpened = false;
      }
    });
    newDataTours[idx].isOpened = !newDataTours[idx].isOpened;
    this.setState({ tours: newDataTours });
  };

  render() {
    const { tours } = this.state;
    return (
      <Box>
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
                <Link key={item.tourName} onClick={e => goToTour(item.tourId, e)}>
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
      </Box>
    );
  }
}

class DemoCenterDropdown extends Component<{}> {
  render() {
    return (
      <Query<DropdownQuery.Query> query={dropdownQuery} handleGraphqlProgress={false}>
        {({ data, loading, error }) => {
          if (error || loading) {
            return null;
          }
          return (
            <Flex color="grayscale.g" fontStyle="paragraphs.m" w="270px" bg="secondary.a" column>
              <Link to="/overview">
                <Flex py={3} px={4} mt={3} align="center" color="grayscale.g">
                  <Icon iconName="home" mr={3} s="large" />
                  <Box>Demo Center Home</Box>
                </Flex>
              </Link>

              <Link onClick={e => goToTour('14-146664', e)}>
                <Flex py={3} px={4} align="center" color="grayscale.g">
                  <Flex w={20} height="24px" justify="center" mr={3}>
                    <ZenefitsIconImage src="/static/img/growth/zenefits-dropdown-logo.svg" />
                  </Flex>
                  <Box>Zenefits Overview</Box>
                </Flex>
              </Link>

              {data.demoCenterDropdownOptions.tours && (
                <CollapsibleSection tours={data.demoCenterDropdownOptions.tours} />
              )}

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
