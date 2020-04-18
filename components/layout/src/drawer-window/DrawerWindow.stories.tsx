import React from 'react';
import { HashRouter as Router } from 'react-router-dom';

import { Flex } from 'zbase';
import { Button } from 'z-frontend-elements';

import { storiesOf } from '../../.storybook/storyHelpers';
import DrawerWindow, { DrawerWindowProps } from './DrawerWindow';

storiesOf('layout|DrawerWindow', module)
  .addDecorator((getStory: Function) => (
    <Flex p={20} w={1}>
      <Router>{getStory()}</Router>
    </Flex>
  ))
  .add('default', () => <Example />)
  .add('drawer-first layout', () => <Example layout="drawerFirst" />);

const Example = (props?: Partial<DrawerWindowProps>) => (
  <Flex w={1}>
    <DrawerWindow
      m={3}
      openStatusDefaults={{
        left: true,
        right: true,
      }}
      flex="1 1"
      {...props}
    >
      {props => (
        <>
          <DrawerWindow.Header>
            <Flex justify="space-between">
              <Button onClick={props.left.toggle}>Toggle left drawer</Button>
              <Button onClick={props.right.toggle}>Toggle right drawer</Button>
            </Flex>
          </DrawerWindow.Header>

          <DrawerWindow.LeftDrawer label="Left Drawer" includeHeader>
            <DrawerWindow.DrawerRow>
              <Button>Button 1</Button>
            </DrawerWindow.DrawerRow>
          </DrawerWindow.LeftDrawer>

          <DrawerWindow.MainContent p={2} height="400px">
            Main Content
          </DrawerWindow.MainContent>

          <DrawerWindow.RightDrawer label="Right Drawer" includeHeader>
            <DrawerWindow.DrawerRow>
              <Button>Button 2</Button>
            </DrawerWindow.DrawerRow>
          </DrawerWindow.RightDrawer>
        </>
      )}
    </DrawerWindow>
  </Flex>
);
