import { color } from '../utils';
import {
  ViewProperties,
  TouchableHighlightProperties,
  ScrollViewProperties,
  TextProperties,
  TextInputProperties,
} from 'react-native';

import { utilHocFactory, UtilPropsNative } from './utilHocFactory';

export default function generateUtilcomponents<ThemeInterface>(styled, css) {
  const withUtilProps = utilHocFactory<UtilPropsNative, ThemeInterface>(styled, css);

  const View = withUtilProps<ViewProperties>({
    additionalPropsMap: {
      flex: { css: 'flex' },
    },
  })(styled.View);

  const TouchableHighlight = withUtilProps<TouchableHighlightProperties>({
    additionalPropsMap: {
      flex: { css: 'flex' },
    },
  })(styled.TouchableHighlight);

  const ScrollView = withUtilProps<ScrollViewProperties>({
    componentAttrs: {
      keyboardShouldPersistTaps: 'handled',
    },
    additionalPropsMap: {
      flex: { css: 'flex' },
    },
    additionalCss: css`
      flex: 1;
    `,
  })(styled.ScrollView);

  const Text = withUtilProps<TextProperties>({
    additionalCss: css`
      font-size: 20px;
    `,
  })(styled.Text);

  const TextInput = withUtilProps<TextInputProperties>({
    additionalCss: css`
      border: 1px solid ${color('affirmation.a')};
    `,
  })(styled.TextInput);

  interface FlexProps {
    flex?: number;
    justify?: 'flex-start' | 'center' | 'flex-end' | 'space-around' | 'space-between';
    align?: 'flex-start' | 'center' | 'flex-end' | 'stretch';
    direction?: 'row' | 'row-reverse' | 'column' | 'column-reverse';
    row?: boolean;
    wrap?: boolean;
  }

  const flexPropsMap = {
    flex: { css: 'flex' },
    justify: { css: 'justify-content' },
    align: { css: 'align-items' },
    row: { css: 'flex-direction', value: (row: boolean) => (row ? 'row' : 'column') },
    direction: { css: 'flex-direction' },
    wrap: { css: 'flex-wrap', value: (wrap: boolean) => (wrap ? 'wrap' : 'nowrap') },
  };

  const Flex = withUtilProps<ViewProperties, FlexProps>({
    additionalPropsMap: flexPropsMap,
    additionalCss: css`
      display: flex;
    `,
  })(styled.View);

  return {
    View,
    TouchableHighlight,
    ScrollView,
    Text,
    TextInput,
    Flex,
  };
}
