import path from 'path';
import React from 'react';
import Pathline from 'react-styleguidist/lib/rsg-components/Pathline';
import { Card } from 'z-frontend-layout';
import DocEditLink from './DocEditLink';
import { styled } from 'z-frontend-theme';
import { space, color } from 'z-frontend-theme/utils';

interface ReactComponentProps {
  name: string;
  heading: React.ReactNode;
  filepath?: string;
  pathLine?: string;
  tabButtons?: React.ReactNode;
  tabBody?: React.ReactNode;
  description?: React.ReactNode;
  docs?: React.ReactNode;
  examples?: React.ReactNode;
  isolated?: boolean;
}

const StyledPropsDetails = styled.details`
  cursor: pointer;

  > summary {
    margin-bottom: 10px;
  }
`;

const StyledPropsTable = styled.div`
  padding: ${space(3)};
  background-color: ${color('grayscale.f', 0.3)};
  margin-bottom: ${space(3)};

  table {
    margin: 0;
  }
`;

function getImportPath(componentPath) {
  const extension = path.extname(componentPath);
  const componentName = path.basename(componentPath).replace(extension, '');

  const directory = path.dirname(componentPath);
  const packageName = directory.includes('zbase')
    ? 'zbase'
    : directory.replace(/^.*components\/(\w+)\/.*$/, 'z-frontend-$1');
  return `import { ${componentName} } from '${packageName}';`;
}

// override default to put everything in a Card and use <details> for props
class ReactComponentRenderer extends React.Component<ReactComponentProps> {
  render() {
    const { name, heading, pathLine, filepath, description, docs, examples, tabButtons, tabBody } = this.props;
    const importPath = getImportPath(pathLine);
    return (
      <Card mt={3} id={name + '-container'}>
        <Card.Header>
          <DocEditLink name={name} path={filepath} />
          {heading}
          {importPath && <Pathline>{importPath}</Pathline>}
        </Card.Header>
        <Card.Row>
          {(description || docs) && (
            // inline docgen
            <div className="zsg-docs">
              {description}
              {docs}
            </div>
          )}
          {/* TODO: hide props table entirely if no props documented */}
          {tabButtons && (
            // Props & methods button
            <div className="zsg-tabs">
              <StyledPropsDetails>
                <summary>Props</summary> {/* NOTE: replacing {tabButtons} */}
                <StyledPropsTable>{tabBody}</StyledPropsTable>
              </StyledPropsDetails>
            </div>
          )}
          {examples}
        </Card.Row>
      </Card>
    );
  }
}

export default ReactComponentRenderer;
