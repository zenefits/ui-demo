import * as React from 'react';
import { FormikConsumer } from 'formik';

import EffectInner, { FormOnChange } from './EffectInner';

type EffectProps<Values = {}> = {
  onChange: FormOnChange<Values>;
};

class Effect<Values = {}> extends React.Component<EffectProps<Values>, {}> {
  render() {
    return (
      <FormikConsumer>
        {formikProps => {
          return <EffectInner formikProps={formikProps} onChange={this.props.onChange} />;
        }}
      </FormikConsumer>
    );
  }
}

export { FormOnChange };
export default Effect;
