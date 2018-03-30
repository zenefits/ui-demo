// @ts-check

const fs = require('fs');
const path = require('path');
const replaceEnvVars = require('./utils/replaceEnvVars');
const { removeCommentLine } = require('./utils/removeCommentLine');

let src = fs.readFileSync(path.join(process.cwd(), 'globals.js')).toString();

src = removeCommentLine(src);
src = replaceEnvVars(src);

fs.writeFileSync(path.join(process.cwd(), 'globals-processed.js'), src);
