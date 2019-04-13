import React from 'react';

import { images, styled } from 'z-frontend-theme';

import { Flex, Image, Label } from '../index';

const StyledImage = styled(Image)`
  width: 100%;
  height: auto;
  max-width: 150px;
`;

export default () => (
  <Flex>
    <Label>Logo</Label>
    <StyledImage src={images.logo} alt="Zenefits Logo" />
  </Flex>
);
