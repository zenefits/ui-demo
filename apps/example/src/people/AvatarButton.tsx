import React, { FunctionComponent } from 'react';

import { styled } from 'z-frontend-theme';

const StyledButton = styled.button`
  appearance: none;
  background: none;
  border: none;
  cursor: pointer;

  width: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 0;
`;

// TODO: add hover state similar to Ember
// see https://www.figma.com/file/EoYpzmUYgPUsqCMCtNdMB9hb/Proposals?node-id=4661%3A187
const AvatarButton: FunctionComponent<{ onClick: any }> = props => {
  return <StyledButton tabIndex={0} {...props} />;
};

export default AvatarButton;
