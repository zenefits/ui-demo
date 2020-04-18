import React, { Component } from 'react';

import { Box, Flex, Image, TextBlock } from 'zbase';
import { Button, NotificationManager } from 'z-frontend-elements';
import { DialogManager, DialogProps } from 'z-frontend-overlays';
import { styled, Hide, Render } from 'z-frontend-theme';
import { color } from 'z-frontend-theme/utils';

import BillingV2Modal from './BillingV2Modal';

const BrandedShapes = require('./../images/shapes.png');

const ImageWithShadow = styled(Image)`
  box-shadow: 0 2px 3px ${color('grayscale.black', 0.5)};
`;

const BoxWithBackground = styled(Box)`
  background: linear-gradient(180deg, ${color('grayscale.white', 0.0001)} 0%, ${color('grayscale.g')} 100%);
`;

export default class ValuePropositionSection extends Component<{
  productName: string;
  leftLaptopSrc: string;
  appLogoSrc: string;
  title: string;
  isBillingV3: boolean;
  planName?: string;
  rightIPadSrc: string;
  hideAction?: boolean;
}> {
  render() {
    const {
      productName,
      leftLaptopSrc,
      appLogoSrc,
      title,
      isBillingV3,
      planName,
      rightIPadSrc,
      hideAction,
    } = this.props;
    const ProductNameAndTitle = (
      <>
        <Flex justify="center" align="center" pt={[4, 5]}>
          <ImageWithShadow w={40} height={40} src={appLogoSrc} alt={productName} p={1} />
          <TextBlock pl={4} fontStyle="headings.xs" color="link.normal" whiteSpace="nowrap">
            {productName}
          </TextBlock>
        </Flex>
        <TextBlock
          my={[4, 5]}
          px={[0, 0, 0, 4]}
          textAlign="center"
          fontStyle={['headings.xl', 'headings.xl', 'headings.xl', 'headings.xxl']}
          // has to be an array to work around a color-responsiveness bug in TextBlock.
          color={Array(4).fill('secondary.a')}
        >
          {title}
        </TextBlock>
      </>
    );
    return (
      <DialogManager
        render={(dialogProps: DialogProps) => (
          <BoxWithBackground>
            <Render forBreakpoints={[true, true, false, false]}>{ProductNameAndTitle}</Render>
            <Flex
              style={{
                position: 'relative',
              }}
              height="100%"
            >
              <NotificationManager>
                {({ openNotification }) => (
                  <BillingV2Modal {...dialogProps} productName={productName} openNotification={openNotification} />
                )}
              </NotificationManager>
              <Image w={1 / 3} height={['30%', '100%']} src={BrandedShapes} alt="Shapes" />
              <Flex pl={-5} pt={3} height="100%" align="center" justify="center" style={{ position: 'absolute' }}>
                <Image w={30 / 100} src={leftLaptopSrc} alt={`${productName} screenshot on laptop`} />
                <Box w={46 / 100} pr={4} mb={[5, 4, 4, 7]}>
                  <Hide forBreakpoints={[true, true]}>{ProductNameAndTitle}</Hide>
                  {!hideAction && (
                    <>
                      <Flex w={[1, 9 / 10, 7 / 10, 4 / 10]} mx="auto" column pb={3}>
                        {isBillingV3 && (
                          <TextBlock mb={3} textAlign="center" fontStyle="controls.s" color="grayscale.e">
                            Included in the {planName} plan
                          </TextBlock>
                        )}
                        {isBillingV3 ? (
                          <Button.Link mode="primary" href="/accounts/checkout/#company" mx={[0, 4]}>
                            Let's Get Started
                          </Button.Link>
                        ) : (
                          <Button mx={[0, 4]} mode="primary" onClick={dialogProps.open}>
                            Let's Get Started
                          </Button>
                        )}
                      </Flex>
                    </>
                  )}
                </Box>
                <Flex w={24 / 100} align="center">
                  <Image src={rightIPadSrc} alt={`${productName} screenshot on ipad`} />
                </Flex>
              </Flex>
            </Flex>
          </BoxWithBackground>
        )}
      />
    );
  }
}
