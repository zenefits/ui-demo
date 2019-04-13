const awsS3ProdBucket = `https://zenefits.s3.amazonaws.com`;
const awsS3TestBucket = `https://zenefits-test.s3.amazonaws.com`;

module.exports = {
  /**
   * Fetch directives
   * control locations from which certain resource types may be loaded.
   */
  'default-src': ["'self'", '*.zncloud.net'], // Serves as a fallback for the other fetch directives.
  // child-src - Defines the valid sources for web workers and nested browsing contexts loaded using elements such as <frame> and <iframe>.
  'connect-src': [
    "'self'",
    `${awsS3ProdBucket}`,
    `${awsS3TestBucket}`,
    'https://uilogger.services.zncloud.net',
    'zenefits.s3.amazonaws.com',
  ], // connect-src - Restricts the URLs which can be loaded using script interfaces
  'font-src': ["'self'", 'data:'], // Specifies valid sources for fonts loaded using @font-face.
  'frame-src': ["'self'", 'https://www.youtube.com'], // Specifies valid sources for nested browsing contexts loading using elements such as <frame> and <iframe>.
  'img-src': ["'self'", 'https://*', 'data:'], // Specifies valid sources of images and favicons.
  // manifest-src - Specifies valid sources of application manifest files.
  // media-src - Specifies valid sources for loading media using the <audio> , <video> and <track> elements.
  'object-src': ["'self'", 'zenefits.s3.amazonaws.com', `${awsS3ProdBucket}`, `${awsS3TestBucket}`], // - Specifies valid sources for the <object>, <embed>, and <applet> elements.
  // script-src - Specifies valid sources for JavaScript.
  'script-src': ["'self'", '*.zncloud.net', "'unsafe-eval'"], // Specifies valid sources for JavaScript.
  'style-src': ["'self'", "'unsafe-inline'"], // Specifies valid sources for stylesheets.
  // worker-src - Specifies valid sources for Worker, SharedWorker, or ServiceWorker scripts.
  'worker-src': ['blob:'],
  /**
   * Document directives
   * govern the properties of a document or worker environment to which a policy applies.
   */
  'base-uri': ["'self'"], // Restricts the URLs which can be used in a document's <base> element.
  // plugin-types - Restricts the set of plugins that can be embedded into a document by limiting the types of resources which can be loaded.
  // sandbox - Enables a sandbox for the requested resource similar to the <iframe> sandbox attribute.
  // disown-opener - Ensures a resource will disown its opener when navigated to.

  /**
   * Navigation directives
   * govern to which location a user can navigate to or submit a form to, for example.
   */
  'form-action': ["'self'"], // Restricts the URLs which can be used as the target of a form submissions from a given context.
  // Content Security Policies delivered via a <meta> element may not contain the frame-ancestors directive.
  // `frame-ancestors 'self'`, // Specifies valid parents that may embed a page using <frame>, <iframe>, <object>, <embed>, or <applet>.
  // navigation-to - !experimental Restricts the URLs to which a document can navigate by any means (a, form, window.location, window.open, etc.)

  /**
   * Reporting directives
   * control the reporting process of CSP violations. See also the Content-Security-Policy-Report-Only header.
   */
  // report-uri - Instructs the user agent to report attempts to violate the Content Security Policy. These violation reports consist of JSON documents sent via an HTTP POST request to the specified URI.
  // report-to - !experimental Fires a SecurityPolicyViolationEvent.

  /**
   * Other directives
   */
  'block-all-mixed-content': [], // Prevents loading any assets using HTTP when the page is loaded using HTTPS.
  // referrer - Used to specify information in the referer (sic) header for links away from a page. Use the Referrer-Policy header instead.
  // require-sri-for - Requires the use of SRI for scripts or styles on the page.
  // upgrade-insecure-requests - Instructs user agents to treat all of a site's insecure URLs (those served over HTTP) as though they have been replaced with secure URLs (those served over HTTPS). This directive is intended for web sites with large numbers of insecure legacy URLs that need to be rewritten.
};
