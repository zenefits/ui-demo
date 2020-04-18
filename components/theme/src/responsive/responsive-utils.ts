import { theme } from '../web/theme';

const emMultiplier = 16; // px
const breakpointsInPixels = theme.breakpoints.map(b => b * emMultiplier);
const buildQuery = (index: number) =>
  `(min-width: ${breakpointsInPixels[index]}px) and (max-width: ${breakpointsInPixels[index + 1] - 1}px)`;

export const buildMediaQueries = () => [
  `(max-width: ${breakpointsInPixels[0] - 1}px)`,
  ...breakpointsInPixels.slice(1).map((_, index) => buildQuery(index)),
  `(min-width: ${breakpointsInPixels[breakpointsInPixels.length - 1]}px)`,
];
export const getBreakpointMatches = () =>
  window.matchMedia ? buildMediaQueries().map(query => window.matchMedia(query).matches) : [];
