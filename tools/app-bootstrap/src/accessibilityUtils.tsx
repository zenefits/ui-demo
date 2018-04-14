import { css, styled } from 'z-frontend-theme';
import { Box } from 'zbase';

export const ScreenReaderOnlyCss = css`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
`;

export const ScreenReaderOnly = styled(Box)`
  ${ScreenReaderOnlyCss};
`;

// Indirectly related to accessibility, as many accessbility guidelines involve related components by id
export const generateRandomId = (numChars = 10): string => {
  let id = '';
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < numChars; i += 1) {
    id += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return id;
};
