import React from 'react';
// @ts-ignore
import { boolean, text } from '@storybook/addon-knobs';

import { Box, Flex } from 'zbase';
import { Button, Link } from 'z-frontend-elements';

import { storiesOf } from '../../.storybook/storyHelpers';
import PublicTopNavBar from './PublicTopNavBar';

const defaultProductTitleDefault = 'Product Title';

storiesOf('layout|PublicTopNavBar', module)
  .addDecorator((getStory: Function) => <Box>{getStory()}</Box>)
  .add('default', () => {
    const productTitleDefault = text('productTitleDefault', defaultProductTitleDefault);
    return <PublicTopNavBar productTitleDefault={productTitleDefault} />;
  })
  .add('custom right column', () => {
    const productTitleDefault = text('productTitleDefault', defaultProductTitleDefault);
    const rightColumn = (
      <Flex align="center">
        <Link fontStyle="paragraphs.m">Sign Up</Link>
        <Button ml={5} color="grayscale.white" bg="button.primaryNormal" s="medium">
          My Cart (0)
        </Button>
      </Flex>
    );
    return <PublicTopNavBar productTitleDefault={productTitleDefault} rightColumn={rightColumn} />;
  });
