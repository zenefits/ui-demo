import React from 'react';

import { Button } from 'z-frontend-elements';
import { Icon } from 'zbase';

function getEditLinkUrl(componentPath) {
  if (!componentPath) {
    return '';
  }

  if (componentPath.startsWith('./docs')) {
    const docsPath = componentPath.replace('./', '');
    return `https://github.com/zenefits/z-frontend/edit/master/apps/styleguide/${docsPath}`;
  }

  const markdownPath = componentPath
    .replace('../../', '') // eg ../../docs/voice.md
    .replace(/.*components/, 'components') // eg /absolute/path/zenefits/z-frontend/components/theme/src/Colors.tsx
    .replace(/\.\w+$/, '.md'); // eg .tsx with .md
  return `https://github.com/zenefits/z-frontend/edit/master/${markdownPath}`;
}

class DocEditLink extends React.Component<any> {
  render() {
    const { name, path } = this.props;
    return (
      <Button.Link
        s="small"
        mode="transparent"
        title={`Edit ${name} documentation`}
        style={{ float: 'right' }}
        href={getEditLinkUrl(path)}
        target="_blank"
      >
        <Icon iconName="edit" />
      </Button.Link>
    );
  }
}

export default DocEditLink;
