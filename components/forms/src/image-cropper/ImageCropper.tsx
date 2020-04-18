import React, { useState, FunctionComponent } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

import { Box, BoxProps } from 'zbase';

export type ImageCropperProps = {
  /** Source image to crop */
  src: string;

  /** File name for cropped image */
  croppedFileName?: string;

  /** Callback when cropping is successfully completed */
  onSuccess?: (cropped: File) => void;

  /**
   * Is the crop selection square instead of circular?
   * @default false
   * */
  isSquare?: boolean;

  /** Override any default react-image-crop props. Should not normally be necessary. */
  cropperProps?: Omit<ReactCrop.ReactCropProps, 'src' | 'onChange'>;
} & BoxProps;

const ImageCropper: FunctionComponent<ImageCropperProps> = props => {
  const {
    src,
    isSquare = false,
    croppedFileName = 'croppedFile.jpeg',
    onSuccess,
    cropperProps,
    ...containerProps
  } = props;

  const [crop, setCrop] = useState<ReactCrop.Crop>();
  const [imageRef, setImageRef] = useState<HTMLImageElement>();

  async function handleOnComplete(crop: ReactCrop.Crop) {
    if (crop.width && crop.height && onSuccess) {
      const croppedFile = await getCroppedFile(imageRef, crop, croppedFileName);
      onSuccess(croppedFile);
    }
  }

  async function getCroppedFile(image: HTMLImageElement, crop: ReactCrop.Crop, fileName: string) {
    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;

    const ctx = canvas.getContext('2d');
    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height,
    );

    return convertCanvasToFile(canvas, fileName);
  }

  function convertCanvasToFile(canvas: HTMLCanvasElement, fileName: string): Promise<File> {
    return new Promise((resolve, reject) => {
      // TODO: add polyfill for Edge browsers
      canvas.toBlob((blob: Blob) => {
        if (!blob) {
          return reject(new Error('Canvas is empty'));
        }
        const file = new File([blob], fileName); // todo: set mime type? {type: "application/octet-stream"}
        resolve(file);
      }, 'image/jpeg');
    });
  }

  return (
    <Box {...containerProps} style={{ lineHeight: 0 }}>
      <ReactCrop
        src={src}
        imageAlt="Original image"
        crop={crop}
        circularCrop={!isSquare}
        onImageLoaded={image => {
          setImageRef(image);

          // use image dimensions to choose a reasonable initial crop
          const maxSelectionSize = Math.min(image.width, image.height);
          const cropSelectionWidth = Math.min(maxSelectionSize, 200);
          setCrop({
            aspect: 1,
            width: cropSelectionWidth,
            // width based on aspect ratio
            x: image.width / 2 - cropSelectionWidth / 2,
          });
          return false;
        }}
        onChange={setCrop}
        onComplete={handleOnComplete}
        {...cropperProps}
      />
    </Box>
  );
};

export default ImageCropper;
