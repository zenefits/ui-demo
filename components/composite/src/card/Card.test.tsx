import React, { ComponentType } from 'react';
import 'jest-styled-components';

import 'z-frontend-jest/modified-jest-styled-components';
import { mountWithTheme, renderWithTheme } from 'z-frontend-theme/test-utils/theme';
import { ButtonDropdown, IconButton } from 'z-frontend-elements';

import Card from './Card';

describe('Card', () => {
  it('should render all components without throwing an error', () => {
    expect.assertions(4);
    const components: ComponentType<any>[] = [Card, Card.Header, Card.Row, Card.Footer];
    components.map(Component => {
      expect(renderWithTheme(<Component>Hi</Component>).text()).toEqual('Hi');
    });
  });

  it('should have padding by default', () => {
    const mounted = mountWithTheme(<Card.Row>Hi</Card.Row>);
    expect(mounted).toHaveStyleRule('padding-top', '24px');
    expect(mounted).toHaveStyleRule('padding-left', '24px');
    expect(mounted).toHaveStyleRule('padding-right', '24px');
    expect(mounted).toHaveStyleRule('padding-bottom', '32px');
  });

  it('should allow customizing padding manually', () => {
    const mounted = mountWithTheme(
      <Card.Row pt={0} px={0}>
        Hi
      </Card.Row>,
    );
    expect(mounted).toHaveStyleRule('padding-top', '0px');
    expect(mounted).toHaveStyleRule('padding-right', '0px');
    expect(mounted).toHaveStyleRule('padding-bottom', '32px');
    expect(mounted).toHaveStyleRule('padding-left', '0px');
  });

  it('should allow customizing padding', () => {
    const mounted = mountWithTheme(<Card.Row padded={false}>Hi</Card.Row>);
    expect(mounted).toHaveStyleRule('padding-top', '0px');
    expect(mounted).toHaveStyleRule('padding-right', '0px');
    expect(mounted).toHaveStyleRule('padding-bottom', '32px');
    expect(mounted).toHaveStyleRule('padding-left', '0px');
  });

  it('should allow customizing border', () => {
    const withBorder = mountWithTheme(<Card>Hi</Card>);
    expect(withBorder).toHaveStyleRule('border-width', '1px');

    const withoutBorder = mountWithTheme(<Card border={false}>Hi</Card>);
    expect(withoutBorder).not.toHaveStyleRule('border-width', /.*/);
  });

  describe('Card.Header', () => {
    it('should not render default util props as attributes', () => {
      const rendered = renderWithTheme(<Card.Header pl={3} mb={2} flex="1" order={2} />);
      const attributeKeys = Object.keys(rendered.get(0).attribs);
      expect(attributeKeys).toHaveLength(1);
      expect(attributeKeys).toContain('class');
    });

    it('should render action button', () => {
      const mounted = mountWithTheme(
        <Card.Header actionRender={() => <IconButton iconName="edit" />}>Title</Card.Header>,
      );
      expect(mounted.find(IconButton)).toHaveLength(1);
      expect(mounted.text()).toContain('Title');
    });

    it('should render action dropdown', () => {
      const mounted = mountWithTheme(
        <Card.Header
          actionRender={() => (
            <ButtonDropdown target={<IconButton iconName="more-vert" />}>
              <ButtonDropdown.ItemButton>Action 1</ButtonDropdown.ItemButton>
              <ButtonDropdown.ItemButton>Action 2</ButtonDropdown.ItemButton>
            </ButtonDropdown>
          )}
        >
          Title
        </Card.Header>,
      );
      expect(mounted.find(IconButton)).toHaveLength(1);
      expect(mounted.find(ButtonDropdown)).toHaveLength(1);
    });
  });
});
