import React, { Component } from 'react';
import { pickBy } from 'lodash';

import { isUtilProp, Text, TextProps, UtilProps } from 'zbase';
import { styled } from 'z-frontend-theme';
import { Link } from 'z-frontend-forms';

import Obscure from '../obscure/Obscure';

const StyledContainer = styled(Text)`
  vertical-align: bottom;
`;

const StyledLink = styled(Link)`
  font-size: 80%; /* de-emphasize relative to data */
  user-select: none; /* double click to select the value, not the link text */
`;

const valueTypes = {
  ssn: { visibleCount: 4 },
};
const customValueType = 'custom';

interface ObscureToggleCommonProps extends TextProps {
  /** The text or identifier to obscure. */
  value: string;
}

interface ObscureToggleProps extends ObscureToggleCommonProps {
  /** What does the value represent? eg 'ssn' for Social Security Number. */
  valueType: keyof (typeof valueTypes);
}

interface ObscureToggleCustomProps extends ObscureToggleCommonProps {
  /** Use 'custom' to control the revealed values via `visibleCount`. */
  valueType: typeof customValueType;
  /** If valueType is 'custom', the number of characters to leave revealed at the end */
  visibleCount: number;
}

interface ObscureToggleState {
  isObscured: boolean;
}

/**
 * A component that obscures sensitive data and includes a reveal toggle.
 */
class ObscureToggle extends Component<ObscureToggleProps | ObscureToggleCustomProps, ObscureToggleState> {
  constructor(props) {
    super(props);
    this.state = {
      isObscured: true,
    };
  }

  toggle = event => {
    event.preventDefault();
    this.setState(prevState => ({
      isObscured: !prevState.isObscured,
    }));
  };

  render() {
    const { value, valueType } = this.props;
    const { isObscured } = this.state;

    const visibleCount =
      valueType === customValueType
        ? (this.props as ObscureToggleCustomProps).visibleCount
        : valueTypes[valueType].visibleCount;

    const utilProps: UtilProps = pickBy(this.props, (value, key) => isUtilProp(key));
    return (
      <StyledContainer {...utilProps}>
        {isObscured ? <Obscure value={value} visibleCount={visibleCount} /> : <Text>{value}</Text>}
        <StyledLink
          onClick={this.toggle}
          ml={2}
          href="#" // allow focus via keyboard
          // TODO: this component should have its own locale bundle? (textDefault always used for now)
          textKey="obscureToggle.buttonLabel"
          textDefault={isObscured ? 'Show' : 'Hide'}
        />
      </StyledContainer>
    );
  }
}

export default ObscureToggle;
