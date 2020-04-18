import React, { Component } from 'react';

import { Box, Flex } from 'zbase';

import { storiesOf } from '../../.storybook/storyHelpers';
import Drawer from './Drawer';

class DrawerWithOpenButton extends Component<{}, { open: boolean }> {
  openDrawer = () => this.setState({ open: true });

  closeDrawer = () => this.setState({ open: false });

  state = {
    open: false,
  };

  render() {
    return (
      <>
        <Drawer.OpenButton onOpen={this.openDrawer} />
        <Drawer show={this.state.open} onClose={this.closeDrawer} title="Dashboard">
          <Drawer.Section title="Section 1">
            <Drawer.Link target="_blank" href="https://google.com" active>
              Link 1 (active)
            </Drawer.Link>
            <Drawer.Link target="_blank" href="https://google.com">
              Link 2
            </Drawer.Link>
            <Drawer.Link target="_blank" href="https://google.com">
              Link 3
            </Drawer.Link>
            <Drawer.Link target="_blank" href="https://google.com">
              Link 4
            </Drawer.Link>
            <Drawer.Link target="_blank" href="https://google.com">
              Link 5
            </Drawer.Link>
            <Drawer.Link target="_blank" href="https://google.com">
              Link 6
            </Drawer.Link>
          </Drawer.Section>
          <Drawer.Section title="Section 2">
            <Drawer.NavLink to="/sdfsd1"> NavLink 1 </Drawer.NavLink>
            <Drawer.NavLink to="/sdfsd2"> NavLink 2 </Drawer.NavLink>
            <Drawer.NavLink to="/sdfsd3"> NavLink 3 </Drawer.NavLink>
            <Drawer.NavLink to="/sdfsd4"> NavLink 4 </Drawer.NavLink>
            <Drawer.NavLink to="/sdfsd5"> NavLink 5 </Drawer.NavLink>
            <Drawer.NavLink to="/sdfsd6"> NavLink 6 </Drawer.NavLink>
          </Drawer.Section>
        </Drawer>
      </>
    );
  }
}

storiesOf('layout|Drawer', module)
  .addDecorator((getStory: Function) => (
    <Flex p={20} w={[1, 1 / 2]}>
      {getStory()}
    </Flex>
  ))
  .add('default', () => (
    <Box>
      <Drawer show onClose={() => ({})} title="Dashboard">
        <Drawer.Section title="Section 1">
          <Drawer.Link target="_blank" href="https://google.com" active>
            Link 1 (active)
          </Drawer.Link>
          <Drawer.Link target="_blank" href="https://google.com">
            Link 2
          </Drawer.Link>
          <Drawer.Link target="_blank" href="https://google.com">
            Link 3
          </Drawer.Link>
          <Drawer.Link target="_blank" href="https://google.com">
            Link 4
          </Drawer.Link>
          <Drawer.Link target="_blank" href="https://google.com">
            Link 5
          </Drawer.Link>
          <Drawer.Link target="_blank" href="https://google.com">
            Link 6
          </Drawer.Link>
        </Drawer.Section>
        <Drawer.Section title="Section 2">
          <Drawer.NavLink to="/sdfsd1"> NavLink 1 </Drawer.NavLink>
          <Drawer.NavLink to="/sdfsd2"> NavLink 2 </Drawer.NavLink>
          <Drawer.NavLink to="/sdfsd3"> NavLink 3 </Drawer.NavLink>
          <Drawer.NavLink to="/sdfsd4"> NavLink 4 </Drawer.NavLink>
          <Drawer.NavLink to="/sdfsd5"> NavLink 5 </Drawer.NavLink>
          <Drawer.NavLink to="/sdfsd6"> NavLink 6 </Drawer.NavLink>
        </Drawer.Section>
      </Drawer>
    </Box>
  ))
  .add('with open buttun', () => <DrawerWithOpenButton />);
