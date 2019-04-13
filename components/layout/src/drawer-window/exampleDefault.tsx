import React from 'react';

import { Flex } from 'zbase';
import { Button } from 'z-frontend-elements';

import DrawerWindow from './DrawerWindow';

export default () => (
  <Flex w={1}>
    <DrawerWindow
      m={3}
      openStatusDefaults={{
        left: true,
        right: true,
      }}
      flex="1 1"
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
