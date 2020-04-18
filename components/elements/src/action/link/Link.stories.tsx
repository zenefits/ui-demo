import React from 'react';

import { Box, Flex, Icon, TextBlock, TextInline } from 'zbase';
import { Example } from 'z-frontend-storybook-config';

import Link, { LinkProps } from './Link';
import { storiesOf } from '../../../.storybook/storyHelpers';

function LinkBlock(props: LinkProps) {
  return (
    <Box w={300}>
      <Link to="/assessments/123" {...props}>
        <Flex direction="column" align="center" border p={3}>
          <Flex direction="row" align="center">
            <Icon iconName="assignment" color="grayscale.d" fontStyle="paragraphs.xxl" mr={2} />
            <TextInline textTransform="uppercase" fontStyle="paragraphs.s" color="grayscale.e">
              Health &middot; June 7, 2018
            </TextInline>
          </Flex>
          <TextBlock fontStyle="headings.m" mt={3}>
            The Addiction Crisis
          </TextBlock>
        </Flex>
      </Link>
    </Box>
  );
}

storiesOf('elements|Link', module)
  .addDecorator((getStory: Function) => (
    <Box p={4} bg="grayscale.white">
      {getStory()}
    </Box>
  ))
  .add('types', () => (
    <>
      <Example label="href">
        <Link href="https://help.zenefits.com">What is an “effective date” for health insurance coverage?</Link>
      </Example>
      <Example label="route">
        <Link to="/home">Back to home</Link>
      </Example>
      <Example label="external">
        <Link href="https://en.wikipedia.org/wiki/Health_insurance" target="_blank">
          What is health insurance coverage?
        </Link>
      </Example>
      <Example label="phone">
        <Link href="tel:+1-555-555-7111">555-555-5555</Link>
      </Example>
      <Example label="email">
        <Link href="mailto:info@zenefits.com">info@zenefits.com</Link>
      </Example>
    </>
  ))
  .add('states', () => (
    <>
      <Example label="default">
        <Link href="https://help.zenefits.com">What is an “effective date” for health insurance coverage?</Link>
      </Example>
      <Example label="hover">
        <Link className="simulate-hover" href="https://help.zenefits.com">
          What is an “effective date” for health insurance coverage?
        </Link>
      </Example>
      <Example label="active">
        <Link className="simulate-active" href="https://help.zenefits.com">
          What is an “effective date” for health insurance coverage?
        </Link>
      </Example>
      <Example label="inline">
        <TextInline>
          You can always <Link href="./contact">contact us</Link> if you need help.
        </TextInline>
      </Example>
      <Example label="inline - hover">
        <TextInline>
          You can always{' '}
          <Link href="./contact" className="simulate-hover">
            contact us
          </Link>{' '}
          if you need help.
        </TextInline>
      </Example>
      <Example label="block">
        <LinkBlock />
      </Example>
      <Example label="block - hover">
        <LinkBlock className="simulate-hover" />
      </Example>
    </>
  ));
