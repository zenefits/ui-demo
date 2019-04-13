import React, { Component } from 'react';

import { styled } from 'z-frontend-theme';

const VisuallyHidden = styled.div`
  position: absolute !important; /* Outside the DOM flow */
  height: 1px;
  width: 1px; /* Nearly collapsed */
  overflow: hidden;
  clip: rect(1px 1px 1px 1px); /* IE 7+ only support clip without commas */
  clip: rect(1px, 1px, 1px, 1px); /* All other browsers */
`;

class ScreenReaderOnly extends Component {
  render() {
    const { children, ...rest } = this.props;
    return <VisuallyHidden {...rest}>{children}</VisuallyHidden>;
  }
}

export default ScreenReaderOnly;
