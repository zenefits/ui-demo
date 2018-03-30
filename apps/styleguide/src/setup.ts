import ColorGuide from './examples/ColorGuide';
import SpacingGuide from './examples/SpacingGuide';
import RenderWithTheme from './components/RenderWithTheme';
// make zbase components available in all examples
declare const global: any;
global.ColorGuide = ColorGuide;
global.SpacingGuide = SpacingGuide;
global.RenderWithTheme = RenderWithTheme;
