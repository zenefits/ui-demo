import { fetchWrapper } from 'z-frontend-app-bootstrap';

export async function fetchAssetPaths(appName: string): Promise<String[]> {
  const params = new URL(window.location.href).searchParams;

  const sha = params.get(`${appName}-sha`);
  const response = await fetchWrapper(`/app/${appName}/assetMap.json${sha ? `:${sha}` : ''}`, {});

  return (await response.json()).bootEntrypointAssets.scripts;
}

export function insertScriptTag(scriptSrc: string): Promise<void> | void {
  if (!document.querySelector(`script[src="${scriptSrc}"]`)) {
    const script = document.createElement('script');
    return new Promise<void>((resolve, reject) => {
      script.src = scriptSrc;
      script.async = true;
      script.setAttribute('type', 'application/javascript');
      script.addEventListener('load', () => resolve());
      script.addEventListener('error', reject);

      document.head.appendChild(script);
    }).catch(err => {
      document.head.removeChild(script);
      throw err;
    });
  }
}
