export function getHashPath(urlString: string) {
  const url = new URL(urlString);

  // Remove leading #
  return url.hash && url.hash.slice(1);
}
