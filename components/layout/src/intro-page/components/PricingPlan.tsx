import React, { Component } from 'react';

import { Box, BoxProps, Flex, FlexProps, TextBlock } from 'zbase';
import { Button } from 'z-frontend-elements';
import { styled, ColorString } from 'z-frontend-theme';
import { color } from 'z-frontend-theme/utils';

export type PricingPlanType = {
  name: string;
  basicFeatures: string[];
  planFeatures: string[];
  price: number;
};

type Props = {
  plan: PricingPlanType;
  isSelected: boolean;
} & BoxProps;

const SelectedFlex = styled(Flex)<FlexProps & { isSelected?: boolean }>`
  background-color: ${props => (props.isSelected ? color('secondary.b', 0.4) : 'inherit')};
`;

export default class PricingPlan extends Component<Props> {
  render() {
    const { plan, isSelected, ...containerProps } = this.props;
    // has to be an array to work around a color-responsiveness bug in TextBlock.
    const primaryColor: ColorString[] = isSelected ? Array(4).fill('secondary.a') : Array(4).fill('text.off');
    const secondaryColor: ColorString[] = isSelected ? Array(4).fill('text.default') : primaryColor;

    return (
      <SelectedFlex column isSelected={isSelected} pl={[2, 2, 2, 4]} {...containerProps}>
        <Box>
          <TextBlock fontStyle={['headings.l', 'headings.l', 'headings.l', 'headings.xl']} color={primaryColor} mt={5}>
            {plan.name}
          </TextBlock>
          <Box mt={[1, 1, 1, 2]} minHeight={['0', '160px', '160px', '200px']}>
            <TextBlock fontStyle={['controls.m', 'controls.m', 'controls.m', 'controls.l']} bold color={secondaryColor}>
              Includes:
            </TextBlock>
            {plan.basicFeatures.map(basicFeature => (
              <TextBlock
                key={basicFeature}
                fontStyle={['paragraphs.m', 'paragraphs.m', 'paragraphs.m', 'paragraphs.l']}
                color={secondaryColor}
              >
                {basicFeature}
              </TextBlock>
            ))}
            {plan.planFeatures.map(planFeature => (
              <TextBlock
                key={planFeature}
                fontStyle={['paragraphs.m', 'paragraphs.m', 'paragraphs.m', 'paragraphs.l']}
                color={primaryColor}
              >
                {planFeature}
              </TextBlock>
            ))}
          </Box>
        </Box>
        <Flex column mt={[3, 4, 4, 5]} w={[5 / 10, 6 / 10, 7 / 10]} mb={4}>
          <TextBlock fontStyle={['headings.xl', 'headings.xl', 'headings.xl', 'headings.xxl']} color={primaryColor}>
            ${plan.price}
          </TextBlock>
          <TextBlock mt={[1, 1, 1, 3]} fontStyle="paragraphs.m" color={secondaryColor}>
            per employee/month
          </TextBlock>
          {isSelected && (
            <Button.Link mode="primary" href="/accounts/checkout/#company" mt={6}>
              Let's Get Started
            </Button.Link>
          )}
        </Flex>
      </SelectedFlex>
    );
  }
}
