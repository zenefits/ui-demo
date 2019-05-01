const { spawnSync } = require('child_process');

module.exports = function getHeadCommit(repoPath, useShortSHA) {
  const args = ['rev-parse'];
  if (useShortSHA) {
    args.push('--short');
  }
  args.push('HEAD');

  const headSha = spawnSync('git', args, { cwd: repoPath }).stdout.toString();
  return headSha.trim();
};
