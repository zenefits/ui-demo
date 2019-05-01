module.exports = {
  'default-src': [
    'https://*.salesforceliveagent.com',
    'https://secure.zenefits.com/static/js/libs/liveagent-chat-40.js',
  ],
  'script-src': [
    'https://*.salesforceliveagent.com',
    'https://secure.zenefits.com/static/js/libs/liveagent-chat-40.js',
  ],
  'frame-src': [
    'https://zenefits.secure.force.com/',
    'https://*.salesforceliveagent.com/',
    'https://qa-zenefits.cs78.force.com/',
  ],
  'form-action': [
    'https://*.salesforceliveagent.com',
    'https://zenefits.secure.force.com/',
    'https://qa-zenefits.cs78.force.com/',
  ],
};
