const fs = require('fs');
const getConfig = require('react-styleguidist/scripts/config'); // eslint-disable-line import/no-extraneous-dependencies

function validateConfigSection(config) {
  if (config.content) {
    if (!fs.existsSync(config.content)) {
      throw new Error(`no style guide content found at path ${config.content} for section ${config.name}`);
    }
  }
  if (config.components) {
    const componentPaths = config.components();
    componentPaths.forEach(componentPath => {
      if (!fs.existsSync(componentPath)) {
        throw new Error(`no style guide component found at path ${componentPath} for section ${config.name}`);
      }
    });
  }

  if (config.sections) {
    config.sections.map(validateConfigSection);
  }
}

try {
  const config = getConfig(); // validates config only contains known properties etc
  config.sections.map(validateConfigSection);
} catch (err) {
  console.error(err);
  process.exit(1);
}
