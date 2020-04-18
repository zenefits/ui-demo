import React from 'react';

import { mount } from 'z-frontend-theme/test-utils/cypress';

import List, { ListProps } from '../../src/list/List';

const optionList = [
  { id: 1, label: 'Chicken' },
  { id: 2, label: 'Beef' },
  { id: 3, label: 'Tofu' },
  { id: 4, label: 'Fish' },
];

const ListExample: React.FunctionComponent<ListProps> = props => (
  <List {...props}>
    {optionList.map(option => (
      <List.Item key={option.id}>{option.label}</List.Item>
    ))}
  </List>
);

const commonAsserts = () => {
  cy.findAllByTestId('ListItems')
    .should('have.length', 4)
    .and('contain.text', 'Chicken')
    .and('contain.text', 'Beef')
    .and('contain.text', 'Tofu');
};

describe('List', () => {
  it('renders ordered list (defaults to style decimal)', () => {
    mount(<ListExample ordered />);
    cy.findByTestId('OrderedList').should('have.css', 'list-style-type', 'decimal');
    commonAsserts();
  });

  it('renders ordered list with no style', () => {
    mount(<ListExample ordered itemStyle="none" />);
    cy.findByTestId('OrderedList').should('have.css', 'list-style-type', 'none');
    commonAsserts();
  });

  it('renders unordered list (defaults to style disc)', () => {
    mount(<ListExample />);
    cy.findByTestId('UnorderedList').should('have.css', 'list-style-type', 'disc');
    commonAsserts();
  });

  it('renders unordered list with no style ', () => {
    mount(<ListExample itemStyle="circle" />);
    cy.findByTestId('UnorderedList').should('have.css', 'list-style-type', 'circle');
    commonAsserts();
  });
});
