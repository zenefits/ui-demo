import React from 'react';

import { mountWithTheme, renderWithTheme } from 'z-frontend-theme/test-utils/theme';

import ReadMore from './ReadMore';
const text =
  'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam remaperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemoenim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos quiratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur,adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaeratvoluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi utaliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihilmolestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?';

describe('ReadMore', () => {
  it('should mount without throwing an error', () => {
    const wrapper = mountWithTheme(<ReadMore expandedText={<h1>{text}</h1>}>{text}</ReadMore>);
    expect(wrapper).toHaveLength(1);
  });

  it('should render collapsed text when collapsed', () => {
    const rendered = renderWithTheme(<ReadMore expandedText={<h1>{text}</h1>}>{text}</ReadMore>);
    expect(rendered.text()).toBe(`${text}Show More`);
  });

  it('should render expanded text when expanded', () => {
    const rendered = renderWithTheme(
      <ReadMore expandedText={<h1>{text}</h1>} isExpanded>
        {text}
      </ReadMore>,
    );
    expect(rendered.text()).toBe(`${text}Show Less`);
  });
});
