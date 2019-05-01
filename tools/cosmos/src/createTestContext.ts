import { render as renderer, RenderResult } from 'react-testing-library';
// @ts-ignore
import createTestContext from 'react-cosmos-test/generic';

import proxies from '../cosmos.proxies';

// TODO: add TypeScript support to cosmos
interface TestContext {
  mount: () => void;
  getWrapper: () => RenderResult;
  getField(fieldName: string): () => any;
}

export default (options: any) => createTestContext({ ...options, renderer, proxies }) as TestContext;
