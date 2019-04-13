import React from 'react';

import { mountWithTheme } from 'z-frontend-theme/test-utils/theme';

import Truncate, { getHeight } from './Truncate';
const text =
  'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam remaperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemoenim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos quiratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur,adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaeratvoluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi utaliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihilmolestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?';

describe('Truncate', () => {
  it('should mount without throwing an error', () => {
    const wrapper = mountWithTheme(<Truncate>{text}</Truncate>);
    expect(wrapper).toHaveLength(1);
  });
});

describe('getHeight', () => {
  it('should return the correct maxHeight based off of the fontStyle and lines', () => {
    expect(
      getHeight({
        lines: 3,
        fontStyle: 'paragraphs.m',
      }),
    ).toEqual(60.06);
    expect(
      getHeight({
        lines: 1,
        fontStyle: 'headings.m',
      }),
    ).toEqual(23.94);
    expect(
      getHeight({
        lines: 4,
        fontStyle: 'paragraphs.xl',
      }),
    ).toEqual(111.72);
  });
});
