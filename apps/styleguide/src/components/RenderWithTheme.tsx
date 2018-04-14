import { ReactElement, ReactNode, StatelessComponent } from 'react';

import { withTheme, ThemeInterface } from 'z-frontend-theme';

type RenderWithThemeProps = {
  children: (theme: ThemeInterface) => ReactNode;
  theme: ThemeInterface;
};

const RenderWithTheme: StatelessComponent<RenderWithThemeProps> = ({ children, theme }) =>
  children(theme) as ReactElement<any>;

export default withTheme(RenderWithTheme);
