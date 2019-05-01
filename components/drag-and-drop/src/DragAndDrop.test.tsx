import React from 'react';
import { render } from 'enzyme';

import DragAndDrop from './DragAndDrop';

describe('DragAndDrop', () => {
  it('should render without throwing an error', () => {
    expect(render(<DragAndDrop onDrop={() => {}}>{() => <p>Hi</p>}</DragAndDrop>).text()).toEqual('Hi');
  });
});
