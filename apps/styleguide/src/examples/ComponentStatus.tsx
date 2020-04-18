import React, { Component } from 'react';

import { Box, Flex, Icon, NumberText, TextBlock } from 'zbase';
import { EmptyState, Link, ProgressBar } from 'z-frontend-elements';
import { Table } from 'z-frontend-tables';

// eslint-disable-next-line import/no-unresolved
const componentStatus = require('../../docs/componentStatusObject.json');

let docsCompletedCount = 0;
let testsCompletedCount = 0;
const componentStatusKeysLength = Object.keys(componentStatus).length;

function getOrderedComponentStatusObject() {
  const orderedComponentStatus = {};
  Object.keys(componentStatus)
    .sort()
    .forEach(key => {
      orderedComponentStatus[key] = componentStatus[key];
      if (orderedComponentStatus[key].docs) {
        docsCompletedCount += 1;
      }
      if (orderedComponentStatus[key].tests) {
        testsCompletedCount += 1;
      }
    });
  return orderedComponentStatus;
}

const orderedStatuses = getOrderedComponentStatusObject();

class ComponentStatusProgress extends Component<{ label: string; completed: number; total: number }> {
  render() {
    const { label, completed, total } = this.props;
    if (total === 0) {
      return '';
    }
    return (
      <Flex mb={3} ml={4}>
        <TextBlock w={100} fontStyle="controls.l">
          {label}
        </TextBlock>
        <Box>
          <ProgressBar mx={2} max={total} value={completed} />
        </Box>
        <NumberText value={completed / total} style="percent" />
      </Flex>
    );
  }
}

class ComponentStatusTable extends Component {
  render() {
    if (componentStatusKeysLength === 0) {
      return <EmptyState />;
    }
    return (
      <Box>
        <ComponentStatusProgress label="Documented" completed={docsCompletedCount} total={componentStatusKeysLength} />
        <ComponentStatusProgress
          label="Unit Tested"
          completed={testsCompletedCount}
          total={componentStatusKeysLength}
        />
        <TextBlock ml={4} mb={4} fontStyle="controls.l">
          Total components: {componentStatusKeysLength}
        </TextBlock>
        <Table columnWidths={[2 / 4, 1 / 4, 1 / 4]}>
          <Table.Header>
            <Box>Component</Box>
            <Box>Docs?</Box>
            <Box>Unit Tests?</Box>
          </Table.Header>
          {Object.keys(orderedStatuses).map(val => {
            return (
              <Table.Row key={val} py={2}>
                <Box>
                  <Link href={`#!/${val}`}>{val}</Link>
                </Box>
                <Box>
                  {componentStatus[val].docs ? (
                    <Icon iconName="check-circle" color="affirmation.b" s="large" />
                  ) : (
                    <Icon iconName="close-circle" color="negation.a" s="large" />
                  )}
                </Box>
                <Box>
                  {componentStatus[val].tests ? (
                    <Icon iconName="check-circle" color="affirmation.b" s="large" />
                  ) : (
                    <Icon iconName="close-circle" color="negation.a" s="large" />
                  )}
                </Box>
              </Table.Row>
            );
          })}
        </Table>
      </Box>
    );
  }
}

export default ComponentStatusTable;
