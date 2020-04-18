import React from 'react';
import { flow, isEqual, isObject, values } from 'lodash';

import { styled } from 'z-frontend-theme';
import { color } from 'z-frontend-theme/utils';

export const KEY_CODES = {
  ENTER: 13,
  ESC: 27,
  SPACEBAR: 32,
  TAB: 9,
  UP_ARROW: 38,
  DOWN_ARROW: 40,
};

type SelectControlKeyDownParams = {
  onClick: (e: any) => void;
  cb: (charValue: string) => void;
};

export const getSelectControlKeyDown = ({ onClick, cb }: SelectControlKeyDownParams) => (e: any) => {
  const { keyCode } = e;
  if (e.keyCode === KEY_CODES.ENTER) {
    onClick(e);
  } else if (e.keyCode === KEY_CODES.ESC) {
    e.target.blur();
  } else {
    const isPrintableChar =
      (keyCode > 47 && keyCode < 58) || // number keys
      keyCode === KEY_CODES.SPACEBAR || // spacebar
      (keyCode > 64 && keyCode < 91) || // letter keys
      (keyCode > 95 && keyCode < 112); // numpad keys
    if (isPrintableChar) {
      e.preventDefault();
      const charValue = e.shiftKey ? String.fromCharCode(keyCode) : String.fromCharCode(keyCode).toLowerCase();
      cb(charValue);
    }
  }
};

type Transformation = {
  condition: (element: React.ReactElement<any>) => boolean;
  transformation: (element: React.ReactElement<any>) => React.ReactElement<any>;
};

export const recursivelyTransformChildren = (children: React.ReactNode, transformations: Transformation[]) => {
  const transform = flow(
    transformations.map(
      transformation =>
        // eslint-disable-next-line func-names
        function(element: React.ReactElement<any>) {
          return transformation.condition(element) ? transformation.transformation(element) : element;
        },
    ),
  );

  const recurse = (children: React.ReactNode) => {
    return React.Children.map(children, child => {
      if (!isObject(child)) return child;

      const childElement = child as React.ReactElement<any>;
      let transformedChild = transform(childElement);
      const transformedGrandchildren = recurse(transformedChild.props.children);
      transformedChild = React.cloneElement(transformedChild, { children: transformedGrandchildren });
      return transformedChild;
    });
  };

  return recurse(children) as React.ReactNode;
};

const createStringChecker = (input: string) => (option: string | number) =>
  option
    .toString()
    .toLowerCase()
    .includes(input.toLowerCase());

export function createBasicOptionFilter<OptionValue>(inputValue: string | null) {
  if (!inputValue) {
    return (options: OptionValue[]) => options;
  }

  const checkOptionString = createStringChecker(inputValue);

  return (options: OptionValue[]) => {
    return options.filter(option => {
      if (typeof option === 'object') {
        const searchable = values(option);
        return searchable.some(checkOptionString);
      } else {
        return checkOptionString((option as any) as string);
      }
    });
  };
}

export function createMultiOptionFilter<OptionValue>(inputValue: string, selectedItems: OptionValue[]) {
  const basicFilter = createBasicOptionFilter<OptionValue>(inputValue);
  return (options: OptionValue[]) => {
    return basicFilter(options).filter(option => !selectedItems.some(selectedItem => isEqual(option, selectedItem)));
  };
}

export function createCurrentWordFilter(currentWord: string) {
  const checkSuggestion = (option: string) => option.toLowerCase().startsWith(currentWord.toLowerCase());

  return (suggestions: string[], waitForLength = 2) => {
    if (!currentWord || currentWord.length < waitForLength) {
      return [];
    } else {
      return suggestions.filter(checkSuggestion);
    }
  };
}

const MatchCharacter = styled.span`
  color: ${color('grayscale.b')};
`;

export const createMatchEmphasisHelper = (inputValueOrNull: string | null) => (text: string) => {
  const inputValue = inputValueOrNull || '';
  const matchStart = text.toLowerCase().indexOf(inputValue.toLowerCase());
  const matchEnd = matchStart + inputValue.length;
  return (
    <span>
      {(() => {
        const decoratedChars: JSX.Element[] = [];
        for (let i = 0; i < text.length; i += 1) {
          decoratedChars.push(
            i >= matchStart && i < matchEnd ? (
              <MatchCharacter key={i}>{text.charAt(i)}</MatchCharacter>
            ) : (
              <span key={i}>{text.charAt(i)}</span>
            ),
          );
        }
        return decoratedChars;
      })()}
    </span>
  );
};

export function makeGuardedGetOptionText<OptionValue>(getOptionText: any) {
  return (option: OptionValue) => (option ? getOptionText(option) : '');
}

type DropdownContentParams = {
  numRenderedOptions: number;
  options: React.ReactNode;
  isLoading?: boolean;
  renderLoading?: () => JSX.Element;
  renderNoResults?: () => JSX.Element;
};

export const getDropdownContent = ({
  isLoading,
  numRenderedOptions,
  options,
  renderLoading,
  renderNoResults,
}: DropdownContentParams): React.ReactNode => {
  if (isLoading) {
    return renderLoading ? renderLoading() : null;
  } else if (numRenderedOptions > 0) {
    return options;
  } else if (renderNoResults) {
    return renderNoResults();
  } else {
    return null;
  }
};
