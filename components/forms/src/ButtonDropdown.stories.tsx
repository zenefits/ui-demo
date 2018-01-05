import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Box } from 'rebass';
import { HashRouter as Router } from 'react-router-dom';

import Icon from 'z-frontend-theme/src/Icon';
import ButtonGroup from './ButtonGroup';
import Button from './Button';
import ButtonDropdown, { ButtonDropdownItemLink } from './ButtonDropdown';
// import Button from './Button';

storiesOf('Button Dropdown', module).add('default', () => (
  <Router>
    <Box p={2}>
      <h1>Button Dropdown</h1>

      <ButtonDropdown
        fontSize={1}
        mr={1}
        buttonBody={
          <Box>
            <Icon color="red" fontSize={1} iconName="menu" mr={2} /> Click me!
          </Box>
        }
      >
        <ButtonDropdown.ItemButton onClick={action('item clicked')}>
          <Icon color="" fontSize={1} iconName="github" mr={2} /> Button item
        </ButtonDropdown.ItemButton>
        <ButtonDropdownItemLink href="https://google.com" target="_blank">
          <Icon color="" fontSize={1} iconName="google" mr={2} /> Link to external page
        </ButtonDropdownItemLink>
        <ButtonDropdown.ItemRouteLink to="/sdfsd">
          <Icon color="" fontSize={1} iconName="instagram" mr={2} /> Router Link
        </ButtonDropdown.ItemRouteLink>
        <ButtonDropdown.ItemButton onClick={action('item clicked')}>
          <Icon color="" fontSize={1} iconName="github" mr={2} /> Button item
        </ButtonDropdown.ItemButton>
        <ButtonDropdownItemLink href="https://google.com" target="_blank">
          <Icon color="" fontSize={1} iconName="google" mr={2} /> Link to external page
        </ButtonDropdownItemLink>
        <ButtonDropdown.ItemRouteLink to="/sdfsd">
          <Icon color="" fontSize={1} iconName="instagram" mr={2} /> Router Link
        </ButtonDropdown.ItemRouteLink>
      </ButtonDropdown>

      <ButtonGroup mr={3}>
        <Button fontSize={1} onClick={action('main action')}>
          Main Action
        </Button>
        <ButtonDropdown fontSize={1} mode="primary">
          <ButtonDropdown.ItemButton onClick={action('item clicked')}>Run Review</ButtonDropdown.ItemButton>
          <ButtonDropdown.ItemButton onClick={action('delete clicked')}>Delete Results</ButtonDropdown.ItemButton>
          <ButtonDropdown.ItemButton onClick={action('duplicate clicked')}>Duplicate Review</ButtonDropdown.ItemButton>
        </ButtonDropdown>
      </ButtonGroup>

      <ButtonDropdown fontSize={1} mode="transparent" mr={3} buttonBody="Or click me!">
        <ButtonDropdown.ItemButton onClick={action('item clicked')}>
          Run Review
          <Box color="grayscale.c" fontSize={0}>
            lorem ipsum dolor
          </Box>
        </ButtonDropdown.ItemButton>
        <ButtonDropdown.ItemButton onClick={action('delete clicked')}>
          Delete Results
          <Box color="grayscale.c" fontSize={0}>
            only if they are
          </Box>
        </ButtonDropdown.ItemButton>
        <ButtonDropdown.ItemButton onClick={action('duplicate clicked')}>
          Duplicate Review
          <Box color="grayscale.c" fontSize={0}>
            but what if not
          </Box>
        </ButtonDropdown.ItemButton>
      </ButtonDropdown>
    </Box>
  </Router>
));
