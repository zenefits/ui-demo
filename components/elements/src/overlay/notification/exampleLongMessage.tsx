import React from 'react';

import Notification from './Notification';

const longMessage =
  'Saved document as “First Quarter Fiscal Year 2020 – Taxes and Final Legal Documents - Approved by Beatrice Mendoza on January 21, 2018”.';

class ComponentWithLongNotifications extends React.Component {
  render() {
    return (
      <Notification open style={{ position: 'relative', zIndex: 1 }}>
        {longMessage}
      </Notification>
    );
  }
}

export default () => <ComponentWithLongNotifications />;
