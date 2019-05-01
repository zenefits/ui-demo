const path = require('path');
const {
  componentExportsMap,
  getComponentPathsFromPackageIndex,
  getPathFromPackage,
  loadExternalExamples,
} = require('./config/styleguideHelpers');
const { withCustomConfig } = require('react-docgen-typescript');

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
};

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
    // TODO: why is manual displayName on component not recognized?
    if (/^Form[A-Z]/.test(docs.displayName)) {
      // eslint-disable-next-line no-param-reassign
      docs.displayName = docs.displayName.replace(/^Form/, 'Form.');
    } else if (/^Chart[A-Z]/.test(docs.displayName)) {
      // eslint-disable-next-line no-param-reassign
      docs.displayName = docs.displayName.replace(/^Chart/, 'Chart.');
    } else if (/^Table[A-Z]/.test(docs.displayName)) {
      // eslint-disable-next-line no-param-reassign
      docs.displayName = docs.displayName.replace(/^Table/, 'Table.');
    }
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
    },
    {
      name: 'Guides',
      sections: [
        {
          name: 'Component Best Practices',
          content: '../../docs/component.md',
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
              content: '../../docs/vm.md',
            },
          ],
        },
        {
          name: 'UIP SLAs',
          content: '../../docs/uip-slas.md',
        },
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
        {
          name: 'Responsiveness',
          content: './docs/responsiveness.md',
        },
        {
          name: 'Depth',
          content: './docs/depth.md',
        },
      ],
    },
    {
      name: 'Components',
      sections: [
        {
          name: 'Chat',
          components: () => getComponentPathsFromPackageIndex('z-frontend-chat'),
        },
        {
          name: 'Charts',
          components: () => getComponentPathsFromPackageIndex('z-frontend-charts'),
        },
        {
          name: 'Composites',
          components: () => getComponentPathsFromPackageIndex('z-frontend-composites'),
        },
        {
          name: 'Data Manager',
          components: () => getComponentPathsFromPackageIndex('z-frontend-data-manager'),
        },
        {
          name: 'Drag and Drop',
          components: () => getComponentPathsFromPackageIndex('z-frontend-drag-and-drop'),
        },
        {
          name: 'Elements',
          components: () => getComponentPathsFromPackageIndex('z-frontend-elements'),
        },
        {
          name: 'Forms',
          components: () => getComponentPathsFromPackageIndex('z-frontend-forms'),
        },
        {
          name: 'Layout',
          components: () => getComponentPathsFromPackageIndex('z-frontend-layout'),
        },
        {
          name: 'Overlays',
          components: () => getComponentPathsFromPackageIndex('z-frontend-overlays'),
        },
        {
          name: 'Tables',
          components: () => getComponentPathsFromPackageIndex('z-frontend-tables'),
        },
        {
          name: 'Theme',
          components: () => getComponentPathsFromPackageIndex('z-frontend-theme'),
        },
        {
          name: 'Utilities',
          components: () => getComponentPathsFromPackageIndex('z-frontend-app-bootstrap'),
        },
        {
          name: 'Zbase',
          content: getPathFromPackage('zbase', './docs/intro.md'),
          components: () => getComponentPathsFromPackageIndex('zbase'),
        },
      ],
    },
  ],
  editorConfig: {
    theme: 'monokai', // default of base16-light has low contrast
  },
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
    TableOfContentsRenderer: path.join(__dirname, 'src/components/TableOfContentsRenderer'),
    LinkRenderer: path.join(__dirname, 'src/components/LinkRenderer'),
    SectionHeadingRenderer: path.join(__dirname, 'src/components/SectionHeadingRenderer'),
    SectionRenderer: path.join(__dirname, 'src/components/SectionRenderer'),
    ReactComponentRenderer: path.join(__dirname, 'src/components/ReactComponentRenderer'),
    TableRenderer: path.join(__dirname, 'src/components/TableRenderer'),
    PlaygroundRenderer: path.join(__dirname, 'src/components/PlaygroundRenderer'),
  },
  // Styleguidist puts all components in the global namespace, this causes an issue with heap-analytics since it overrides default window.Image
  dangerouslyUpdateWebpackConfig(webpackConfig) {
    webpackConfig.entry.push(path.join(__dirname, 'src/monkeyPatchImage'));
    return webpackConfig;
  },
};
