const { execSync } = require('child_process');
const readline = require('readline');
// @ts-ignore
const chalk = require('chalk');

function openPullRequestLinksInBrowser(gitLog) {
  gitLog.forEach(line => {
    const matched = line.match(/Merge pull request #(\d+)/);
    if (!matched) {
      return;
    }
    const pr = matched[1];
    const link = `https://github.com/zenefits/z-frontend/pull/${pr}`;
    execSync(`open ${link}`);
  });
}

const run = sinceDate => {
  if (!sinceDate) {
    throw new Error('sinceDate must be provided (eg 2018-09-20)');
  }

  const gitLog = execSync(
    `git log --since="${sinceDate} 00:00" --grep "Merge pull request" --pretty=oneline --reverse ./components ./docs ./tools`,
  )
    .toString()
    .trim()
    .split('\n');

  console.log(`Found ${chalk.green(gitLog.length)} PRs in relevant directories`);
  console.log(`Review for changes to announce via https://github.com/zenefits/z-frontend/wiki/Changelog`);

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const affirmativeAnswers = ['y', 'yes'];

  rl.question('Ready to open all PRs in your default browser? ', answer => {
    if (answer && affirmativeAnswers.includes(answer.toLowerCase())) {
      console.log('Here we go!');
      openPullRequestLinksInBrowser(gitLog);
    }
    rl.close();
  });
};

module.exports = { name: 'changelog', info: 'Helps to create a UIP changelog', run };
