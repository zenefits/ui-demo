import React, { Component } from 'react';

import { Box, BoxProps, Flex, NumberText, TextBlock } from 'zbase';

export type PricingInfoType = {
  name: string;
  description: string;
  price?: number;
  perString?: string;
  note?: string;
};

type Props = {
  info: PricingInfoType;
} & BoxProps;

export default class PricingInfo extends Component<Props> {
  render() {
    const { info, ...containerProps } = this.props;
    return (
      <Flex column pl={[2, 2, 2, 4]} {...containerProps}>
        <Box>
          <Box mt={[1, 1, 1, 2]} minHeight={['0', '160px', '160px', '200px']}>
            <TextBlock fontStyle={['paragraphs.xl', 'paragraphs.xl', 'paragraphs.xl', 'paragraphs.xxl']}>
              {info.description}
            </TextBlock>
          </Box>
        </Box>
        <Flex column mt={[3, 4, 4, 5]} w={[5 / 10, 6 / 10, 7 / 10]} mb={4}>
          {info.price ? (
            <>
              <NumberText
                value={info.price}
                style="currency"
                currency="USD"
                fontStyle="headings.xl"
                color="secondary.a"
                minimumFractionDigits={0}
              />
              {info.perString && (
                <TextBlock mt={[1, 1, 1, 3]} fontStyle="paragraphs.s" color="secondary.a">
                  {info.perString}
                </TextBlock>
              )}
              {info.note && (
                <TextBlock mt={[1, 1, 1, 3]} fontStyle="paragraphs.s" color="secondary.a">
                  {info.note}
                </TextBlock>
              )}
            </>
          ) : (
            <TextBlock fontStyle="headings.xl" color="secondary.a">
              Free
            </TextBlock>
          )}
        </Flex>
      </Flex>
    );
  }
}
