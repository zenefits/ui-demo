module.exports = {
  /**
   * Fetch directives
   * control locations from which certain resource types may be loaded.
   */
  'child-src': [
    'https://cdn.walkme.com',
    'https://playerserver.walkme.com',
    'https://ec.walkme.com',
    'https://rapi.walkme.com',
    'https://papi.walkme.com',
  ],
  'script-src': ['https://cdn.walkme.com', 'https://playerserver.walkme.com', "'unsafe-inline'"], // connect-src - Restricts the URLs which can be loaded using script interfaces
  'frame-src': ['https://cdn.walkme.com'],
  'connect-src': [
    'https://ec.walkme.com',
    'https://rapi.walkme.com',
    'https://papi.walkme.com',
    'https://analytics.walkme.com',
    'https://insights.walkme.com/',
    'https://api.walkme.com/',
    'https://dap.walkme.com/',
    'https://editorsite.walkme.com',
    'https://s3.amazonaws.com',
  ],
  'style-src': ['https://cdn.walkme.com'], // Specifies valid sources for stylesheets.
  'img-src': ['https://d3sbxpiag177w8.cloudfront.net', 'https://d2qhvajt3imc89.cloudfront.net'],
};
