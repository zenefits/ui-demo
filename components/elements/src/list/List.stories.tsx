import React from 'react';

import { Icon, TextBlock } from 'zbase';
import { paddedSizedBox, Example } from 'z-frontend-storybook-config';

import { storiesOf } from '../../.storybook/storyHelpers';
import List, { ListProps } from './List';

const optionList = [
  { id: 1, label: 'Chicken' },
  { id: 2, label: 'Beef' },
  { id: 3, label: 'Tofu' },
  { id: 4, label: 'Fish' },
];

const ListExample: React.FunctionComponent<ListProps & { includeIcons?: boolean }> = ({ includeIcons, ...rest }) => (
  <List {...rest}>
    {optionList.map(option => (
      <List.Item key={option.id}>
        {includeIcons && <Icon iconName="check" mr={2} />}
        {option.label}
      </List.Item>
    ))}
  </List>
);

storiesOf('elements|List', module)
  .addDecorator(paddedSizedBox([1, 700]))
  .add('default', () => (
    <>
      <Example label="unordered">
        <ListExample />
      </Example>
      <Example label="ordered">
        <ListExample ordered />
      </Example>
      <Example label="inline">
        <ListExample inline />
      </Example>
    </>
  ))
  .add('unordered', () => (
    <>
      <Example label="default">
        <ListExample />
      </Example>
      <Example label="with itemStyle">
        <ListExample itemStyle="circle" />
      </Example>
      <Example label="with itemStyle none">
        <ListExample itemStyle="none" />
      </Example>
      <Example label="with icons">
        <ListExample itemStyle="none" includeIcons />
      </Example>
      <Example label="with util props">
        <ListExample bg="grayscale.f" py={5} my={5} mx={5} color="secondary.a" fontStyle="paragraphs.s" />
      </Example>
      <Example label="with inherited fonts">
        <TextBlock fontStyle="paragraphs.xl">
          Some intro text:
          <ListExample />
        </TextBlock>
      </Example>
      <Example label="nested">
        <List>
          <List.Item>
            Option 1
            <List>
              <List.Item>Option 1A</List.Item>
              <List.Item>Option 1B</List.Item>
              <List.Item>Option 1C</List.Item>
            </List>
          </List.Item>
          <List.Item>
            Option 2
            <List ordered>
              <List.Item>Step 1</List.Item>
              <List.Item>Step 2</List.Item>
              <List.Item>Step 3</List.Item>
            </List>
          </List.Item>
          <List.Item>Option 3</List.Item>
        </List>
      </Example>
    </>
  ))
  .add('ordered', () => (
    <>
      <Example label="default">
        <ListExample ordered />
      </Example>
      <Example label="with itemStyle">
        <ListExample ordered itemStyle="lower-roman" />
      </Example>
      <Example label="with itemStyle none">
        <ListExample ordered itemStyle="none" />
      </Example>
      <Example label="with icons">
        <ListExample ordered itemStyle="none" includeIcons />
      </Example>
      <Example label="with util props">
        <ListExample ordered bg="grayscale.f" py={5} my={5} mx={5} color="secondary.a" fontStyle="paragraphs.s" />
      </Example>
      <Example label="with inherited fonts">
        <TextBlock fontStyle="paragraphs.xl">
          Some intro text:
          <ListExample ordered />
        </TextBlock>
      </Example>
      <Example label="with custom start">
        <ListExample ordered start={100} />
      </Example>
      <Example label="reversed">
        <ListExample ordered reversed />
      </Example>
    </>
  ))
  .add('inline', () => (
    <>
      <Example label="default">
        <ListExample inline />
      </Example>
      <Example label="with icons">
        <ListExample inline includeIcons />
      </Example>
      <Example label="with util props">
        <ListExample inline bg="grayscale.f" py={5} my={5} mx={5} color="secondary.a" fontStyle="paragraphs.s" />
      </Example>
      <Example label="with inherited fonts">
        <TextBlock fontStyle="paragraphs.xl">
          Some intro text:
          <ListExample inline />
          And more text
        </TextBlock>
      </Example>
    </>
  ));
