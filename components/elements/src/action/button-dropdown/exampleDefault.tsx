import React from 'react';
import { MemoryRouter } from 'react-router-dom';

import ButtonDropdown from './ButtonDropdown';

export default () => (
  <MemoryRouter>
    <ButtonDropdown>
      <ButtonDropdown.ItemRouteLink to={`/reviews/123/details`}>Edit</ButtonDropdown.ItemRouteLink>
      <ButtonDropdown.ItemRouteLink to={`/review-templates/new/details/`}>
        Save As Template
      </ButtonDropdown.ItemRouteLink>
    </ButtonDropdown>
  </MemoryRouter>
);
