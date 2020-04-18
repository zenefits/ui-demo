import React, { Component } from 'react';

import { DialogProps, Modal } from 'z-frontend-overlays';
import { Box, BoxProps, Flex, Image } from 'zbase';
import { getColor, styled } from 'z-frontend-theme';

import { DialogManager } from '../../..';

const videoThumbnail = require('./../images/video_thumbnail.png');

type Props = {
  backgroundImageSrc: string;
  videoUrl: string;
} & BoxProps;

const escapeKeyCode = 27;

const ModalVideoContainer = styled(Flex)`
  outline: none;
`;

export default class VideoSection extends Component<Props> {
  render() {
    const { backgroundImageSrc, videoUrl, ...containerProps } = this.props;

    return (
      <DialogManager
        render={({ open, close, isVisible, controlEl }: DialogProps) => {
          const modalProps = {
            isVisible,
            controlEl,
            fullScreenMobile: true,
            renderHeader: () => <Box />,
            title: '',
            onCancel: close,
            shouldCancelOnClickAway: true,
          };

          const closeIfEscape = (e: React.KeyboardEvent) => {
            if (e.keyCode === escapeKeyCode) {
              close();
            }
          };

          return (
            <Box
              w={1}
              py={[6, 6, 6, 7]}
              px={[5, 7]}
              style={{
                background: `${getColor('grayscale.g')} url("${backgroundImageSrc}") no-repeat`,
                backgroundSize: 'cover',
              }}
              {...containerProps}
            >
              <Modal {...modalProps}>
                <ModalVideoContainer
                  height={['300px', '350px', '350px', '500px']}
                  w={1}
                  onKeyDown={closeIfEscape}
                  tabIndex={0}
                >
                  <iframe
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    src={`${videoUrl}?rel=0&amp;autoplay=1`}
                    allowFullScreen
                  />
                </ModalVideoContainer>
              </Modal>
              <Image src={videoThumbnail} m="auto" onClick={open} style={{ cursor: 'pointer' }} alt="Play video" />
            </Box>
          );
        }}
      />
    );
  }
}
