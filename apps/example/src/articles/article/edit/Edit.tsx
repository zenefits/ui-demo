import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { Box, Flex, Heading } from 'zbase';
import { Link } from 'z-frontend-forms';

interface MatchProps {
  articleId: string;
}

type Props = RouteComponentProps<MatchProps> & {};

class OverviewPage extends Component<Props> {
  render() {
    const { articleId } = this.props.match.params;

    return (
      <Flex column>
        <Heading level={2}>Edit article #{articleId}</Heading>
        <Flex column>
          <Box mb={3}>
            <Link to={`/articles/${articleId}`}>Back to article #{articleId}</Link>
          </Box>
          <Box mb={3}>
            <Link to={`/articles/`}>Articles list</Link>
          </Box>
          <Box mb={3}>
            <Link to={`/overview/`}>Overview</Link>
          </Box>
        </Flex>
      </Flex>
    );
  }
}

export default OverviewPage;
