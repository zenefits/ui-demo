import React, { Component } from 'react';

import { Table } from 'z-frontend-tables';

import { Button } from 'z-frontend-elements';

class ButtonGuide extends Component {
  render() {
    return (
      <Table columnWidths={[1 / 4, 1 / 4, 1 / 4, 1 / 4]} w={1}>
        <Table.Header>
          <div />
          <div>normal</div>
          <div>primary</div>
          <div>transparent</div>
        </Table.Header>
        <Table.Row>
          <div>large</div>
          <Button s="large">Click me</Button>
          <Button s="large" mode="primary">
            Click me
          </Button>
          <Button s="large" mode="transparent">
            Click me
          </Button>
        </Table.Row>
        <Table.Row>
          <div>medium</div>
          <Button s="medium">Click me</Button>
          <Button s="medium" mode="primary">
            Click me
          </Button>
          <Button s="medium" mode="transparent">
            Click me
          </Button>
        </Table.Row>
        <Table.Row>
          <div>small</div>
          <Button s="small">Click me</Button>
          <Button s="small" mode="primary">
            Click me
          </Button>
          <Button s="small" mode="transparent">
            Click me
          </Button>
        </Table.Row>
        <Table.Row>
          <div>xsmall</div>
          <Button s="xsmall">Click me</Button>
          <Button s="xsmall" mode="primary">
            Click me
          </Button>
          <Button s="xsmall" mode="transparent">
            Click me
          </Button>
        </Table.Row>
      </Table>
    );
  }
}

export default ButtonGuide;
