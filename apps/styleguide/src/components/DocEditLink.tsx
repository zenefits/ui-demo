import React from 'react';

import { Button } from 'z-frontend-forms';
import { Icon } from 'zbase';

function getEditLinkUrl(componentPath) {
  if (!componentPath) {
    return '';
  }
  const markdownPath = componentPath
    .replace('../../', '') // eg ../../docs/voice.md
    .replace(/.*components/, 'components') // eg /absolute/path/zenefits/ui-demo/components/theme/src/Colors.tsx
    .replace(/\.\w+$/, '.md'); // eg .tsx with .md
  return `https://github.com/zenefits/ui-demo/edit/master/${markdownPath}`;
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
