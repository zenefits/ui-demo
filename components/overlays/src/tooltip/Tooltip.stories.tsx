import React from 'react';

import { Box, TextBlock } from 'zbase';
import { paddedBox, Example } from 'z-frontend-storybook-config';
import { styled } from 'z-frontend-theme';
import { depth, zIndex } from 'z-frontend-theme/utils';
import { IconButton } from 'z-frontend-elements';

import Tooltip from './Tooltip';
import { storiesOf } from '../../.storybook/storyHelpers';

const FixedContainer = styled(Box)`
  position: fixed;
  height: 48px;
  left: 0;
  right: 0;
  z-index: ${zIndex('fixed')};
  box-shadow: ${depth(2)};
`;

storiesOf('overlays|Tooltip', module)
  .addDecorator(paddedBox)
  .add('default', () => (
    <Tooltip event="hover" placement="top" targetBody={<IconButton iconName="delete" />}>
      <TextBlock p={10}>Delete this pay run.</TextBlock>
    </Tooltip>
  ))
  .add('states', () => (
    <>
      <Example label="visible by default (visual testing)">
        <Tooltip event="hover" showPopover targetBody={<IconButton iconName="delete" />}>
          <TextBlock p={10}>Delete this pay run.</TextBlock>
        </Tooltip>
      </Example>
      <Example label="renders over other positioned elements">
        <FixedContainer p={1} bg="grayscale.f">
          <TextBlock>Fixed content</TextBlock>
        </FixedContainer>
        <Box pt={75}>
          <Tooltip event="hover" showPopover placement="top" targetBody={<IconButton iconName="delete" />}>
            <TextBlock p={10}>Delete this pay run.</TextBlock>
          </Tooltip>
        </Box>
      </Example>
      <Example label="wraps long text">
        <Tooltip event="hover" placement="bottom" showPopover targetBody={<IconButton iconName="delete" />}>
          <TextBlock p={10}>
            Zenefits Payroll only accepts business checking accounts. We need a clear picture of a voided check to
            confirm that your account is a business checking account, not a personal one. The bank statement or voided
            check has to include: the full account number, the company’s name, the company’s address.
          </TextBlock>
        </Tooltip>
      </Example>
    </>
  ));
