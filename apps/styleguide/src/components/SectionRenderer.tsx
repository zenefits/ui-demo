import React, { Component } from 'react';
import SectionHeading from 'react-styleguidist/lib/client/rsg-components/SectionHeading';

import { Box } from 'zbase';
import { Card } from 'z-frontend-composites';

import DocEditLink from './DocEditLink';

interface SectionProps {
  name?: string;
  slug?: string;
  filepath?: string;
  content: React.ReactNode;
  components: React.ReactNode;
  sections: React.ReactNode;
  isolatedSection?: boolean;
  depth: number;
}

// override default to use our Card styling
// https://github.com/styleguidist/react-styleguidist/blob/master/src/client/rsg-components/Section/SectionRenderer.js
class SectionRenderer extends Component<SectionProps> {
  render() {
    const { name, slug, filepath, content, components, sections, depth } = this.props;
    const heading = name && (
      <SectionHeading depth={depth} id={slug} slotName="sectionToolbar" slotProps={this.props}>
        {name}
      </SectionHeading>
    );
    const editLink = <DocEditLink name={name} path={filepath} />;
    return (
      <section>
        {!content && heading}
        {/* if content is present, it's a markdown guide so put everything in a card */}
        {content && (
          <Box id={`${slug}-content`}>
            <Card mt={3}>
              <Card.Header>
                {editLink}
                {heading}
              </Card.Header>
              <Card.Row>{content}</Card.Row>
            </Card>
          </Box>
        )}
        <Box id={`${slug}-components`}>{components}</Box>
        <Box id={`${slug}-sections`}>{sections}</Box>
      </section>
    );
  }
}

export default SectionRenderer;
