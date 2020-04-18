import { useContext, useEffect } from 'react';

import { IntlContext } from '../createIntlProvider';

export function useDocumentTitle(sectionTitle?: string) {
  const intl = useContext(IntlContext);
  const appTitle = intl.formatMessage({ id: 'nav.productTitle' });

  useEffect(() => {
    const originalTitle = document.title;
    const parts = [sectionTitle, appTitle, 'Zenefits'].filter(part => !!part);
    const newTitle = parts.join(' - ');
    document.title = newTitle;

    return () => {
      document.title = originalTitle;
    };
  }, [sectionTitle]);
}
