import React, { Component } from 'react';

import { Flex, FlexProps, TextBlock } from 'zbase';
import { Hide } from 'z-frontend-theme';

import PricingPlan, { PricingPlanType } from './PricingPlan';

type Props = { planName: 'Zen' | 'Essentials' | 'Growth'; description: string } & FlexProps;

const essentialFeatures = ['HR Platform', 'Time & Attendance', 'Scheduling', 'Compliance'];
const growthFeatures = ['Compensation Management', 'Performance Management'];
const zenFeatures = ['Well-being'];

const pricingPlans: PricingPlanType[] = [
  {
    name: 'Zen',
    basicFeatures: essentialFeatures.concat(growthFeatures),
    planFeatures: zenFeatures,
    price: 21,
  },
  {
    name: 'Growth',
    basicFeatures: essentialFeatures,
    planFeatures: growthFeatures,
    price: 14,
  },
  {
    name: 'Essentials',
    basicFeatures: essentialFeatures,
    planFeatures: [],
    price: 8,
  },
];

export default class PricingPlanSection extends Component<Props> {
  render() {
    const { planName, description, ...containerProps } = this.props;
    return (
      <Flex align="center" mx={4} column {...containerProps}>
        <TextBlock
          w={[1, 5 / 10, 7 / 10, 5 / 10]}
          px={[5, 0]}
          fontStyle={['headings.xl', 'headings.xl', 'headings.xl', 'headings.xxl']}
          // has to be an array to work around a color-responsiveness bug in TextBlock.
          color={Array(4).fill('primary.a')}
          textAlign="center"
        >
          Included in the {planName} plan
        </TextBlock>
        <TextBlock
          w={[1, 5 / 10, 7 / 10, 5 / 10]}
          px={[3, 0]}
          mt={[3, 3, 3, 5]}
          textAlign="center"
          fontStyle={['paragraphs.l', 'paragraphs.l', 'paragraphs.l', 'paragraphs.xxl']}
        >
          {description}
        </TextBlock>
        <Flex w={[1, 1, 1, 7 / 10]} borderTop borderBottom mt={6} mb="100px" px={[4, 0]} justify="space-between">
          {pricingPlans.map(pricingPlan => {
            const isSelected = pricingPlan.name === planName;
            const PlanColumn = (
              <PricingPlan
                key={pricingPlan.name}
                w={[1, 3 / 10]}
                mt={-3}
                mb="-100px"
                plan={pricingPlan}
                isSelected={isSelected}
              />
            );
            return isSelected ? PlanColumn : <Hide forBreakpoints={[true, false]}>{PlanColumn}</Hide>;
          })}
        </Flex>
      </Flex>
    );
  }
}
