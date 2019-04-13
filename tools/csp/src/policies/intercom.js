module.exports = {
  'connect-src': [
    'https://api.intercom.io',
    'https://api-iam.intercom.io',
    'https://api-ping.intercom.io',
    'https://nexus-websocket-a.intercom.io',
    'https://nexus-websocket-b.intercom.io',
    'https://nexus-long-poller-a.intercom.io',
    'https://nexus-long-poller-b.intercom.io',
    'wss://nexus-websocket-a.intercom.io',
    'wss://nexus-websocket-b.intercom.io',
    'https://uploads.intercomcdn.com',
    'https://uploads.intercomusercontent.com',
    'https://app.getsentry.com',
  ],

  'child-src': [
    'https://share.intercom.io',
    'https://intercom-sheets.com',
    'https://www.youtube.com',
    'https://player.vimeo.com',
    'https://fast.wistia.net',
  ],

  'font-src': ['https://js.intercomcdn.com'],

  'media-src': ['https://js.intercomcdn.com'],

  'img-src': [
    'data:',
    'https://js.intercomcdn.com',
    'https://static.intercomassets.com',
    'https://downloads.intercomcdn.com',
    'https://uploads.intercomusercontent.com',
    'https://gifs.intercomcdn.com',
  ],

  'script-src': ["'self'", 'https://app.intercom.io', 'https://widget.intercom.io', 'https://js.intercomcdn.com'],

  'style-src': ["'unsafe-inline'"],
};
