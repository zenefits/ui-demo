// usage: `yarn buildDependencyGraph` to output DOT file for use in graphviz
// if you have graphviz installed locally, you can use `yarn buildDependencyGraph:png` to output a file
// or just paste the output to eg https://dreampuf.github.io/GraphvizOnline

// @ts-check

const { getAllPackageJsonFiles } = require('z-frontend-scripts');
const flatten = require('lodash/flatten');

const levels = ['layouts', 'composites']; // skip tool, elements, attributes (too noisy)
// highlight layout level with different background color
const levelColorMap = {
  layouts: '#dddddd',
};
const warningColor = '#C00316'; // negation.a
const newline = '\n  ';

const packageJsonFiles = getAllPackageJsonFiles();
const packages = packageJsonFiles.filter(file => levels.includes(file.json.zenefits.level)).map(file => file.json);

// step 1: create the nodes in clusters
const clusteredPackages = packages.reduce((memo, pkg) => {
  const level = pkg.zenefits.level;
  if (!memo[level]) {
    memo[level] = [];
  }
  memo[level].push(pkg.name);
  return memo;
}, {});
const clusters = Object.keys(clusteredPackages).map(key =>
  buildCluster(key, clusteredPackages[key], levelColorMap[key]),
);

// step 2: build edges between packages
const packageToLevelMap = packages.reduce((memo, pkg) => {
  memo[pkg.name] = pkg.zenefits.level;
  return memo;
}, {});
const edges = flatten(
  packages.map(pkg => {
    if (!pkg.dependencies) {
      return;
    }
    return Object.keys(pkg.dependencies)
      .map(depName => {
        if (!packages.find(p => p.name === depName)) {
          return;
        }

        const isUpwardDependency =
          levels.indexOf(packageToLevelMap[pkg.name]) > levels.indexOf(packageToLevelMap[depName]);
        const attrs = isUpwardDependency ? [`color="${warningColor}"`, 'style="dashed"'] : null;

        return buildGraphEdge(pkg.name, depName, attrs);
      })
      .filter(Boolean);
  }),
);

const graphContent = [clusters.join(newline), edges.join(newline)].join(newline);
const graph = buildComponentsGraph(graphContent);
console.log(graph);

// below is a minimal DOT file generator for creating files read by graphviz
// https://www.graphviz.org/documentation
// there are node packages for this, but not well maintained and it's not that complicated

function buildCluster(name, nodeList, color) {
  // note: clusters must begin with "cluster", otherwise just a subgraph
  return `subgraph cluster_${name} {
    ${color ? `node [style="filled", color="black", fillcolor="${color}"];\n` : ''}
    ${nodeList.map(node => `"${node}";`).join('\n    ')}
  }\n`;
}

function buildGraphEdge(from, to, attrs) {
  return `"${from}" -> "${to}"${attrs ? ` [${attrs.join(', ')}]` : ''};`;
}

function buildComponentsGraph(content) {
  return `digraph G {
  graph [label="z-frontend components\\n\\n", labelloc="t", fontcolor="#FF5745", fontsize=32];
  node [shape="box"];
  layout="circo"; // too hard to read with other layouts

  ${content}
}`;
}
