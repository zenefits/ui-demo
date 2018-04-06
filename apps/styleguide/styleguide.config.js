const path = require('path');
const styleguideHelpers = require('./config/styleguideHelpers');

function getPathFromPackage(package, relativePath) {
  const dir = path.dirname(require.resolve(package));
  return path.resolve(dir, relativePath);
}

const propsParserOptions = {
  propFilter: {
    skipPropsWithoutDoc: true,
  },
  // if we need more control:
  // propFilter: (props, component) => {
  //   // console.log(component.name, props.name, props.description, props.type.name);
  //   return props.description.length !== 0;
  // },
};

module.exports = {
  title: 'Style Guide | Zenefits',
  propsParser: require('react-docgen-typescript').withCustomConfig('./tsconfig.json', propsParserOptions).parse,
  ignore: ['**/*.test.{js,jsx,ts,tsx}', '**/*.stories.{js,jsx,ts,tsx}'],
  require: [path.resolve(__dirname, 'src/setup.ts')],
  showUsage: true,
  styleguideDir: 'dist', // build directory
  template: 'src/template/index.html',
  updateExample: styleguideHelpers.loadExternalExamples,
  sections: [
    {
      name: 'Introduction',
      sections: [
        {
          name: 'Getting started',
          content: '../../docs/getting-started.md',
        },
        // {
        //   name: 'Voice and tone',
        //   content: '../../docs/voice.md',
        // },
      ],
    },
    {
      name: 'Attributes',
      sections: [
        {
          name: 'Color',
          content: './docs/color.md',
        },
        {
          name: 'Typography',
          content: './docs/typography.md',
        },
        {
          name: 'Grid',
          content: getPathFromPackage('zbase', './docs/grid.md'),
        },
        {
          name: 'Spacing',
          content: getPathFromPackage('zbase', './docs/spacing.md'),
        },
      ],
    },
    {
      name: 'Elements',
      // TODO: inputs
      sections: [
        {
          name: 'Text content',
          components: () => [
            getPathFromPackage('zbase', './src/web/P.tsx'),
            getPathFromPackage('zbase', './src/web/Text.tsx'),
            getPathFromPackage('zbase', './src/web/PluralText.tsx'),
            getPathFromPackage('zbase', './src/web/DateText.tsx'),
            getPathFromPackage('zbase', './src/web/TimeText.tsx'),
            getPathFromPackage('zbase', './src/web/DateTimeText.tsx'),
            getPathFromPackage('zbase', './src/web/RelativeText.tsx'),
            getPathFromPackage('zbase', './src/web/NumberText.tsx'),
          ],
        },
      ],
      components: () => [
        getPathFromPackage('zbase', './src/web/Box.ts'),
        getPathFromPackage('zbase', './src/web/Flex.ts'),
        getPathFromPackage('zbase', './src/web/Heading.tsx'),
        getPathFromPackage('zbase', './src/web/Badge.tsx'),
        getPathFromPackage('zbase', './src/web/Image.ts'),
        getPathFromPackage('z-frontend-forms', './src/Link.tsx'),
      ],
    },
    {
      name: 'Composites',
      // pagination, calendar, sidenav, popover, list-parts, form components
      components: () => [
        getPathFromPackage('z-frontend-forms', './src/Avatar.tsx'),
        getPathFromPackage('z-frontend-forms', './src/Button.tsx'),
        getPathFromPackage('z-frontend-forms', './src/Checkbox.tsx'),
        getPathFromPackage('z-frontend-layout', './src/LoadingScreen.tsx'),
        getPathFromPackage('z-frontend-tables', './src/Table.tsx'),
      ],
    },
    {
      name: 'Layout',
      // TODO: list
      components: () => [
        getPathFromPackage('z-frontend-layout', './src/Card.tsx'),
        // getPathFromPackage('z-frontend-forms', './src/Form.tsx'),
      ],
    },
    // TODO: patterns: wizard
    {
      name: 'Guides',
      sections: [
        {
          name: 'Testing',
          content: '../../docs/testing.md',
        },
      ],
    },
  ],
  // match theme fonts
  theme: {
    fontFamily: {
      base: ['"Circular", sans-serif'],
    },
    fontSize: {
      base: 14,
      text: 14,
      small: 12,
      h1: 48,
      h2: 32,
      h3: 24,
      h4: 19,
      h5: 16,
      h6: 16,
    },
  },
  // getComponentPathLine(componentPath) {
  //   return componentPath;
  // },
  styles: {
    Markdown: {
      code: {
        cursor: 'inherit',
        fontSize: 13, // default font size is way too large
      },
    },
    Table: {
      cell: {
        '& p': {
          margin: 0,
        },
        '& code': {
          fontSize: 'inherit',
        },
      },
    },
  },
  styleguideComponents: {
    Wrapper: path.join(__dirname, 'src/Wrapper'),
    StyleGuideRenderer: path.join(__dirname, 'src/components/StyleGuideRenderer'),
    TableOfContentsRenderer: path.join(__dirname, 'src/components/TableOfContentsRenderer'),
    LinkRenderer: path.join(__dirname, 'src/components/LinkRenderer'),
    SectionHeadingRenderer: path.join(__dirname, 'src/components/SectionHeadingRenderer'),
    SectionRenderer: path.join(__dirname, 'src/components/SectionRenderer'),
    ReactComponentRenderer: path.join(__dirname, 'src/components/ReactComponentRenderer'),
  },
};
