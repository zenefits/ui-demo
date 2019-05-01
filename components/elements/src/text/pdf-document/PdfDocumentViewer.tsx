import React, { Component } from 'react';

import { Box, BoxProps, Flex } from 'zbase';
import { styled } from 'z-frontend-theme';

import Link from '../../action/link/Link';
import LoadingSpinner from '../../overlay/loading-spinner/LoadingSpinner';
import { hasAdobeReader, isBrowserIe } from '../../utils/detectionUtils';

const StyledContainer = styled(Box)`
  overflow-y: auto;
`;

export type PdfDocumentViewerProps = {
  /**
   * The link to the PDF you want to view
   */
  pdf: string;
  /**
   * Set to true when html content is loading
   */
  isLoading?: boolean;
  /**
   * The fallback that will appear if there is no pdf viewer
   */
  fallback?: React.ReactNode | string;
} & BoxProps;

class PdfDocumentViewer extends Component<PdfDocumentViewerProps> {
  getFallback = () => {
    const { fallback, pdf } = this.props;
    if (fallback) return fallback;
    return (
      <Flex justify="center" align="center">
        <Link href={pdf}>Click to download</Link>
      </Flex>
    );
  };

  render() {
    const { isLoading, pdf, fallback, ...containerProps } = this.props;
    const noPdfFallback = this.getFallback();
    if (isBrowserIe() && !hasAdobeReader()) {
      return <Box {...containerProps}>{noPdfFallback}</Box>;
    }

    return (
      <StyledContainer {...containerProps}>
        {isLoading ? (
          <Flex p={3} justify="center" align="center" height="100%">
            <LoadingSpinner s="small" />
          </Flex>
        ) : (
          <Flex height="100%">
            <object data={pdf} type="application/pdf" width="100%" height="100%">
              {noPdfFallback}
            </object>
          </Flex>
        )}
      </StyledContainer>
    );
  }
}

export default PdfDocumentViewer;
