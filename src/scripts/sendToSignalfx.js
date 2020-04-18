// @ts-check

const signalfx = require('signalfx');

const client = new signalfx.Ingest('dvKRjMhtiAK4QDnurz8-CQ');

module.exports = function sendGauge(metricName, value, dimensions) {
  // console.log(`sending "${metricName}" metric with value "${value}"`, { dimensions, value });
  const promise = client.send({
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
  // promise.then(() => console.log(`sent "${metricName}""`));
  return promise;
};
