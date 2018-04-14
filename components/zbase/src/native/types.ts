import { ColorString, FontStyleString } from 'z-frontend-theme/native';

import {
  UtilsMapCommon,
  UtilProp,
  UtilTypeBg as UtilTypeBgBase,
  UtilTypeBorder as UtilTypeBorderBase,
  UtilTypeColor as UtilTypeColorBase,
  UtilTypeFont as UtilTypeFontBase,
  UtilTypeMargin as UtilTypeMarginBase,
  UtilTypePadding as UtilTypePaddingBase,
  UtilTypeWidth as UtilTypeWidthBase,
} from '../commonTypes';

export interface UtilProps extends UtilsMapCommon<UtilProp, ColorString, FontStyleString> {}

// list from styled-components/native/index.d.ts
export const supportedNativeStyledComponentsMap = {
  ActivityIndicator: true,
  ActivityIndicatorIOS: true,
  Button: true,
  DatePickerIOS: true,
  DrawerLayoutAndroid: true,
  Image: true,
  KeyboardAvoidingView: true,
  ListView: true,
  MapView: true,
  Modal: true,
  Navigator: true,
  NavigatorIOS: true,
  Picker: true,
  PickerIOS: true,
  ProgressBarAndroid: true,
  ProgressViewIOS: true,
  ScrollView: true,
  SegmentedControlIOS: true,
  Slider: true,
  SliderIOS: true,
  SnapshotViewIOS: true,
  RecyclerViewBackedScrollView: true,
  RefreshControl: true,
  StatusBar: true,
  SwipeableListView: true,
  Switch: true,
  SwitchIOS: true,
  Text: true,
  TextInput: true,
  TouchableHighlight: true,
  TouchableNativeFeedback: true,
  TouchableOpacity: true,
  TouchableWithoutFeedback: true,
  View: true,
  ViewPagerAndroid: true,
  WebView: true,
};

export type StyledTagNative = keyof (typeof supportedNativeStyledComponentsMap);

export interface UtilTypeBg extends UtilTypeBgBase<ColorString> {}
export interface UtilTypeColor extends UtilTypeColorBase<ColorString> {}
export interface UtilTypeFont extends UtilTypeFontBase<UtilProp, FontStyleString> {}
export interface UtilTypePadding extends UtilTypePaddingBase<UtilProp> {}
export interface UtilTypeWidth extends UtilTypeWidthBase<UtilProp> {}
export interface UtilTypeMargin extends UtilTypeMarginBase<UtilProp> {}
export interface UtilTypeBorder extends UtilTypeBorderBase<ColorString> {}
