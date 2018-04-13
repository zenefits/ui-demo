import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { HashRouter as Router } from 'react-router-dom';

import { Box, Flex, Icon } from 'zbase';

import Avatar from './Avatar';
import ButtonGroup from './ButtonGroup';
import Button from './Button';
import ButtonDropdown, { ButtonDropdownItemLink } from './ButtonDropdown';
// import Button from './Button';

storiesOf('Button Dropdown', module)
  .addDecorator(getStory => <Router>{getStory()}</Router>)
  .add('custom target', () => (
    <ButtonDropdown
      fontSize__deprecated__doNotUse={1}
      target={
        <Button>
          <Icon color="primary.a" s="small" iconName="menu" mr={2} /> Click me!
        </Button>
      }
    >
      <ButtonDropdown.ItemButton onClick={action('item clicked')}>
        <Icon iconName="github" mr={2} /> Button item
      </ButtonDropdown.ItemButton>
      <ButtonDropdownItemLink href="https://google.com" target="_blank">
        <Icon iconName="google" mr={2} /> Link to external page
      </ButtonDropdownItemLink>
      <ButtonDropdown.ItemRouteLink to="/sdfsd">
        <Icon iconName="instagram" mr={2} /> Router Link
      </ButtonDropdown.ItemRouteLink>
      <ButtonDropdown.ItemButton onClick={action('item clicked')}>
        <Icon iconName="github" mr={2} /> Button item
      </ButtonDropdown.ItemButton>
      <ButtonDropdownItemLink href="https://google.com" target="_blank">
        <Icon iconName="google" mr={2} /> Link to external page
      </ButtonDropdownItemLink>
      <ButtonDropdown.ItemRouteLink to="/sdfsd">
        <Icon iconName="instagram" mr={2} /> Router Link
      </ButtonDropdown.ItemRouteLink>
    </ButtonDropdown>
  ))
  .add('non-button target', () => (
    <ButtonDropdown
      fontSize__deprecated__doNotUse={1}
      target={
        <Flex align="center" style={{ cursor: 'pointer' }}>
          <Avatar
            firstName="First"
            lastName="Last"
            photoUrl="http://cdn3-www.dogtime.com/assets/uploads/gallery/30-impossibly-cute-puppies/impossibly-cute-puppy-30.jpg"
            s="small"
          />
          <Icon iconName="chevron-down" ml={2} />
        </Flex>
      }
    >
      <ButtonDropdown.ItemButton onClick={action('item clicked')}>
        <Icon iconName="github" mr={2} /> Button item
      </ButtonDropdown.ItemButton>
      <ButtonDropdownItemLink href="https://google.com" target="_blank">
        <Icon iconName="google" mr={2} /> Link to external page
      </ButtonDropdownItemLink>
      <ButtonDropdown.ItemRouteLink to="/sdfsd">
        <Icon iconName="instagram" mr={2} /> Router Link
      </ButtonDropdown.ItemRouteLink>
    </ButtonDropdown>
  ))
  .add('default', () => (
    <Box p={2}>
      <h1>Button Dropdown</h1>

      <ButtonGroup mr={3}>
        <Button fontSize__deprecated__doNotUse={1} onClick={action('main action')}>
          Main Action
        </Button>
        <ButtonDropdown fontSize__deprecated__doNotUse={1} mode="primary">
          <ButtonDropdown.ItemButton onClick={action('item clicked')}>Run Review</ButtonDropdown.ItemButton>
          <ButtonDropdown.ItemButton onClick={action('delete clicked')}>Delete Results</ButtonDropdown.ItemButton>
          <ButtonDropdown.ItemButton onClick={action('duplicate clicked')}>Duplicate Review</ButtonDropdown.ItemButton>
        </ButtonDropdown>
      </ButtonGroup>

      <ButtonDropdown
        fontSize__deprecated__doNotUse={1}
        mode="transparent"
        mr={3}
        target={<Button>Or click me!</Button>}
      >
        <ButtonDropdown.ItemButton onClick={action('item clicked')}>
          Run Review
          <Box color="grayscale.c" fontSize__deprecated__doNotUse={0}>
            lorem ipsum dolor
          </Box>
        </ButtonDropdown.ItemButton>
        <ButtonDropdown.ItemButton onClick={action('delete clicked')}>
          Delete Results
          <Box color="grayscale.c" fontSize__deprecated__doNotUse={0}>
            only if they are
          </Box>
        </ButtonDropdown.ItemButton>
        <ButtonDropdown.ItemButton onClick={action('duplicate clicked')}>
          Duplicate Review
          <Box color="grayscale.c" fontSize__deprecated__doNotUse={0}>
            but what if not
          </Box>
        </ButtonDropdown.ItemButton>
      </ButtonDropdown>
    </Box>
  ));
