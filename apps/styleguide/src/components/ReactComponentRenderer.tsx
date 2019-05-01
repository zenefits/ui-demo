import React, { Component } from 'react';
import Pathline from 'react-styleguidist/lib/rsg-components/Pathline';

import { Card } from 'z-frontend-composites';
import { styled } from 'z-frontend-theme';
import { fontSizes, space } from 'z-frontend-theme/utils';
import { Box, Flex, Icon, Image } from 'zbase';
import { Button } from 'z-frontend-elements';

import DocEditLink from './DocEditLink';
import { getImportPath, getStorybookLiveLink } from './rendererHelpers';

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

  summary:focus {
    outline: none;
  }
`;

const StyledPropsTable = styled.div`
  margin-bottom: ${space(4)};
  margin-top: ${space(4)};

  table {
    margin: 0;
  }

  table * {
    word-break: break-word;
    font-size: ${fontSizes(1)}; /* force code snippets to consistent size */
  }
`;

// override default to put everything in a Card and use <details> for props
// https://github.com/styleguidist/react-styleguidist/blob/master/src/rsg-components/ReactComponent/ReactComponentRenderer.js
class ReactComponentRenderer extends Component<ReactComponentProps> {
  render() {
    const { name, heading, pathLine, filepath, description, docs, examples, tabButtons, tabBody } = this.props;
    const importPath = getImportPath(pathLine, name);

    const githubLink = `https://github.com/zenefits/z-frontend/blob/master/${filepath.replace(
      /.*components/,
      'components',
    )}`;
    const liveStorybookLink = getStorybookLiveLink(pathLine, name);
    const storybookSourceLink = githubLink.replace(/\.tsx$/, '.stories.tsx');

    return (
      <Card mt={3} id={name + '-container'}>
        <Card.Header>
          <Flex justify="space-between" align="flex-start">
            <Box>
              {heading}
              {importPath && <Pathline>{importPath}</Pathline>}
            </Box>

            <Flex justify="center">
              <Button.Link s="small" mode="transparent" title="Live Storybook" href={liveStorybookLink} target="_blank">
                <Image src="./images/storybook-icon.png" w="24px" />
              </Button.Link>

              <Button.Link
                s="small"
                mode="transparent"
                title="Storybook source code on GitHub"
                href={storybookSourceLink}
                target="_blank"
              >
                <Image src="./images/storybook-git.png" w="19px" mt="3px" />
              </Button.Link>

              <Button.Link
                s="small"
                mode="transparent"
                title="Component source code on GitHub"
                href={githubLink}
                target="_blank"
              >
                <Icon iconName="github" />
              </Button.Link>
              <DocEditLink name={name} path={filepath} />
            </Flex>
          </Flex>
        </Card.Header>
        {/* TODO: hide props table entirely if no props documented */}
        {tabButtons && (
          <Card.Row pb={4}>
            {/* Props & methods button */}
            <div className="zsg-tabs">
              <StyledPropsDetails>
                <summary>Props</summary> {/* NOTE: replacing {tabButtons} */}
                <StyledPropsTable>{tabBody}</StyledPropsTable>
              </StyledPropsDetails>
            </div>
          </Card.Row>
        )}
        <Card.Row>
          {(description || docs) && (
            // inline docgen
            <div className="zsg-docs">
              {description}
              {docs}
            </div>
          )}
          {examples}
        </Card.Row>
      </Card>
    );
  }
}

export default ReactComponentRenderer;
