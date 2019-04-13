const https = require('https');

const ciEnabledLabelId = 965249763;

module.exports = async function checkForFullCiLabelUtil(pullRequestId, githubToken) {
  if (!pullRequestId) {
    console.log('error: no pull request id');
    process.exit(0);
  }

  const pullRequestUrl = `/repos/zenefits/z-frontend/pulls/${pullRequestId}`;

  const options = {
    hostname: 'api.github.com',
    path: pullRequestUrl,
    method: 'GET',
    headers: {
      Authorization: `token ${githubToken}`,
      'User-Agent': 'node/https',
    },
  };

  const parseResponse = res => {
    let labels = [];
    try {
      labels = JSON.parse(res).labels; // eslint-disable-line prefer-destructuring
    } catch (err) {
      console.log('error parsing response JSON');
    }

    return labels && labels.find(item => item.id === ciEnabledLabelId);
  };

  return new Promise(resolve => {
    https
      .get(options, response => {
        let data = '';

        response.on('data', chunk => {
          data += chunk;
        });

        response.on('end', () => {
          resolve(parseResponse(data));
        });
      })
      .on('error', err => {
        console.error(`Error: ${err.message}`);
      });
  });
};
