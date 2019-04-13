import React from 'react';
import _ from 'lodash';

import { Box } from 'zbase';
import { Form } from 'z-frontend-forms';

import { storiesOf } from '../.storybook/storyHelpers';
import AccessibleGrid from './AccessibleGrid';

storiesOf('tables|AccessibleGrid', module)
  .addDecorator((getStory: Function) => (
    <Box p={20} w={[1, 1 / 2]} bg="grayscale.white">
      {getStory()}
    </Box>
  ))
  .add('default', () => (
    <AccessibleGrid numRows={4} numColumns={4}>
      {({ Row, Cell, Header }) =>
        _.range(4).map(row =>
          row === 0 ? (
            <Row key={row}>
              {_.range(4).map(col => (
                <Header key={col} rowIndex={row} columnIndex={col} type="column" p={2}>
                  Header For Col {col}
                </Header>
              ))}
            </Row>
          ) : (
            <Form<{ checkbox: boolean; textInput: '' }>
              key={row}
              onSubmit={() => {}}
              initialValues={{ checkbox: false, textInput: '' }}
            >
              <Row key={row}>
                {_.range(4).map(col => {
                  if (col === 0) {
                    return (
                      <Header
                        key={col}
                        rowIndex={row}
                        columnIndex={col}
                        type="row"
                        w={100}
                        p={2}
                        // Use describes if a header only describes a subset of the cells in a row or column
                        describes={[1, 2, 3]}
                      >
                        Header For Row {row}
                      </Header>
                    );
                  } else if (col === 1 && row === 1) {
                    return (
                      <Cell
                        key={col}
                        rowIndex={row}
                        colSpan={2}
                        columnIndex={col}
                        contentType="read-only"
                        w={100}
                        p={2}
                      >
                        Some Cell Text
                      </Cell>
                    );
                  } else if (col === 1 && row !== 1) {
                    return (
                      <Cell key={col} rowIndex={row} columnIndex={col} contentType="read-only" w={100} p={2}>
                        Some Cell Text
                      </Cell>
                    );
                  } else if (col === 2 && row !== 1) {
                    return (
                      <Cell key={col} rowIndex={row} columnIndex={col} contentType="editable" w={100} p={2}>
                        <Form.Checkbox name="checkbox" label="Check Me!" />
                      </Cell>
                    );
                  } else if (col === 3) {
                    return (
                      <Cell key={col} rowIndex={row} columnIndex={col} contentType="editable" w={100} p={2}>
                        <Form.TextInput name="input" label="Input" format="raw" />
                      </Cell>
                    );
                  }
                })}
              </Row>
            </Form>
          ),
        )
      }
    </AccessibleGrid>
  ));
