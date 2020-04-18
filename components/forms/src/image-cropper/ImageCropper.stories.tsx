import React, { useState } from 'react';
// @ts-ignore
import { isChromatic } from 'storybook-chromatic';

import { paddedBox, Example } from 'z-frontend-storybook-config';
import { images, styled } from 'z-frontend-theme';
import { Avatar, AvatarProps } from 'z-frontend-composites';
import { Heading } from 'zbase';
import { color } from 'z-frontend-theme/utils';

import { storiesOf } from '../../.storybook/storyHelpers';
import ImageCropper, { ImageCropperProps } from './ImageCropper';

// the crop border is an animated gif, which leads to visual regression flakiness - hide it in Chromatic and fake with outline
const StyledContainer = isChromatic()
  ? styled.div`
      .ReactCrop__crop-selection {
        border-image: none;
        outline: 1px dashed ${color('grayscale.white')};
        outline-offset: -1px;
      }
    `
  : React.Fragment;

const avatarProps: AvatarProps = {
  firstName: 'Mr',
  lastName: 'Pug',
  s: 'xxxlarge',
};

function CropWithPreview(props: ImageCropperProps) {
  const { src, isSquare, ...rest } = props;
  const [imageFile, setImageFile] = useState<File>();

  const photoUrl = imageFile ? URL.createObjectURL(imageFile) : null;
  return (
    <StyledContainer>
      <ImageCropper src={props.src} isSquare={isSquare} onSuccess={setImageFile} {...rest} />

      <Heading level={3} my={3}>
        Preview:
      </Heading>
      <Avatar photoUrl={photoUrl} isSquare={isSquare} {...avatarProps} />
    </StyledContainer>
  );
}

storiesOf('forms|ImageCropper', module)
  .addDecorator(paddedBox)
  .add('default', () => (
    <>
      <Example label="default (circular)">
        <CropWithPreview src={images.aspectRatio} />
      </Example>
      <Example label="square selection">
        <CropWithPreview src={images.pug} isSquare />
      </Example>
      <Example label="fixed width/height">
        <CropWithPreview src={images.pug} width={200} />
      </Example>
    </>
  ));
