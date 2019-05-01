// @ts-check

const signalfx = require('signalfx');

const client = new signalfx.Ingest('dvKRjMhtiAK4QDnurz8-CQ');

module.exports = function sendToSignalfx(metricName, value, dimensions) {
  // console.log(`send "${metricName}" metric with value "${value}"`, { dimensions, value });
  client.send({
    gauges: [
      {
        metric: metricName,
        value, // seconds given {scriptName} took to run
        dimensions: {
          nodeEnv: process.env.NODE_ENV || 'development',
          CI: process.env.CI ? 'yes' : 'no',
          ...dimensions,
        },
      },
    ],
  });
};
