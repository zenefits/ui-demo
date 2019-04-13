export const columnSpacing = 3;
export const rowSpacing = 3;

export function handleUnsupportedLayout(columns: string, supportedLayouts: string[]): void {
  const unsupportedMessage = `Trying to render unsupported PageLayout section. Supported are ${supportedLayouts.join(
    ', ',
  )} but received ${columns}`;
  if (__DEVELOPMENT__) {
    throw new Error(unsupportedMessage);
  }
  console.warn(unsupportedMessage);
}
