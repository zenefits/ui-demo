const { spawn } = require('child_process');
const path = require('path');
const reporter = require('../utils/yarnReporter');
const auditExceptions = require('../../auditExceptions');
const { groupBy, flatten } = require('lodash');

const program = require('commander');

/**
 * Runs `yarn audit` against the toplevel yarn.lock file. If any vulnerabilities are found they will be logged and
 * the script will exit with code=1. Advisories can be ignored by adding them to auditExceptions.js.
 */

program
  .option('--log-all', 'Log every advisory individually, do not group similar advisories together.')
  .parse(process.argv);

class AuditAdvisory {
  constructor(auditAdvisoryJson, paths) {
    this.auditAdvisoryJson = auditAdvisoryJson;
    this.paths = paths || [auditAdvisoryJson.data.resolution.path];
  }

  get advisory() {
    return this.auditAdvisoryJson.data.advisory;
  }

  get resolution() {
    return this.auditAdvisoryJson.data.resolution;
  }

  get dependecyOf() {
    return `${this.resolution.path.split('>')[0]} ${this.resolution.dev ? '[dev]' : ''}`;
  }
}

const rawOutput = {
  stdout: '',
  stderr: '',
};
const parsedOutput = {
  auditAdvisories: [],
};

// Parsing functions

function parseJSON(line) {
  try {
    return JSON.parse(line);
  } catch (e) {
    console.log('Error parsing line', line);
    return null;
  }
}

// When run with the --json arg yarn returns json objects seperated by new lines
function parseStdout(stdout) {
  rawOutput.stdout += stdout;

  if (rawOutput.stdout.includes('\n')) {
    const lines = rawOutput.stdout.split('\n');
    const newAuditAdvisories = lines
      .slice(0, lines.length - 1)
      .map(parseJSON)
      .filter(auditAdvisoryJson => auditAdvisoryJson.type === 'auditAdvisory')
      .map(auditAdvisoryJson => new AuditAdvisory(auditAdvisoryJson));

    parsedOutput.auditAdvisories = [...parsedOutput.auditAdvisories, ...newAuditAdvisories];

    rawOutput.stdout = lines[lines.length - 1];
  }
}

function parseAndLogStderr(stderr) {
  rawOutput.stderr += stderr;

  if (rawOutput.stderr.includes('\n')) {
    const lines = rawOutput.stderr.split('\n');
    lines
      .slice(0, lines.length - 1)
      .map(parseJSON)
      .forEach(entry => reporter.logError(entry));

    rawOutput.stderr = lines[lines.length - 1];
  }
}

// Don't use summary returned from yarn as totals will include filtered deps
function evaluateSummary(filteredAdvisories) {
  return filteredAdvisories.reduce(
    (totals, advisory) => {
      totals[advisory.severity] += 1; // eslint-disable-line no-param-reassign
      return totals;
    },
    {
      info: 0,
      low: 0,
      moderate: 0,
      high: 0,
      critical: 0,
    },
  );
}

// Unless arg set to show all advisories individually group by advisory id + root dependency.
// This is because often a single outdated dep can cause many duplicate entries downstream
function evaluateAdvisoryEntries(auditAdvisories) {
  if (program.logAll) {
    return auditAdvisories;
  }
  const groupedAdvisories = groupBy(
    auditAdvisories,
    auditAdvisory => `${auditAdvisory.advisory.id}:${auditAdvisory.advisory.dependsOn}`,
  );
  return Object.values(groupedAdvisories).map(
    advisoryGroup =>
      new AuditAdvisory(
        advisoryGroup[0].auditAdvisoryJson,
        flatten(advisoryGroup.map(auditAdvisory => auditAdvisory.paths)),
      ),
  );
}

// Main

const run = () => {
  const promise = new Promise((resolve, reject) => {
    const yarnAudit = spawn('yarn', ['audit', '--json'], { cwd: path.resolve(__dirname, '../../') });

    yarnAudit.stdout.on('data', data => {
      parseStdout(data);
    });

    yarnAudit.on('exit', code => {
      console.log('`Yarn audit --json` exitted with code', code);
      resolve();
    });

    yarnAudit.on('error', error => {
      reject(error);
    });

    yarnAudit.stderr.on('data', data => {
      parseAndLogStderr(data);
    });
  });

  promise
    .then(() => {
      const filteredAuditAdvisories = parsedOutput.auditAdvisories.filter(
        auditAdvisory => !auditExceptions.includes(auditAdvisory.advisory.url),
      );
      if (filteredAuditAdvisories.length) {
        const groupedAuditAdvisories = evaluateAdvisoryEntries(filteredAuditAdvisories);
        groupedAuditAdvisories.forEach(auditAdvisory => reporter.logAdvisory(auditAdvisory));

        reporter.logAuditSummary(evaluateSummary(filteredAuditAdvisories.map(auditAdvisory => auditAdvisory.advisory)));
        process.exit(1);
      } else {
        console.log('No vulnerabilities found!');
        process.exit(0);
      }
    })
    .catch(e => {
      console.log('Exitted with error', e);
      process.exit(1);
    });
};

module.exports = {
  name: 'securityAudit',
  info: 'Run `yarn audit` and output results',
  run,
};
