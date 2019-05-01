export default (src: string) => {
  return new Promise((resolve, reject) => {
    if (document.querySelectorAll(`[data-src='${src}']`).length === 0) {
      const script = document.createElement('script');
      script.src = src;
      script.async = true;
      script.setAttribute('data-src', src);
      script.setAttribute('type', 'application/javascript');
      script.addEventListener('load', resolve);
      script.addEventListener('load', reject);
      document.head.appendChild(script);
    } else {
      resolve('script already loaded');
    }
  }).catch(e => {
    throw e;
  });
};
