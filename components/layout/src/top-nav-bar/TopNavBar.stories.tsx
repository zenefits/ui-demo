import React from 'react';
// @ts-ignore
import { boolean, text } from '@storybook/addon-knobs';

import { Box } from 'zbase';
import { SearchSelectDeprecated } from 'z-frontend-forms';
import { ButtonDropdown } from 'z-frontend-elements';

import { storiesOf } from '../../.storybook/storyHelpers';
import TopNavBar from './TopNavBar';
import { Drawer } from '../../index';

const dropdownItems = [
  <ButtonDropdown.ItemLink key="settings" href="https://google.com">
    Settings
  </ButtonDropdown.ItemLink>,
];

const optionList = [
  { value: 'Option 1' },
  { value: 'Option 2' },
  { value: 'Option 3' },
  { value: 'Option 4' },
  { value: 'Option 5' },
  { value: 'Option 6' },
];

const hamburgerContent = () => (
  <Drawer.Section title="Section 1">
    <Drawer.Link target="_blank" href="https://google.com">
      Link 1
    </Drawer.Link>
    <Drawer.Link target="_blank" href="https://google.com">
      Link 2
    </Drawer.Link>
    <Drawer.NavLink to="/dashboard/#/employee/pto">Link 4</Drawer.NavLink>
  </Drawer.Section>
);

const getOptions = (query: string) =>
  optionList.filter(option => option.value.toLowerCase().includes(query.toLowerCase()));

const defaultProductTitleDefault = 'Product Title';

storiesOf('layout|TopNavBar', module)
  .addDecorator((getStory: Function) => <Box>{getStory()}</Box>)
  .add('default', () => {
    const productTitleDefault = text('productTitleDefault', defaultProductTitleDefault);
    return <TopNavBar dropdownItems={dropdownItems} productTitleDefault={productTitleDefault} />;
  })
  .add('with children', () => {
    const productTitleDefault = text('productTitleDefault', defaultProductTitleDefault);
    return (
      <TopNavBar dropdownItems={dropdownItems} productTitleDefault={productTitleDefault}>
        <Box ml={2}>
          <SearchSelectDeprecated getOptions={getOptions} async={false} debounce={false} />
        </Box>
      </TopNavBar>
    );
  })
  .add('with hamburger', () => {
    const productTitleDefault = text('productTitleDefault', defaultProductTitleDefault);
    return (
      <TopNavBar
        dropdownItems={dropdownItems}
        productTitleDefault={productTitleDefault}
        renderHamburgerContent={hamburgerContent}
      />
    );
  })
  .add('with inbox', () => {
    const productTitleDefault = text('productTitleDefault', defaultProductTitleDefault);
    const showInbox = boolean('showInbox', true);
    return <TopNavBar dropdownItems={dropdownItems} productTitleDefault={productTitleDefault} showInbox={showInbox} />;
  })
  .add('with hamburger and inbox', () => {
    const productTitleDefault = text('productTitleDefault', defaultProductTitleDefault);
    const showInbox = boolean('showInbox', true);
    return (
      <TopNavBar
        dropdownItems={dropdownItems}
        productTitleDefault={productTitleDefault}
        showInbox={showInbox}
        renderHamburgerContent={hamburgerContent}
      />
    );
  });
