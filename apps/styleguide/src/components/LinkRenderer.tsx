import React from 'react';
import { Link } from 'z-frontend-forms';

// override default to use our own Link
class LinkRenderer extends React.Component {
  render() {
    return <Link {...this.props} />;
  }
}

export default LinkRenderer;
