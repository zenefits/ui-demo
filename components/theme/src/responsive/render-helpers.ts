declare global {
  interface Window {
    ZENEFITS_MOBILE_INTEGRATION: any;
  }
}

const conditionMap: { [index: string]: Function } = {
  inEmbeddedNativeView: () => {
    return window.ZENEFITS_MOBILE_INTEGRATION && window.ZENEFITS_MOBILE_INTEGRATION.isEmbeddedNativeView;
  },
};

export function matchesContext(context: string) {
  return conditionMap[context]();
}

export function matchesBreakpoints(breakpoints: boolean[], matches: boolean[]) {
  for (let i = 0; i < breakpoints.length; i += 1) {
    if (breakpoints[i] && matches[i]) {
      return true;
    }
  }
  return false;
}
