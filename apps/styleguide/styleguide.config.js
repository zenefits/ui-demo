const path = require('path');
const { withCustomConfig } = require('react-docgen-typescript');
const {
  componentExportsMap,
  getComponentPathsFromPackageIndex,
  getPathFromPackage,
  loadExternalExamples,
  componentStatus,
  renameSubComponent,
} = require('./config/styleguideHelpers');

const propsParserOptions = {
  // propFilter: {
  //   skipPropsWithoutDoc: true,
  //   skipPropsWithName
  // },
  propFilter: props => {
    // console.log(component.name, props.name, props.description, props.type.name);
    const isAriaProp = props.name.startsWith('aria-'); // too many to show
    return !isAriaProp;
  },
  savePropValueAsString: true, // see https://github.com/styleguidist/react-styleguidist/issues/1439
};

// for guides and examples for other components
// after v9, RSG only puts current component in scope
// do not put everything in context to avoid errors like `SyntaxError: Identifier 'Table' has already been declared`
const componentsNeededGlobally = [
  'Box',
  'Button',
  'Card',
  'Form',
  'Flex',
  'Icon',
  'NumberText',
  'Render',
  'Table',
  'TextBlock',
  'TextInline',
];

function getExampleContext() {
  const map = Object.keys(componentStatus).reduce((memo, key) => {
    if (componentsNeededGlobally.includes(key)) {
      memo[key] = componentStatus[key].path; // eslint-disable-line no-param-reassign
    }
    return memo;
  }, {});
  return {
    ...map,
    ComponentStatus: require.resolve('./src/examples/ComponentStatus.tsx'),
    ColorGuide: require.resolve('./src/examples/ColorGuide.tsx'),
    IconGuide: require.resolve('./src/examples/IconGuide.tsx'),
    TypographyGuide: require.resolve('./src/examples/TypographyGuide.tsx'),
    ButtonGuide: require.resolve('./src/examples/ButtonGuide.tsx'),
    SpacingGuide: require.resolve('./src/examples/SpacingGuide.tsx'),
    BreakpointGuide: require.resolve('./src/examples/BreakpointGuide.tsx'),
    DepthGuide: require.resolve('./src/examples/DepthGuide.tsx'),
  };
}

const components = {
  bootstrap: getComponentPathsFromPackageIndex('z-frontend-app-bootstrap'),
  charts: getComponentPathsFromPackageIndex('z-frontend-charts'),
  chat: getComponentPathsFromPackageIndex('z-frontend-chat'),
  composites: getComponentPathsFromPackageIndex('z-frontend-composites'),
  dataManager: getComponentPathsFromPackageIndex('z-frontend-data-manager'),
  dragAndDrop: getComponentPathsFromPackageIndex('z-frontend-drag-and-drop'),
  elements: getComponentPathsFromPackageIndex('z-frontend-elements'),
  forms: getComponentPathsFromPackageIndex('z-frontend-forms'),
  layout: getComponentPathsFromPackageIndex('z-frontend-layout'),
  network: getComponentPathsFromPackageIndex('z-frontend-network'),
  overlays: getComponentPathsFromPackageIndex('z-frontend-overlays'),
  tables: getComponentPathsFromPackageIndex('z-frontend-tables'),
  theme: getComponentPathsFromPackageIndex('z-frontend-theme'),
  zbase: getComponentPathsFromPackageIndex('zbase'),
};

// so examples do not need to explicitly import common packages
// note: this must come after creating `components` map
const exampleContext = getExampleContext();

