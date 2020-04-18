import React, { Component, MouseEvent } from 'react';
import { pickBy } from 'lodash';

import { isUtilProp, TextInline, TextInlineProps, UtilProps } from 'zbase';
import { styled } from 'z-frontend-theme';

import { StyledLink } from '../../action/link/Link';
import Obscure from '../obscure/Obscure';

const StyledContainer = styled(TextInline)`
  vertical-align: bottom;
`;

export const ToggleLink = styled(StyledLink)`
  font-size: 80%; /* de-emphasize relative to data */
  user-select: none; /* double click to select the value, not the link text */
`;

const valueTypes = {
  ssn: { visibleCount: 4 },
};
const customValueType = 'custom';

interface ObscureToggleCommonProps extends TextInlineProps {
  /** The text or identifier to obscure. */
  value: string;
}

interface ObscureToggleProps extends ObscureToggleCommonProps {
  /** What does the value represent? eg 'ssn' for Social Security Number. Use 'custom' to control the revealed values via `visibleCount`. */
  valueType: keyof typeof valueTypes | typeof customValueType;
  /** If valueType is 'custom', the number of characters to leave revealed at the end */
  visibleCount?: number;
}

interface ObscureToggleState {
  isObscured: boolean;
}

type ObscureTogglePropsResult = ObscureToggleProps;

class ObscureToggle extends Component<ObscureTogglePropsResult, ObscureToggleState> {
  static defaultProps = {
    visibleCount: 4,
  };

  constructor(props: ObscureTogglePropsResult) {
    super(props);
    this.state = {
      isObscured: true,
    };
  }

  toggle = (event: MouseEvent<any>) => {
    event.preventDefault();
    this.setState(prevState => ({
      isObscured: !prevState.isObscured,
    }));
  };

  render() {
    const { value, valueType } = this.props;
    const { isObscured } = this.state;

    const visibleCount = valueType === customValueType ? this.props.visibleCount : valueTypes[valueType].visibleCount;

    const utilProps: UtilProps = pickBy(this.props, (value, key) => isUtilProp(key));
    return (
      <StyledContainer {...utilProps}>
        {isObscured ? <Obscure value={value} visibleCount={visibleCount} /> : <TextInline>{value}</TextInline>}
        <ToggleLink
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
