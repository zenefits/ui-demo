const findUp = require('find-up');
const path = require('path');
const { spawn } = require('child_process');
const chalk = require('chalk');

const parseStringArg = arg => arg.replace(/^('|")/, '').replace(/('|")$/, '');
const program = require('commander');

const repoRoot = path.resolve(__dirname, '../../../../');

const parseArgs = () => {
  program
    .usage('yarn zcli runForStagedFiles [--script <scriptName>] <file1> [<file2 ...]')
    .option('--script <script>', 'script to run (required)', parseStringArg)
    .option('--pass-files-to-script', 'specify if files should be passed as args to script');

  program.parse(process.argv.slice(1));

  const { script, passFilesToScript, args: files } = program;

  if (!script || files.length === 0) {
    program.outputHelp();
    throw !script ? new Error('No script argument provided.') : new Error('No file arguments provided.');
  }

  return { script, passFilesToScript, files };
};

const findPackagesWithScript = (files, scriptName) =>
  files
    .map(packageJsonPath => ({
      path: packageJsonPath,
      config: require(packageJsonPath), // eslint-disable-line
    }))
    .filter(d => d.config.scripts && d.config.scripts[scriptName])
    .map(d => d.path);

const createFilePackagesMap = (files, packageJsonPaths) =>
  packageJsonPaths.reduce((acc, packageJsonPath, i) => {
    if (!acc[packageJsonPath]) {
      acc[packageJsonPath] = [];
    }
    acc[packageJsonPath].push(files[i]);
    return acc;
  }, {});

const getAffectedPackages = async (files, script) => {
  const packageJsonPaths = await Promise.all(files.map(file => findUp('package.json', { cwd: path.dirname(file) })));
  const filesMap = createFilePackagesMap(files, packageJsonPaths);
  const affectedPackages = findPackagesWithScript(Object.keys(filesMap), script.split(' ')[0]);
  return { filesMap, affectedPackages };
};

const run = async () => {
  const { script, passFilesToScript, files } = parseArgs();

  const errors = [];

  try {
    const { affectedPackages, filesMap } = await getAffectedPackages(files, script);

    if (affectedPackages.length === 0) {
      process.exit(0);
    }

    await Promise.all(
      affectedPackages.map(packageJsonPath => {
        const passedFiles = passFilesToScript ? filesMap[packageJsonPath] : [];

        let outputLog = '';
        console.log('!!!!!!!!!', { packageJsonPath, script });
        return new Promise(resolve => {
          const cp = spawn('yarn', ['run', ...script.split(/\s/), ...passedFiles], {
            cwd: path.dirname(packageJsonPath),
            detached: true,
          });
          cp.stderr.on('data', d => {
            outputLog += d.toString();
          });
          cp.stdout.on('data', d => {
            outputLog += d.toString();
          });
          cp.on('exit', code => {
            if (code !== 0) {
              errors.push({
                packageJsonPath,
                output: outputLog,
                scriptName: script,
              });
            }
            resolve();
          });
        });
      }),
    );
  } catch (e) {
    console.log(e);
    process.exit(1);
  }

  if (errors.length) {
    console.log(
      errors
        .map(({ output, packageJsonPath, scriptName }) => {
          const pkgPath = chalk`{yellow.bold ${path.dirname(path.relative(repoRoot, packageJsonPath))}}`;
          const scriptStr = chalk`{yellow.bold yarn ${scriptName}}`;
          return [
            chalk`{red ==================================================================================}\n`,
            chalk`{red =================}`,
            ` ERROR in ${pkgPath} running "${scriptStr}" `,
            chalk`{red =================}`,
            `\n${output}`,
            chalk`{red ==================================================================================}\n`,
          ].join('');
        })
        .join('\n\n'),
    );
    process.exit(1);
  }
};

module.exports = {
  name: 'runForStagedFiles',
  info: '',
  run,
};
