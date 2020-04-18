import { styled } from 'z-frontend-theme';
import { Box } from 'zbase';

/** @component */
export default styled(Box)`
  position: absolute !important; /* Outside the DOM flow */
  height: 1px;
  width: 1px; /* Nearly collapsed */
  overflow: hidden;
  clip: rect(1px 1px 1px 1px); /* IE 7+ only support clip without commas */
  clip: rect(1px, 1px, 1px, 1px); /* All other browsers */
`;
