module.exports = {
  /**
   * Fetch directives
   * control locations from which certain resource types may be loaded.
   */
  'script-src': ['firefly-071591.s3.amazonaws.com'], // Serves as a fallback for the other fetch directives.
  // child-src - Defines the valid sources for web workers and nested browsing contexts loaded using elements such as <frame> and <iframe>.
  'connect-src': ['usefirefly.com', 'wss://usefirefly.com', 'us.cobrowse.pega.com'], // connect-src - Restricts the URLs which can be loaded using script interfaces
  'style-src': ['firefly-071591.s3.amazonaws.com'], // Specifies valid sources for stylesheets.
};
