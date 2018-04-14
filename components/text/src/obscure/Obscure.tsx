import React, { Component } from 'react';

import { Text, TextProps } from 'zbase';

export type ObscureProps = TextProps & {
  /** The text or identifier to obscure. */
  value: string;
  /** The number of characters to leave revealed at the end, eg to allow the user to recognize it. */
  visibleCount?: number;
};

const obscureCharacter = '•';

function obscureString(string, options) {
  if (!options.visibleCount) {
    return obscureCharacter.repeat(string.length);
  }

  let visibleCount = options.visibleCount;
  if (visibleCount < 0) {
    console.error('trying to render Obscure with invalid visibleCount');
    visibleCount = 0;
  }

  const halfOfValueLength = Math.ceil(string.length / 2);
  // never reveal more than half of the characters for security reasons
  const charactersToObscure = Math.max(halfOfValueLength, string.length - visibleCount);
  const obscureRegex = new RegExp(`^.{${charactersToObscure}}`);
  return string.replace(obscureRegex, obscureCharacter.repeat(charactersToObscure));
}

/**
 * A component that obscures sensitive data that should not be fully displayed by default.
 */
class Obscure extends Component<ObscureProps> {
  render() {
    const { value, visibleCount, ...rest } = this.props;
    const obscured = obscureString(value, { visibleCount });
    return <Text {...rest}>{obscured}</Text>;
  }
}

export default Obscure;
