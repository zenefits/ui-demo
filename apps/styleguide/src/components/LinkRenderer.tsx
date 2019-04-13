import React from 'react';

import { Link } from 'z-frontend-elements';

type LinkRendererProps = {
  href?: string;
};

// override default to use our own Link
class LinkRenderer extends React.Component<LinkRendererProps> {
  // Return page name for internal links. We use them in heap analytics
  getDataHeapLink(href?: string) {
    if (!href) {
      return null;
    }
    // Can't use new URL since it lacks ie 11 support
    const link = document.createElement('a');
    link.href = href;

    if (window.location.hostname !== link.hostname) {
      return null;
    }
    const hashComponents = link.hash && link.hash.split('/');
    return hashComponents[hashComponents.length - 1];
  }

  render() {
    return <Link data-heap-page-link={this.getDataHeapLink(this.props.href)} {...this.props} />;
  }
}

export default LinkRenderer;
