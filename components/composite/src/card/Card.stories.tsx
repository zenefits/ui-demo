import React from 'react';
// @ts-ignore
import { action } from '@storybook/addon-actions';

import { ButtonDropdown, IconButton } from 'z-frontend-elements';
import { paddedBox } from 'z-frontend-storybook-config';
import { Box } from 'zbase';

import { storiesOf } from '../../.storybook/storyHelpers';
import Card from './Card';

const canEdit = false;

const PaddingRevealer = (props: any) => <Box bg="primary.a" color="grayscale.white" {...props} />;

storiesOf('composites|Card', module)
  .addDecorator(paddedBox)
  .add('header, rows, footer', () => (
    <Card>
      <Card.Header>Header</Card.Header>
      <Card.Row>Row 1</Card.Row>
      <Card.Row>Row 2</Card.Row>
      <Card.Footer>Footer</Card.Footer>
    </Card>
  ))
  .add('header with IconButton action', () => (
    <Card>
      <Card.Header
        actionRender={() => (
          <IconButton iconName="edit" onClick={action('card-header-action')} color="grayscale.d" iconSize="medium" />
        )}
      >
        Card Title
      </Card.Header>
      <Card.Row>Row 1</Card.Row>
    </Card>
  ))
  .add('header with dynamic IconButton action', () => (
    <Card>
      <Card.Header
        actionRender={() => canEdit && <IconButton iconName="edit" onClick={action('card-header-action')} />}
      >
        Card Title
      </Card.Header>
      <Card.Row>Row 1</Card.Row>
    </Card>
  ))
  .add('header with ButtonDropdown action', () => (
    <Card>
      <Card.Header
        actionRender={() => (
          <ButtonDropdown
            target={<IconButton iconName="more-vert" iconSize="medium" color="grayscale.d" />}
            popperPlacement="bottom-end"
          >
            <ButtonDropdown.ItemButton onClick={action('item clicked')}>Action 1</ButtonDropdown.ItemButton>
            <ButtonDropdown.ItemButton onClick={action('item clicked')}>Action 2</ButtonDropdown.ItemButton>
          </ButtonDropdown>
        )}
      >
        Card Title
      </Card.Header>
      <Card.Row>Row 1</Card.Row>
    </Card>
  ))
  .add('only rows', () => (
    <Card>
      <Card.Row>Row 1</Card.Row>
      <Card.Row>Row 2</Card.Row>
      <Card.Row>Row 3</Card.Row>
    </Card>
  ))
  .add('unpadded row', () => (
    <Card width={500}>
      <Card.Row>
        <PaddingRevealer>Normal row</PaddingRevealer>
      </Card.Row>
      <Card.Row padded={false}>
        <PaddingRevealer>{`padded={false}`}</PaddingRevealer>
      </Card.Row>
      <Card.Row p={0}>
        <PaddingRevealer>p=0</PaddingRevealer>
      </Card.Row>
      <Card.Row py={0}>
        <PaddingRevealer>py=0</PaddingRevealer>
      </Card.Row>
      <Card.Row pt={0}>
        <PaddingRevealer>pt=0</PaddingRevealer>
      </Card.Row>
      <Card.Row pb={0}>
        <PaddingRevealer>pb=0</PaddingRevealer>
      </Card.Row>
      <Card.Row px={0}>
        <PaddingRevealer>px=0</PaddingRevealer>
      </Card.Row>
      <Card.Row pl={0}>
        <PaddingRevealer>pl=0</PaddingRevealer>
      </Card.Row>
      <Card.Row pr={0}>
        <PaddingRevealer>pr=0</PaddingRevealer>
      </Card.Row>
    </Card>
  ))
  .add('no rows', () => (
    <Card>
      <Card.Header>Header</Card.Header>
      <Card.Footer>Footer</Card.Footer>
    </Card>
  ))
  .add('with util props', () => (
    <Card>
      <Card.Header borderColor="tertiary.a">Header</Card.Header>
      <Card.Row p={6}>Row 1</Card.Row>
      <Card.Row bg="secondary.b">Row 2</Card.Row>
      <Card.Row bg="secondary.a" color="grayscale.white">
        Row 3
      </Card.Row>
      <Card.Footer borderLeft borderColor="primary.a">
        Footer
      </Card.Footer>
    </Card>
  ));
