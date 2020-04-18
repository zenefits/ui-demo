import React from 'react';

import { Box } from 'zbase';
import { Avatar, Card } from 'z-frontend-composites';
import { List } from 'z-frontend-elements';

import { storiesOf } from '../../.storybook/storyHelpers';
import { NavBar } from '../../index';
import ProfileLayout from './ProfileLayout';

const employee = {
  id: 123,
  preferredOrFirstName: 'Julian',
  lastName: 'Bashir',
  fullName: 'Julian Bashir',
  title: 'Chief Medical Officer',
  startDate: '2369',
};

const detailsRender = () => (
  <List inline>
    <List.Item>{employee.title}</List.Item>
    <List.Item>Started in {employee.startDate}</List.Item>
  </List>
);

const avatarRender = () => (
  <Avatar firstName={employee.preferredOrFirstName} lastName={employee.lastName} s="xxxlarge" w={1} />
);

const navRender = () => (
  <NavBar mode="side">
    <NavBar.RouterNavLink to={`/employee/${employee.id}/profile/info`} active>
      Personal Info
    </NavBar.RouterNavLink>
    <NavBar.RouterNavLink to={`/employee/${employee.id}/profile/employment`}>Employment</NavBar.RouterNavLink>
    <NavBar.RouterNavLink to={`/employee/${employee.id}/profile/tax`}>Tax Info</NavBar.RouterNavLink>
  </NavBar>
);

const mainRender = () => <Card p={5}>main</Card>;

const complexMainRender = () => (
  <Box>
    <Box pb={3}>
      <Card p={5} mb={3}>
        main1
      </Card>
    </Box>
    <Card p={5}>main2</Card>
  </Box>
);

storiesOf('layout|ProfileLayout', module)
  .addDecorator((getStory: Function) => <Box p={20}>{getStory()}</Box>)
  .add('header and main (minimum)', () => <ProfileLayout name={employee.fullName} mainRender={mainRender} />)
  .add('loading', () => <ProfileLayout isLoading />)
  .add('header, details and main ', () => (
    <ProfileLayout name={employee.fullName} detailsRender={detailsRender} mainRender={mainRender} />
  ))
  .add('header, details, nav and main', () => (
    <ProfileLayout
      name={employee.fullName}
      detailsRender={detailsRender}
      navRender={navRender}
      mainRender={mainRender}
    />
  ))
  .add('header, details, avatar, nav and main', () => (
    <ProfileLayout
      name={employee.fullName}
      detailsRender={detailsRender}
      avatarRender={avatarRender}
      navRender={navRender}
      mainRender={mainRender}
    />
  ))
  .add('header, details, avatar, nav and complex main', () => (
    <ProfileLayout
      name={employee.fullName}
      detailsRender={detailsRender}
      avatarRender={avatarRender}
      navRender={navRender}
      mainRender={complexMainRender}
    />
  ));
