import React, { Component, HTMLAttributes } from 'react';

import { theme } from 'z-frontend-theme';
import { color, fontSizes, heights, radius, space } from 'z-frontend-theme/utils';
import { ResponsiveUtilProp } from 'zbase';

import { sizeMap, InputSize } from './inputTypes';

export type InputDisplayProps = {
  /** Value to display like an input. */
  value: string | number;

  s: InputSize;
  width?: ResponsiveUtilProp;
  /**
   * Align text to right, eg for numeric values in a table.
   */
  textAlignRight?: boolean;
} & HTMLAttributes<HTMLDivElement>;

const propsLike = { theme };

/* Component to be used in cases like EditableTable where editable inputs and display-only values are shown. */
class InputDisplay extends Component<InputDisplayProps> {
  static defaultProps = {
    s: 'medium',
  };

  render() {
    const { value, s: size, width, textAlignRight, ...rest } = this.props;

    const simpleWidth = Array.isArray(width) ? width[0] : width; // TODO: responsive support?
    const verticalPadding = space(1)(propsLike);
    const horizontalPadding = size === 'small' ? space(2)(propsLike) : space(3)(propsLike);
    const unspecifiedValue = value === undefined || value === null || value === '';
    return (
      <div
        // match input styling exactly, but don't use styled components for performance reasons
        style={{
          width: simpleWidth,
          fontSize: fontSizes(sizeMap[size])(propsLike),
          fontWeight: 'normal',
          border: '1px solid transparent',
          borderRadius: radius()(propsLike),
          padding: `${verticalPadding} ${horizontalPadding}`,
          color: unspecifiedValue ? color('text.light')(propsLike) : 'inherit',
          height: heights(size)(propsLike),
          display: 'flex',
          alignItems: 'center',
          justifyContent: textAlignRight ? 'flex-end' : 'normal',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          overflow: 'visible',
        }}
        {...rest}
      >
        <div style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>{unspecifiedValue ? '—' : value}</div>
      </div>
    );
  }
}

export default InputDisplay;
