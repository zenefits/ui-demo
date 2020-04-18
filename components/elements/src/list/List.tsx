import React, { Component, HTMLAttributes } from 'react';

import { css } from 'z-frontend-theme';
import { color, space } from 'z-frontend-theme/utils';
import { withUtilProps, ResultComponentProps } from 'zbase';

import { ListStyleTypes } from './types';

type ListAttrs = HTMLAttributes<HTMLOListElement> & HTMLAttributes<HTMLUListElement>;

type AdditionalListProps = {
  /**
   * should the list be ordered
   * @default false
   */
  ordered?: boolean;
  /**
   * should the list be inline
   * @default false
   */
  inline?: boolean;
  /**
   * list style. should be of type ListStyleTypes
   * @default none
   */
  itemStyle?: ListStyleTypes;
  /** Reverse the order of list items (ordered lists only) */
  reversed?: boolean;
  /** Where to start counting for list items (ordered lists only) */
  start?: number;
};

export type ListProps = ResultComponentProps<ListAttrs, AdditionalListProps>;

const ListContainer: React.FunctionComponent<ListProps> = ({ ordered, color, ...rest }) => {
  const ListTag = ordered ? 'ol' : 'ul';

  return (
    <ListTag
      data-testid={ordered ? 'OrderedList' : 'UnorderedList'}
      color={color as string} // weaken due to type conflict
      {...rest}
    />
  );
};

function getDefaultPaddingLeft(props: ListProps) {
  // if the user specifies something, use that (util props will apply)
  if (props.pl !== undefined) {
    return null;
  }

  if (props.itemStyle === 'none' || props.inline) {
    return 0; // override browser default
  }
  if (props.ordered) {
    return space(5); // leave more space than unordered because item count could reach 100+
  }
  return '20px'; // 16 is not quite enough
}

const ListWithUtilProps = withUtilProps<ListAttrs, AdditionalListProps>({
  additionalPropsMap: {
    itemStyle: { cssName: 'list-style-type' },
  },
  additionalCss: css<AdditionalListProps>`
    padding-left: ${props => getDefaultPaddingLeft(props)};
    li:not(:last-child) {
      padding-bottom: ${space(2)};
    }
  `,
})(({ elementRef, inline, ...rest }: any) => <ListContainer {...rest} />);

const InlineListWithUtilProps = withUtilProps<ListAttrs, AdditionalListProps>({
  additionalCss: css<AdditionalListProps>`
    padding-left: ${props => getDefaultPaddingLeft(props)};
    list-style: none;
    display: flex;
    li:not(:last-child)::after {
      content: '|';
      margin: 0 ${space(3)};
      color: ${color('grayscale.e')};
    }
  `,
})(ListContainer);

const Item: React.FunctionComponent = ({ children }) => {
  return <li data-testid="ListItems">{children}</li>;
};

class List extends Component<ListProps> {
  static Item = Item;

  static defaultProps: Partial<ListProps> = {
    my: 2,
    ordered: false,
    inline: false,
    itemStyle: null, // use browser default, eg decimal if <ol>
  };

  render() {
    const ListElement = this.props.inline ? InlineListWithUtilProps : ListWithUtilProps;
    return <ListElement {...this.props} />;
  }
}

export default List;