module.exports = {
  title: 'Design System | Zenefits',
  propsParser(filePath, source, resolver, handlers) {
    // react-docgen-typescript blocks the use of a custom resolver. See here https://github.com/styleguidist/react-styleguidist/issues/837
    const result = withCustomConfig('./tsconfig.json', propsParserOptions).parse(filePath, source, resolver, handlers);
    // if there are multiple components per file, only show appropriate props
    if (result.length > 1) {
      const fileSubString = `./src${filePath.split('src')[1].replace('.tsx', '')}`;
      if (fileSubString in componentExportsMap) {
        const exportedMods = componentExportsMap[fileSubString];
        const isDefaultExport = exportedMods.indexOf('default');
        if (isDefaultExport > -1 && isDefaultExport + 1 < exportedMods.length) {
          const compToExport = exportedMods[isDefaultExport + 1];
          return result.filter(val => val.displayName === compToExport);
        }
        const filtered = result.filter(val => exportedMods.includes(val.displayName));
        if (filtered.length > 0) {
          return filtered;
        }
      }
    }
    return result;
  },
  ignore: ['**/*.test.{js,jsx,ts,tsx}', '**/*.stories.{js,jsx,ts,tsx}'],
  require: [path.resolve(__dirname, 'src/setup.ts')],
  context: exampleContext,
  showUsage: true,
  pagePerSection: true,
  styleguideDir: 'dist', // build directory
  template: {
    title: 'Design System | Zenefits',
    favicon:
      'https://zenefits.imgix.net/12f0f2cd0af6d3b7017a0f1e6c1b9ad0205eb96e/static/marketing2017/images/icons/ZEN_Favicon_32.png?auto=compress,format',
    head: {
      raw: `<script type="text/javascript">
      window.heap=window.heap||[],heap.load=function(e,t){window.heap.appid=e,window.heap.config=t=t||{};var r=t.forceSSL||"https:"===document.location.protocol,a=document.createElement("script");a.type="text/javascript",a.async=!0,a.src=(r?"https:":"http:")+"//cdn.heapanalytics.com/js/heap-"+e+".js";var n=document.getElementsByTagName("script")[0];n.parentNode.insertBefore(a,n);for(var o=function(e){return function(){heap.push([e].concat(Array.prototype.slice.call(arguments,0)))}},p=["addEventProperties","addUserProperties","clearEventProperties","identify","resetIdentity","removeEventProperty","setEventProperties","track","unsetEventProperty"],c=0;c<p.length;c++)heap[p[c]]=o(p[c])};

      var appId = window.location.hostname === 'ui.zenefits.com' ? '1291113735' : '33225357';
      heap.load(appId);
    </script>`,
    },
  },
  updateExample: loadExternalExamples, // TODO: remove this once we switch all .md files away from using `loadExample`
  updateDocs(docs) {
    // show sub-components correctly in docs
    docs.displayName = renameSubComponent(docs.displayName);
    return docs;
  },
  sections: [
    {
      name: 'Introduction',
      sections: [
        {
          name: 'Getting Started',
          content: '../../docs/getting-started.md',
        },
        {
          name: 'Voice and Tone',
          content: '../../docs/voice.md',
        },
        {
          name: 'Examples',
          content: '../../docs/examples.md',
        },
        {
          name: 'Component Status',
          content: './docs/component-status.md',
        },
      ],
      sectionDepth: 0,
    },
    {
      name: 'Guides',
      sections: [
        {
          name: 'Component Best Practices',
          content: '../../docs/component.md',
        },
        {
          name: 'Coding Conventions',
          content: '../../docs/coding-conventions.md',
        },
        {
          name: 'Design System Proposals',
          content: '../../docs/design-system-proposals.md',
        },
        {
          name: 'Ember-React Integration',
          content: '../../docs/ember-react-integration.md',
        },
        {
          name: 'FAQs',
          content: '../../docs/faqs.md',
        },
        {
          name: "Development Dos and Don'ts",
          content: '../../docs/development-dos-and-donts.md',
        },
        {
          name: 'Select Components',
          content: '../../docs/select-guide.md',
        },
        {
          name: 'Storybook Best Practices',
          content: '../../docs/storybook.md',
        },
        {
          name: 'Deprecating Components',
          content: '../../docs/deprecation.md',
        },
        {
          name: 'Testing',
          sections: [
            {
              name: 'Intro',
              content: '../../docs/testing.md',
            },
            {
              name: 'Cypress',
              content: '../../docs/cypress.md',
            },
            {
              name: 'Cross Browser Testing',
              content: '../../docs/cross-browser-testing.md',
            },
          ],
        },
        {
          name: 'UIP SLAs',
          content: '../../docs/uip-slas.md',
        },
      ],
      sectionDepth: 1,
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
        {
          name: 'Responsiveness',
          content: './docs/responsiveness.md',
        },
        {
          name: 'Depth',
          content: './docs/depth.md',
        },
      ],
      sectionDepth: 1,
    },
    {
      name: 'Components',
      sections: [
        {
          name: 'Chat',
          components: () => components.chat,
        },
        {
          name: 'Charts',
          components: () => components.charts,
        },
        {
          name: 'Composites',
          components: () => components.composites,
        },
        {
          name: 'Data Manager',
          components: () => components.dataManager,
        },
        {
          name: 'Drag and Drop',
          components: () => components.dragAndDrop,
        },
        {
          name: 'Elements',
          components: () => components.elements,
        },
        {
          name: 'Forms',
          components: () => components.forms,
        },
        {
          name: 'Layout',
          components: () => components.layout,
        },
        {
          name: 'Overlays',
          components: () => components.overlays,
        },
        {
          name: 'Network',
          components: () => components.network,
        },
        {
          name: 'Tables',
          components: () => components.tables,
        },
        {
          name: 'Theme',
          components: () => components.theme,
        },
        {
          name: 'Utilities',
          components: () => components.bootstrap,
        },
        {
          name: 'Zbase',
          content: getPathFromPackage('zbase', './docs/intro.md'),
          components: () => components.zbase,
        },
      ],
      sectionDepth: 2,
    },
  ],
  // allow template strings inside examples https://github.com/styleguidist/react-styleguidist/issues/720
  compilerConfig: {
    transforms: {
      dangerousTaggedTemplateString: true,
    },
  },
  // match theme fonts
  theme: {
    fontFamily: {
      base: ['"Circular"', 'sans-serif'],
      monospace: ['monospace'], // more consistent sizing relative to Circular
    },
    color: {
      name: '#155457', // auxiliary.b
      type: '#4E2E5E', // auxiliary.a
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
  styleguideComponents: {
    Wrapper: path.join(__dirname, 'src/Wrapper'),
    StyleGuideRenderer: path.join(__dirname, 'src/components/StyleGuideRenderer'),
    ComponentsList: path.join(__dirname, 'src/components/ComponentsList'),
    TableOfContentsRenderer: path.join(__dirname, 'src/components/TableOfContentsRenderer'),
    LinkRenderer: path.join(__dirname, 'src/components/LinkRenderer'),
    SectionHeadingRenderer: path.join(__dirname, 'src/components/SectionHeadingRenderer'),
    SectionRenderer: path.join(__dirname, 'src/components/SectionRenderer'),
    ReactComponentRenderer: path.join(__dirname, 'src/components/ReactComponentRenderer'),
    TableRenderer: path.join(__dirname, 'src/components/TableRenderer'),
    PlaygroundRenderer: path.join(__dirname, 'src/components/PlaygroundRenderer'),
  },
};
