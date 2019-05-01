import React, { Component } from 'react';

import { TextInline, TextInlineProps } from 'zbase';

export type ObscureProps = TextInlineProps & {
  /** The text or identifier to obscure. */
  value: string;
  /** The number of characters to leave revealed at the end, eg to allow the user to recognize it. */
  visibleCount?: number;
};

const obscureCharacter = '•';

function obscureString(stringToObscure: string, options: { visibleCount: number }) {
  if (!options.visibleCount) {
    return obscureCharacter.repeat(stringToObscure.length);
  }

  let visibleCount = options.visibleCount;
  if (visibleCount < 0) {
    console.error('trying to render Obscure with invalid visibleCount');
    visibleCount = 0;
  }

  const halfOfValueLength = Math.ceil(stringToObscure.length / 2);
  // never reveal more than half of the characters for security reasons
  const charactersToObscure = Math.max(halfOfValueLength, stringToObscure.length - visibleCount);
  const obscureRegex = new RegExp(`^.{${charactersToObscure}}`);
  return stringToObscure.replace(obscureRegex, obscureCharacter.repeat(charactersToObscure));
}

class Obscure extends Component<ObscureProps> {
  render() {
    const { value, visibleCount, ...rest } = this.props;
    const obscured = obscureString(value, { visibleCount: visibleCount || 0 });
    return <TextInline {...rest}>{obscured}</TextInline>;
  }
}

export default Obscure;
