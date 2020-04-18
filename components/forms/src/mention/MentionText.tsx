import React, { Component } from 'react';

import { TextBlock, TextBlockProps } from 'zbase';

import Mention, { MentionEntry } from './Mention';

export type MentionsMap = { [key: string]: MentionEntry };

type MentionOwnProps = {
  /** Text to display that includes mention references in the form [@123], where 123 is the ID. */
  text: string;
  /** Map of mentions to be inserted into text, where the keys are IDs present in `text`. */
  mentions: MentionsMap;
};

export type MentionProps = TextBlockProps & MentionOwnProps;

// in the future, we may support types of mentions
export const userMentionRegex = /(\[@\w+\])/g;

export const nonIDCharRegex = /\W/g;

type SplitOptions = {
  usePlaceholders?: boolean;
};

export function splitIntoMentions(
  text: string,
  mentions: MentionsMap,
  options: SplitOptions = {},
): (JSX.Element | string)[] {
  if (!text) {
    return [];
  }
  return text.split(userMentionRegex).reduce((memo, current) => {
    if (userMentionRegex.test(current)) {
      const mentionKey = current.replace(nonIDCharRegex, ''); // strip all but ID
      const mention = mentions[mentionKey];
      if (mention) {
        const entry = options.usePlaceholders ? (
          `<span class="mention-placeholder" data-mention="${mentionKey}">${mention.label}</span>`
        ) : (
          <Mention key={mention.label} data-mention={mentionKey} {...mention} />
        );
        return memo.concat(entry);
      }
    }
    return current ? memo.concat(current) : memo;
  }, []);
}

class MentionText extends Component<MentionProps> {
  render() {
    const { text, mentions, ...rest } = this.props;
    const textWithMentions = splitIntoMentions(text, mentions);
    return <TextBlock {...rest}>{textWithMentions}</TextBlock>;
  }
}

export default MentionText;
