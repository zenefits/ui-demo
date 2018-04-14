const path = require('path');
const styleguideHelpers = require('./config/styleguideHelpers');

function getPathFromPackage(packageName, relativePath) {
  const dir = path.dirname(require.resolve(packageName));
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
            getPathFromPackage('zbase', './src/web/p/P.tsx'),
            getPathFromPackage('zbase', './src/web/text/Text.tsx'),
            getPathFromPackage('zbase', './src/web/plural-text/PluralText.tsx'),
            getPathFromPackage('zbase', './src/web/date-text/DateText.tsx'),
            getPathFromPackage('zbase', './src/web/time-text/TimeText.tsx'),
            getPathFromPackage('zbase', './src/web/date-time-text/DateTimeText.tsx'),
            getPathFromPackage('zbase', './src/web/relative-text/RelativeText.tsx'),
            getPathFromPackage('zbase', './src/web/number-text/NumberText.tsx'),
          ],
        },
        {
          name: 'Text handling',
          components: () => [
            getPathFromPackage('z-frontend-text', './src/obscure/Obscure.tsx'),
            getPathFromPackage('z-frontend-text', './src/obscure-toggle/ObscureToggle.tsx'),
          ],
        },
      ],
      components: () => [
        getPathFromPackage('zbase', './src/web/box/Box.ts'),
        getPathFromPackage('zbase', './src/web/flex/Flex.ts'),
        getPathFromPackage('zbase', './src/web/heading/Heading.tsx'),
        getPathFromPackage('zbase', './src/web/badge/Badge.tsx'),
        getPathFromPackage('zbase', './src/web/image/Image.ts'),
        getPathFromPackage('zbase', './src/web/icon/Icon.tsx'),
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
        getPathFromPackage('z-frontend-layout', './src/loading-screen/LoadingScreen.tsx'),
        getPathFromPackage('z-frontend-tables', './src/Table.tsx'),
      ],
    },
    {
      name: 'Layout',
      // TODO: list
      components: () => [
        getPathFromPackage('z-frontend-layout', './src/card/Card.tsx'),
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
        {
          name: 'UIP SLAs',
          content: '../../docs/uip-slas.md',
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
