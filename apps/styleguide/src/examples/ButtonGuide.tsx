import React, { Component } from 'react';

import { Table } from 'z-frontend-tables';

import { Button, LinkButton } from 'z-frontend-elements';

class ButtonGuide extends Component {
  render() {
    return (
      <Table columnWidths={[1 / 4, 1 / 4, 1 / 4, 1 / 4]} w={1}>
        <Table.Header>
          <div />
          <div>Button (primary)</div>
          <div>Button (normal)</div>
          <div>LinkButton</div>
        </Table.Header>
        <Table.Row>
          <div>large</div>
          <Button s="large" mode="primary">
            Click me
          </Button>
          <Button s="large">Click me</Button>
          <LinkButton s="large">Click me</LinkButton>
        </Table.Row>
        <Table.Row>
          <div>medium</div>
          <Button s="medium" mode="primary">
            Click me
          </Button>
          <Button s="medium">Click me</Button>
          <LinkButton s="medium">Click me</LinkButton>
        </Table.Row>
        <Table.Row>
          <div>small</div>
          <Button s="small" mode="primary">
            Click me
          </Button>
          <Button s="small">Click me</Button>
          <LinkButton s="small">Click me</LinkButton>
        </Table.Row>
        <Table.Row>
          <div>xsmall</div>
          <Button s="xsmall" mode="primary">
            Click me
          </Button>
          <Button s="xsmall">Click me</Button>
          <LinkButton s="xsmall">Click me</LinkButton>
        </Table.Row>
      </Table>
    );
  }
}

export default ButtonGuide;
