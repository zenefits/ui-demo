import React, { Component } from 'react';
import ComponentsListRenderer from 'react-styleguidist/lib/client/rsg-components/ComponentsList/ComponentsListRenderer';

type ComponentsListProps = {
  items: any[];
  classes: any;
  hashPath: string[];
  useRouterLinks: boolean;
  useHashId: boolean;
};

function getUrl(item) {
  let url = window.location.pathname;
  url += `#!/${encodeURIComponent(item.name)}`;
  return url;
}

// overriding to use "old" hash url structure eg /#!/Button instead of /#/Components/Elements/Button
// there seems to be no way to override getUrl directly
// https://github.com/styleguidist/react-styleguidist/blob/master/src/client/rsg-components/ComponentsList/ComponentsList.js
class ComponentsList extends Component<ComponentsListProps> {
  render() {
    const { classes, items } = this.props;
    const mappedItems = items.map(item => {
      return {
        ...item,
        shouldOpenInNewTab: !!item.href,
        href: item.href ? item.href : getUrl(item),
      };
    });
    return <ComponentsListRenderer classes={classes} items={mappedItems} />;
  }
}

export default ComponentsList;
