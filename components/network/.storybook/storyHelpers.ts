// @ts-ignore
import { storiesOf as storiesOfOriginal } from '@storybook/react';

// NOTE: function name must match 'storiesOf' for addon-storysource to work
export function storiesOf(kind: string, module: NodeModule) {
  if (!kind.includes('|')) {
    throw new Error(`Story kind "${kind}" must include a section matching the package name: eg "elements|Button"`);
  }
  return storiesOfOriginal(kind, module);
}
