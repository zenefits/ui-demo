import React, { Component } from 'react';
import SignaturePad from 'signature_pad';

import { styled } from 'z-frontend-theme';
import { Box, BoxProps, Flex } from 'zbase';
import { color, radius, space } from 'z-frontend-theme/utils';
import { IconButton } from 'z-frontend-elements';

import { validateSignature } from './signatureUtil';

export type SignatureValue = {
  /** Signature image (in png format) as base 64 encoded data URL (https://mdn.io/todataurl). */
  dataUrl: string;
  /** Date the change happened. */
  date: Date;
  /** Whether the signature is valid. False if too small */
  valid?: boolean;
};

type BoxFixedProps = Omit<BoxProps, 'width' | 'height'>;

export type SignatureProps = BoxFixedProps & {
  name?: string;
  /** The initial or previous signature image as base 64 encoded data URL. */
  defaultSignatureImage?: string;
  /**
   * Description for screen readers.
   * @default "Signature"
   */
  alt?: string;
  /**
   * Width of the signature pad in pixels. Cannot be a percentage.
   * @default 500
   */
  width?: number;
  /**
   * Height of the signature pad in pixels. Cannot be a percentage.
   * @default 200
   */
  height?: number;
  /**
   * Can't edit or clear the signature
   * @default false
   */
  disabled?: boolean;
  /** Event handler for when the signature changes. */
  onSignatureChange?: (signatureChange: SignatureValue) => void;
  /** Event handler for when the signature is cleared. */
  onSignatureClear?: () => void;
  /**
   * Is the signature pad in an error state?
   * @default false
   */
  hasError?: boolean;
};

const SignatureFlex = (props: SignatureProps) => <Flex {...props} />;

const OuterWrapper = styled(SignatureFlex)`
  border-radius: ${radius};
  background-color: ${color('grayscale.white')};
  border: 1px solid ${props => (props.hasError ? color('negation.a') : color('grayscale.f'))};
  width: 100%;
  ${props => (props.width !== Signature.defaultProps.width ? `width: ${props.width}px` : '')};
  ${props => (props.height !== Signature.defaultProps.height ? `height: ${props.height}px` : '')};
  /* maxes are somewhat arbitrary */
  max-width: 700px;
  max-height: 300px;
`;

const RelativeWrapper = styled(Box)`
  position: relative;
  flex: 1;
`;

const ResetButton = styled(IconButton)`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
`;

const StyledCanvas = styled('canvas')`
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const SignatureGuide = styled('div')`
  position: absolute;
  bottom: ${space(5)};
  left: ${space(3)};
  right: ${space(3)};
  height: 1px;
  background-color: ${color('secondary.b')};
`;

class Signature extends Component<SignatureProps> {
  canvas: React.RefObject<HTMLCanvasElement> = null;

  sigPad: SignaturePad = null;

  static defaultProps = {
    width: 500,
    height: 200,
    disabled: false,
    hasError: false,
    alt: 'Signature',
  };

  constructor(props: SignatureProps) {
    super(props);
    this.canvas = React.createRef();
  }

  clear = () => {
    this.sigPad.clear();
    this.props.onSignatureClear && this.props.onSignatureClear();
    this.onSignatureChange();
  };

  isEmpty = () => {
    return this.sigPad.isEmpty();
  };

  onSignatureChange = () => {
    const onChangeData = this.isEmpty()
      ? {
          dataUrl: '',
          date: null,
          valid: false,
        }
      : {
          dataUrl: this.sigPad.toDataURL(), // should we trim whitespace from canvas? https://github.com/szimek/signature_pad/issues/49#issuecomment-260976909
          date: new Date(),
          valid: validateSignature(this.sigPad.toData(), this.canvas.current.width, this.canvas.current.height),
        };
    this.props.onSignatureChange && this.props.onSignatureChange(onChangeData);
  };

  componentDidMount() {
    this.sigPad = new SignaturePad(this.canvas.current);
    this.resizeCanvas();
    this.sigPad.clear();
    this.configureSignaturePad();

    const { defaultSignatureImage } = this.props;
    if (defaultSignatureImage) {
      // only update on mount because treating as uncontrolled component
      // (trying to control signature from outside can lead to multiple signatures on canvas)
      this.sigPad.fromDataURL(defaultSignatureImage);
    }
  }

  configureSignaturePad() {
    const { onSignatureChange, disabled } = this.props;
    if (onSignatureChange) {
      this.sigPad.onEnd = this.onSignatureChange;
    }

    if (disabled) {
      this.disable();
    } else {
      window.addEventListener('resize', this.resizeCanvas.bind(this));
      this.sigPad.on();
    }
  }

  disable() {
    window.removeEventListener('resize', this.resizeCanvas.bind(this));
    this.sigPad.off();
  }

  componentWillUnmount() {
    this.disable();
  }

  componentDidUpdate() {
    this.configureSignaturePad();
  }

  // from https://github.com/szimek/signature_pad#handling-high-dpi-screens
  resizeCanvas() {
    const { width, height } = this.props;
    if (width !== Signature.defaultProps.width || height !== Signature.defaultProps.height) {
      // not resizing because custom size was set
      return;
    }

    // When zoomed out to less than 100%, for some very strange reason,
    // some browsers report devicePixelRatio as less than 1
    // and only part of the canvas is cleared then.
    const ratio = Math.max(window.devicePixelRatio || 1, 1);

    const currentCanvas = this.canvas.current;
    if (!currentCanvas) {
      return;
    }
    currentCanvas.width = currentCanvas.offsetWidth * ratio;
    currentCanvas.height = currentCanvas.offsetHeight * ratio;
    currentCanvas.getContext('2d').scale(ratio, ratio);

    // SignaturePad does not listen for canvas changes, so after the canvas is automatically
    // cleared by the browser, SignaturePad#isEmpty might still return false, even though the
    // canvas looks empty, because the internal data wasn't cleared. To make sure
    // that the state of SignaturePad is consistent with visual state of the canvas, you
    // have to clear it manually.
    this.sigPad.clear();
  }

  render() {
    const {
      alt,
      width,
      height,
      disabled,
      defaultSignatureImage,
      onSignatureChange,
      onSignatureClear,
      ...rest
    } = this.props;
    return (
      <OuterWrapper width={width} height={height} {...rest}>
        <RelativeWrapper>
          <SignatureGuide />
          <StyledCanvas
            width={width}
            height={height}
            ref={this.canvas}
            aria-label={alt}
            role="img"
            // not much point in making canvas able to be focused
            // tabIndex={0}
          />
          {!disabled && <ResetButton iconName="refresh" onClick={this.clear} />}
        </RelativeWrapper>
      </OuterWrapper>
    );
  }
}

export default Signature;
