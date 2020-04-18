import React from 'react';
import 'jest-styled-components';

import 'z-frontend-jest/modified-jest-styled-components';
import { mountEnzymeWithThemeIntl, renderEnzymeWithThemeIntl } from 'z-frontend-theme/test-utils/intl';

import { Heading } from '../index';

const messages = {
  title: '{count, plural, =0 {No Assigned Reviews} one {{count} Assigned Review} other {{count} Assigned Reviews}}',
};

describe('Heading', () => {
  it('should mount without throwing an error', () => {
    expect(mountEnzymeWithThemeIntl(<Heading level={2}>Heading</Heading>).text()).toBe('Heading');
    const rendered = renderEnzymeWithThemeIntl(<Heading level={4}>foo</Heading>);
    expect(rendered.is('h4')).toBe(true);
  });

  describe('should support i18n props', () => {
    it('zero case', () => {
      const none = mountEnzymeWithThemeIntl(
        <Heading
          level={2}
          textKey="title"
          textValues={{
            count: 0,
          }}
        />,
        { messages },
      );
      expect(none.text()).toBe('No Assigned Reviews');
    });

    it('1 case', () => {
      const single = mountEnzymeWithThemeIntl(
        <Heading
          level={2}
          textKey="title"
          textValues={{
            count: 1,
          }}
        />,
        { messages },
      );
      expect(single.text()).toBe('1 Assigned Review');
    });

    it('multiple case', () => {
      const lots = mountEnzymeWithThemeIntl(
        <Heading
          level={2}
          textKey="title"
          textValues={{
            count: 10,
          }}
        />,
        { messages },
      );
      expect(lots.text()).toBe('10 Assigned Reviews');
    });
  });

  it('should respect text props', () => {
    const mounted = mountEnzymeWithThemeIntl(
      <Heading level={2} textTransform="uppercase">
        foo
      </Heading>,
    );
    expect(mounted).toHaveStyleRule('text-transform', 'uppercase');
  });

  it('should pass ref down', () => {
    const myRef = React.createRef();
    const wrapper = mountEnzymeWithThemeIntl(
      <Heading level={4} elementRef={myRef}>
        foo
      </Heading>,
    );
    expect(myRef.current).toBe(wrapper.getDOMNode());
  });
});
