import React from 'react';

import { Icon } from 'zbase';
import { Button, ButtonBasicProps } from 'z-frontend-elements';

export type CaretType = 'up' | 'down' | '';

type DataTableColumnHeaderButtonProps = ButtonBasicProps & {
  /**
   * The text on button.
   */
  text: string;
  /**
   * Which caret icon to show beside the button text. No icon to show when this is undefined.
   */
  caretType?: CaretType;
};

/**
 * A button used in DataTableColumnHeader to trigger sorting.
 */
export default function(props: DataTableColumnHeaderButtonProps) {
  const { caretType, onClick, text } = props;

  return (
    <Button
      mode="transparent"
      onClick={onClick}
      fontStyle="controls.s"
      color="grayscale.d"
      style={{ overflow: 'hidden' }}
      className="header-button"
    >
      <div className="header-button__content-container">
        <div className="header-button__content" title={text}>
          {text}
        </div>
        {caretType && <Icon iconName={caretType === 'up' ? 'caret-up' : 'caret-down'} pl={2} />}
      </div>
    </Button>
  );
}
