import React from 'react';
// @ts-ignore
import { action } from '@storybook/addon-actions';

import { Box, Flex } from 'zbase';
import { styled } from 'z-frontend-theme';
import { skipVisualTest } from 'z-frontend-app-bootstrap';

import { storiesOf } from '../../../.storybook/storyHelpers';
import { Button, IconButton } from '../../../index';

const AlignedTable = styled.table`
  tr {
    vertical-align: top;
  }

  td {
    padding: 4px;
  }
`;

storiesOf('elements|IconButton', module)
  .addDecorator((getStory: Function) => (
    <Box p={20} w={[1, 2 / 3]} bg="grayscale.white">
      {getStory()}
    </Box>
  ))
  .add('default', () => <IconButton iconName="edit" />)
  .add('focus state', () => <IconButton iconName="edit" autoFocus />)
  .add('disabled state', () => <IconButton iconName="edit" disabled />)
  .add('inProgress', () => <IconButton iconName="edit" inProgress />)
  .add('with label', () => <IconButton iconName="edit">Edit</IconButton>)
  .add('util props', () => (
    <IconButton iconName="edit" m={4} height={200} width={200} color="primary.a" fontStyle="headings.xl" />
  ))
  .add('actions', () => <IconButton iconName="edit" onClick={action('iconbutton-click')} />, skipVisualTest)
  .add('sizes (focus state)', () => (
    // using simulate-focus to capture the boundaries for visual regression
    <AlignedTable>
      <tbody>
        <tr>
          <td>
            <IconButton iconName="edit" s="xsmall" mr={2} className="simulate-focus" />
          </td>
          <td>
            <IconButton iconName="edit" s="small" mr={2} className="simulate-focus" />
          </td>
          <td>
            <IconButton iconName="edit" s="medium" mr={2} className="simulate-focus" />
          </td>
          <td>
            <IconButton iconName="edit" s="large" className="simulate-focus" />
          </td>
        </tr>
        <tr>
          <td>
            <IconButton iconName="edit" s="xsmall" mr={2} className="simulate-focus">
              Edit
            </IconButton>
          </td>
          <td>
            <IconButton iconName="edit" s="small" mr={2} className="simulate-focus">
              Edit
            </IconButton>
          </td>
          <td>
            <IconButton iconName="edit" s="medium" mr={2} className="simulate-focus">
              Edit
            </IconButton>
          </td>
          <td>
            <IconButton iconName="edit" s="large" className="simulate-focus">
              Edit
            </IconButton>
          </td>
        </tr>
        <tr>
          <td>
            <Button mode="transparent" s="xsmall" mr={2} className="simulate-focus">
              Edit
            </Button>
          </td>
          <td>
            <Button mode="transparent" s="small" mr={2} className="simulate-focus">
              Edit
            </Button>
          </td>
          <td>
            <Button mode="transparent" s="medium" mr={2} className="simulate-focus">
              Edit
            </Button>
          </td>
          <td>
            <Button mode="transparent" s="large" className="simulate-focus">
              Edit
            </Button>
          </td>
        </tr>
      </tbody>
    </AlignedTable>
  ))
  .add('sizes (narrow icon)', () => (
    <Box>
      <Flex direction="column" align="flex-start" height={200} justify="space-between">
        <IconButton s="large" iconName="more-vert" bg="secondary.b" />
        <IconButton s="medium" iconName="more-vert" bg="secondary.b" />
        <IconButton s="small" iconName="more-vert" bg="secondary.b" />
        <IconButton s="xsmall" iconName="more-vert" bg="secondary.b" />
      </Flex>
    </Box>
  ));
