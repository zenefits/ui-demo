import { FunctionComponent } from 'react';

/** facilitates props auto-discovery for react-styleguidist */
export function makeDummyComponentForDocs<ComponentProps>() {
  const ForDocs: FunctionComponent<ComponentProps> = () => {
    return null;
  };
  return ForDocs;
}
