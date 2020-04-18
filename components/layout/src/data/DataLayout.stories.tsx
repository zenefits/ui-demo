import React from 'react';

import { Box, TextBlock } from 'zbase';
import { IconButton, Link } from 'z-frontend-elements';
import { skipVisualTest } from 'z-frontend-app-bootstrap';

import DataLayout, { DataLayoutProps } from './DataLayout';
import NavBar from '../nav-bar/NavBar';
import { storiesOf } from '../../.storybook/storyHelpers';

storiesOf('layout|DataLayout', module)
  .addDecorator((getStory: Function) => (
    <Box p={20} w={1} bg="grayscale.white">
      {getStory()}
    </Box>
  ))
  .add('default', () => <DefaultExample />)
  .add('nav instead of title', () => <NavExample />)
  .add('actions', () => <ActionsExample />)
  .add('minimal, no border', () => <MinimalExample />)
  .add('panel closed', () => <PanelClosedExample />)
  .add('no add row', () => <PanelClosedExample addRowButton={null} />)
  .add('panel not closable', () => <PanelNotClosableExample />)
  .add('with DataTable', () => <WithDataTable />, skipVisualTest)
  .add('with EditableTable', () => <WithEditableTable />, skipVisualTest)
  .add('Large width main content doesnt squeeze left panel', () => <LargeWidthMainContent />);

const padding = {
  py: 3,
  px: 4,
};

const common = {
  main: <Box {...padding}>Table body</Box>,
  leftPanel: <Box {...padding}>Panel</Box>,
  addRowButton: <IconButton iconName="plus-circle">Add Row</IconButton>,
  pager: 'Pager',
  footer: 'Footer',
};

// this package cannot depend on z-frontend-tables package, so keep examples simple
export const DefaultExample = () => <DataLayout title="Table Title" {...common} />;

export const ActionsExample = () => (
  <DataLayout
    title="Table Title"
    {...common}
    actions={FilterButton => (
      <>
        {/* Guidance: position search first, if present. If many buttons, use ButtonDropdown. */}
        <IconButton iconName="search" aria-label="Search" onClick={() => {}}>
          Search
        </IconButton>
        <IconButton iconName="settings" aria-label="Edit table settings" onClick={() => {}}>
          Settings
        </IconButton>
        {FilterButton}
      </>
    )}
  />
);

const categories = [
  { key: 'required', label: 'Required' },
  { key: 'employment', label: 'Employment' },
  { key: 'taxes', label: 'Taxes' },
  { key: 'banking', label: 'Banking' },
  { key: 'personal', label: 'Personal' },
];

export const NavExample = () => (
  <DataLayout
    nav={
      <NavBar mode="list">
        {categories.map((tab, i) => (
          <NavBar.RouterNavLink
            key={tab.key}
            to={`/edit/${tab.key}`}
            active={i === 0} /* hard-code active for visual testing only */
          >
            {tab.label}
          </NavBar.RouterNavLink>
        ))}
      </NavBar>
    }
    {...common}
  />
);

export const MinimalExample = () => (
  <DataLayout containerProps={{ border: false }} main={<Box {...padding}>Table body</Box>} />
);

export const PanelClosedExample = (props: DataLayoutProps) => (
  <DataLayout
    title="Table Title"
    leftPanelConfig={{
      openByDefault: false,
    }}
    {...common}
    {...props}
  />
);

export const PanelNotClosableExample = () => (
  <DataLayout title="Table Title" leftPanelConfig={{ closable: false }} {...common} />
);

export const LargeWidthMainContent = () => (
  <DataLayout
    title="Table Title"
    {...common}
    main={
      <Box w={2000} {...padding}>
        Table body
      </Box>
    }
  />
);

const WithDataTable = () => (
  <TextBlock>
    See{' '}
    <Link href="http://ui.zenefits.com/app/stories/?selectedKind=tables%7Cwith full layout">story under Tables</Link>.
  </TextBlock>
);

const WithEditableTable = () => (
  <TextBlock>
    See{' '}
    <Link href="http://ui.zenefits.com/app/stories/index.html?selectedKind=tables%7CEditableTable&selectedStory=with%20DataLayout">
      story under EditableTable
    </Link>
    .
  </TextBlock>
);
