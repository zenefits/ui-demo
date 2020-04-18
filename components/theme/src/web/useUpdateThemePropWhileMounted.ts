import { useContext, useEffect } from 'react';

import { ZFrontendThemeContext } from './ThemeProvider';
import { ThemeInterface } from './theme';

export default function useUpdateThemePropWhileMounted(
  themeProp: keyof ThemeInterface,
  setter: (theme: ThemeInterface) => any,
) {
  const { theme, setThemeProp } = useContext(ZFrontendThemeContext);

  const originalValue = theme[themeProp];
  useEffect(() => {
    setThemeProp(themeProp, setter(theme));

    return () => {
      setThemeProp(themeProp, originalValue);
    };
  }, []);
}
