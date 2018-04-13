import React, { StatelessComponent } from 'react';
import { FormattedNumber } from 'react-intl';

import withWebUtilProps, { ResultWebComponentProps, SpanProps } from '../withUtilPropsWeb';
import { removeUtilProps } from '../../commonTypes';

// from https://github.com/yahoo/react-intl/wiki/Components#formattednumber
// and https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/NumberFormat
type AdditionalProps = {
  // localeMatcher?: 'best fit' | 'lookup';

  /**
   * The formatting style to use:
   *
   * - "decimal" for plain number formatting
   * - "currency" for currency formatting
   * - "percent" for percent formatting
   * @default decimal
   */
  style?: 'decimal' | 'currency' | 'percent';

  /**
   * The currency to use in currency formatting, specified as ISO 4217 currency code,
   * such as "USD" for the US dollar.
   * Required if style is "currency"; there is no default.
   */
  currency?: string;

  /**
   * How to display the currency:
   *
   * - "symbol": use a localized currency symbol such as €
   * - "code": use the ISO currency code
   * - "name": use a localized currency name such as "dollar"
   * @default symbol
   */
  currencyDisplay?: 'symbol' | 'code' | 'name';

  /**
   * Whether to use grouping separators, such as thousands separators.
   * @default true
   */
  useGrouping?: boolean;

  /**
   * The minimum number of integer digits to use. (1 - 21)
   * @default 1
   */
  minimumIntegerDigits?: number;

  /**
   * The minimum number of fraction digits to use. (0 to 20)
   * @default 0 for decimal/percent; according to currency otherwise (often 2)
   */
  minimumFractionDigits?: number;

  /**
   * The maximum number of fraction digits to use. (0 to 20)
   * @default decimal: larger of minimumFractionDigits and 3;
   * currency: larger of minimumFractionDigits and the number of minor unit digits from the currency (often 2);
   * percent: larger of minimumFractionDigits and 0
   */
  maximumFractionDigits?: number;

  /**
   * The minimum number of significant digits to use. (1 to 21)
   * @default 1
   */
  minimumSignificantDigits?: number;

  /**
   * The maximum number of significant digits to use. (1 to 21)
   * @default minimumSignificantDigits
   */
  maximumSignificantDigits?: number;

  /**
   * The numerical value to display.
   */
  value: number;

  format?: string; // TODO: document
};

export type NumberTextProps = ResultWebComponentProps<SpanProps, AdditionalProps>;

const TextContainer: StatelessComponent<NumberTextProps> = ({
  value,
  format,
  // localeMatcher,
  style,
  currency,
  currencyDisplay,
  useGrouping,
  minimumIntegerDigits,
  minimumFractionDigits,
  maximumFractionDigits,
  minimumSignificantDigits,
  maximumSignificantDigits,
  ...rest
}) => {
  const propsWithNoUtils = removeUtilProps(rest);
  return (
    <FormattedNumber
      {...propsWithNoUtils}
      value={value}
      format={format}
      // localeMatcher={localeMatcher}
      style={style}
      currency={currency}
      currencyDisplay={currencyDisplay}
      useGrouping={useGrouping}
      minimumIntegerDigits={minimumIntegerDigits}
      minimumFractionDigits={minimumFractionDigits}
      maximumFractionDigits={maximumFractionDigits}
      minimumSignificantDigits={minimumSignificantDigits}
      maximumSignificantDigits={maximumSignificantDigits}
    >
      {str => <span {...propsWithNoUtils}>{str}</span>}
    </FormattedNumber>
  );
};

export default withWebUtilProps<SpanProps, AdditionalProps>({
  displayName: 'NumberText',
})(TextContainer);
