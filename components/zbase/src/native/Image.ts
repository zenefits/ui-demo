import { ImageProperties } from 'react-native';
import withUtilPropsNative, { ResultNativeComponentProps } from './withUtilPropsNative';

export type ImageProps = ResultNativeComponentProps<ImageProperties>;
export const Image = withUtilPropsNative<ImageProperties>({})('Image');
