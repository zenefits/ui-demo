import React, { Component } from 'react';

import { Flex, TextBlock } from 'zbase';

import PricingInfo, { PricingInfoType } from './PricingInfo';

export default class PricingPlanSection extends Component<{
  pricingInfos: PricingInfoType[];
}> {
  render() {
    const { pricingInfos } = this.props;

    return (
      <Flex align="center" w={7 / 10} px={3} my={6} mx="auto" column>
        <TextBlock
          px={[5, 0]}
          fontStyle={['headings.xl', 'headings.xl', 'headings.xl', 'headings.xxl']}
          // has to be an array to work around a color-responsiveness bug in TextBlock.
          color={Array(4).fill('primary.a')}
          textAlign="center"
        >
          Pricing
        </TextBlock>
        <Flex mt={6} mb="100px" px={[4, 0]} justify="space-between">
          <PricingInfo key={pricingInfos[0].name} w={1 / 2} mt={-3} mb="-100px" borderRight info={pricingInfos[0]} />
          <PricingInfo key={pricingInfos[1].name} w={1 / 2} mt={-3} mb="-100px" info={pricingInfos[1]} />
        </Flex>
      </Flex>
    );
  }
}
