declare type WebpackRequire = {
  context: any;
} & NodeRequire;

export default function(schemaDir) {
  if (__CLIENT__) {
    const schemaContext = (require as WebpackRequire).context(
      `../../../apps/${__APP_NAME__}/schema/`,
      true,
      /^\.\/.*\.graphql$/,
    );
    return schemaContext.keys().map(schemaContext);
  } else {
    const fs = require('fs');
    const glob = require('glob');
    const pattern = './**/*.graphql';
    const fileNames = glob.sync(pattern, { cwd: schemaDir, absolute: true });
    return fileNames.map(f => String(fs.readFileSync(f)));
  }
}
