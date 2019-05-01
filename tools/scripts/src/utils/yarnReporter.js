const chalk = require('chalk');
const Table = require('cli-table3');

const errorColors = {
  warning: chalk.yellow,
  error: chalk.red,
};

function logError(error) {
  const color = errorColors[error.type] || chalk.blue;
  console.log(`${color(error.type)}: ${error.data}`);
}

const auditSeverityColors = {
  info: chalk.bold,
  low: chalk.bold,
  moderate: chalk.yellow,
  high: chalk.red,
  critical: chalk.bgRed,
};

function logAdvisory(auditAdvisory, maxPaths = 5) {
  function colorSeverity(severity) {
    return auditSeverityColors[severity](severity);
  }

  function makeAdvisoryTableRow(patchedIn) {
    const patchRows = [];

    if (patchedIn) {
      patchRows.push(['Patched in', patchedIn]);
    }

    // rowspan where a single advisory has multiple paths
    const pathsRowSpan =
      auditAdvisory.paths.length === maxPaths ? maxPaths : Math.min(auditAdvisory.paths.length, maxPaths + 1);

    let paths = [[{ content: 'Paths', rowSpan: pathsRowSpan }, auditAdvisory.paths[0].split('>').join(' > ')]];
    paths = [...paths, ...auditAdvisory.paths.slice(1, maxPaths).map(path => [path.split('>').join(' > ')])];

    if (auditAdvisory.paths.length > maxPaths) {
      paths.push([`...${auditAdvisory.paths.length - maxPaths} more`]);
    }
    return [
      [chalk.bold(colorSeverity(auditAdvisory.advisory.severity)), chalk.bold(auditAdvisory.advisory.title)],
      ['Package:', auditAdvisory.advisory.module_name],
      ...patchRows,
      ['Dependency of:', auditAdvisory.dependecyOf],
      ...paths,
      ['More info:', `https://nodesecurity.io/advisories/${auditAdvisory.advisory.id}`],
    ];
  }

  const tableOptions = {
    colWidths: [15, 62],
    wordWrap: true,
  };
  const table = new Table(tableOptions);
  const patchedIn =
    auditAdvisory.advisory.patched_versions.replace(' ', '') === '<0.0.0'
      ? 'No patch available'
      : auditAdvisory.advisory.patched_versions;
  table.push(...makeAdvisoryTableRow(patchedIn));
  console.log(table.toString());
}

function logAuditSummary(auditSummary) {
  const totalVulnerabilities =
    auditSummary.info + auditSummary.low + auditSummary.moderate + auditSummary.high + auditSummary.critical;
  const summary = `${
    totalVulnerabilities > 0 ? chalk.red(totalVulnerabilities) : totalVulnerabilities
  } vulnerabilities found`;
  console.log(summary);

  if (totalVulnerabilities) {
    const severities = [];
    if (auditSummary.info) {
      severities.push(`${auditSummary.info} Info`);
    }
    if (auditSummary.low) {
      severities.push(`${auditSummary.low} Low`);
    }
    if (auditSummary.moderate) {
      severities.push(`${auditSummary.moderate} Moderate`);
    }
    if (auditSummary.high) {
      severities.push(`${auditSummary.high} High`);
    }
    if (auditSummary.critical) {
      severities.push(`${auditSummary.critical} Critical`);
    }
    console.log(`Severity: ${severities.join(' | ')}`);
  }
}

module.exports = {
  logAdvisory,
  logAuditSummary,
  logError,
};
