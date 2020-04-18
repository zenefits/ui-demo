import React, { Component } from 'react';
// @ts-ignore
import { action } from '@storybook/addon-actions';
import { HashRouter as Router } from 'react-router-dom';

import { Box, Flex, Icon, Image, TextBlock } from 'zbase';
import { images } from 'z-frontend-theme';

import { storiesOf } from '../../../.storybook/storyHelpers';
import { Button, ButtonGroup } from '../../../index';
import ButtonDropdown from './ButtonDropdown';

interface OutsideControlProps {}

interface OutsideControlState {
  dropdownOpen: boolean;
}

class OutsideControl extends Component<OutsideControlProps, OutsideControlState> {
  constructor(props: OutsideControlProps) {
    super(props);
    this.state = {
      dropdownOpen: false,
    };
  }

  toggleDropdown = (open?: boolean) => {
    this.setState(prevState => {
      if (open === prevState.dropdownOpen) {
        return prevState;
      }
      return { dropdownOpen: open === undefined ? !prevState.dropdownOpen : open };
    });
  };

  render() {
    const { dropdownOpen } = this.state;
    return (
      <ButtonDropdown
        closeOnPopperClick={false}
        open={dropdownOpen}
        onTargetClick={() => this.toggleDropdown()}
        onOuterAction={() => this.toggleDropdown(false)}
        onPressEsc={() => this.toggleDropdown(false)}
      >
        <ButtonDropdown.ItemButton onClick={() => this.toggleDropdown()}>Run Review</ButtonDropdown.ItemButton>
        <ButtonDropdown.ItemButton onClick={() => this.toggleDropdown()}>Delete Results</ButtonDropdown.ItemButton>
        <ButtonDropdown.ItemButton onClick={() => this.toggleDropdown()}>Duplicate Review</ButtonDropdown.ItemButton>
      </ButtonDropdown>
    );
  }
}

