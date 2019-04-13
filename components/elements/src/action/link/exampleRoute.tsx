import React from 'react';
import { MemoryRouter } from 'react-router-dom';

import Link from './Link';

export default () => (
  <MemoryRouter>
    <Link to="/home">Back to home</Link>
  </MemoryRouter>
);