storiesOf('elements|ButtonDropdown', module)
  .addDecorator((getStory: Function) => (
    <Router>
      <Box p={20} w={[1, 2 / 3]} bg="grayscale.white">
        {getStory()}
      </Box>
    </Router>
  ))
  .add('default', () => (
    <ButtonDropdown>
      <ButtonDropdown.ItemButton onClick={action('item clicked')}>Run Review</ButtonDropdown.ItemButton>
      <ButtonDropdown.ItemButton onClick={action('delete clicked')}>Delete Results</ButtonDropdown.ItemButton>
      <ButtonDropdown.ItemButton onClick={action('duplicate clicked')}>Duplicate Review</ButtonDropdown.ItemButton>
    </ButtonDropdown>
  ))
  .add('custom target', () => (
    <ButtonDropdown
      target={
        <Button>
          <Icon color="primary.a" s="small" iconName="menu" mr={2} />
          Click me!
        </Button>
      }
    >
      <ButtonDropdown.ItemButton onClick={action('item clicked')}>
        <Icon iconName="github" mr={2} />
        Button item
      </ButtonDropdown.ItemButton>
      <ButtonDropdown.ItemLink href="https://google.com" target="_blank">
        <Icon iconName="google" mr={2} />
        Link to external page
      </ButtonDropdown.ItemLink>
      <ButtonDropdown.ItemRouteLink to="/sdfsd">
        <Icon iconName="instagram" mr={2} />
        Router Link
      </ButtonDropdown.ItemRouteLink>
    </ButtonDropdown>
  ))
  .add('non-button target', () => (
    <ButtonDropdown
      target={
        <Flex align="center" style={{ cursor: 'pointer' }}>
          <Image src={images.pug} w={50} alt="Pug" />
          <Icon iconName="chevron-down" ml={2} />
        </Flex>
      }
    >
      <ButtonDropdown.ItemButton onClick={action('item clicked')}>
        <Icon iconName="github" mr={2} /> Button item
      </ButtonDropdown.ItemButton>
      <ButtonDropdown.ItemLink href="https://google.com" target="_blank">
        <Icon iconName="google" mr={2} /> Link to external page
      </ButtonDropdown.ItemLink>
      <ButtonDropdown.ItemRouteLink to="/sdfsd">
        <Icon iconName="instagram" mr={2} /> Router Link
      </ButtonDropdown.ItemRouteLink>
    </ButtonDropdown>
  ))
  .add('inside a button group', () => (
    <Box>
      <ButtonGroup mr={3}>
        <Button onClick={action('main action')}>Main Action</Button>
        <ButtonDropdown mode="primary">
          <ButtonDropdown.ItemButton onClick={action('item clicked')}>Run Review</ButtonDropdown.ItemButton>
          <ButtonDropdown.ItemButton onClick={action('delete clicked')}>Delete Results</ButtonDropdown.ItemButton>
          <ButtonDropdown.ItemButton onClick={action('duplicate clicked')}>Duplicate Review</ButtonDropdown.ItemButton>
        </ButtonDropdown>
      </ButtonGroup>
    </Box>
  ))
  .add('transparent with complex items', () => (
    <ButtonDropdown mode="transparent" target={<Button>View Complex Items</Button>}>
      <ButtonDropdown.ItemButton onClick={action('item clicked')}>
        Run Review
        <TextBlock color="grayscale.c" fontStyle="paragraphs.s">
          lorem ipsum dolor
        </TextBlock>
      </ButtonDropdown.ItemButton>
      <ButtonDropdown.ItemButton onClick={action('delete clicked')}>
        Delete Results
        <TextBlock color="grayscale.c" fontStyle="paragraphs.s">
          only if they are
        </TextBlock>
      </ButtonDropdown.ItemButton>
      <ButtonDropdown.ItemButton onClick={action('duplicate clicked')}>
        Duplicate Review
        <TextBlock color="grayscale.c" fontStyle="paragraphs.s">
          but what if not
        </TextBlock>
      </ButtonDropdown.ItemButton>
    </ButtonDropdown>
  ))
  .add('open by default, autofocus', () => (
    <ButtonDropdown openByDefault>
      <ButtonDropdown.ItemButton onClick={action('item clicked')}>Run Review</ButtonDropdown.ItemButton>
      <ButtonDropdown.ItemButton autoFocus onClick={action('delete clicked')}>
        Delete Results
      </ButtonDropdown.ItemButton>
      <ButtonDropdown.ItemButton onClick={action('duplicate clicked')}>Duplicate Review</ButtonDropdown.ItemButton>
    </ButtonDropdown>
  ))
  .add('not to close popper on click', () => (
    <ButtonDropdown closeOnPopperClick={false}>
      <ButtonDropdown.ItemButton onClick={action('item clicked')}>Run Review</ButtonDropdown.ItemButton>
      <ButtonDropdown.ItemButton onClick={action('delete clicked')}>Delete Results</ButtonDropdown.ItemButton>
      <ButtonDropdown.ItemButton onClick={action('duplicate clicked')}>Duplicate Review</ButtonDropdown.ItemButton>
    </ButtonDropdown>
  ))
  .add('control display of dropdown from outside', () => <OutsideControl />)
  .add('with max height', () => (
    <ButtonDropdown containerProps={{ maxHeight: 150 }}>
      <ButtonDropdown.ItemButton onClick={action('option 1 clicked')}>Option 1</ButtonDropdown.ItemButton>
      <ButtonDropdown.ItemButton onClick={action('option 2 clicked')}>Option 2</ButtonDropdown.ItemButton>
      <ButtonDropdown.ItemButton onClick={action('option 3 clicked')}>Option 3</ButtonDropdown.ItemButton>
      <ButtonDropdown.ItemButton onClick={action('option 4 clicked')}>Option 4</ButtonDropdown.ItemButton>
      <ButtonDropdown.ItemButton onClick={action('option 5 clicked')}>Option 5</ButtonDropdown.ItemButton>
    </ButtonDropdown>
  ));
