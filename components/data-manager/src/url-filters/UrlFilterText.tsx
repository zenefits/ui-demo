import React from 'react';
import { debounce } from 'lodash';

import { getAriaInputProps, FormFieldProps, FormFieldWrapper, Input, InputProps } from 'z-frontend-forms';

import { commonFilterStyleProps } from '../filter/dataFilterUtils';
import { getEnteredText, transformFiltersToUrlFormat, Filters } from './urlFilterUtils';
import { UpdateQueryParamsFn, UrlQueryParamsContext } from '../UrlQueryParamsManager';

type InternalTextInputProps = InputProps & Pick<FormFieldProps, 'label' | 'helpText' | 'format' | 'containerProps'>;

export type UrlFilterTextProps = InternalTextInputProps & {
  /**
   * The filter name used in URL.
   * e.g. If we have "filter_name=alex" in URL, "name" is the filter name.
   * "filter_" is the filter prefix.
   */
  filterName: string;
  /**
   * The initial value for the input. It should be got from URL.
   * e.g. If we have "filter_name=alex" in URL, text should be 'alex'.
   */
  text: string;
  /**
   * Function from UrlQueryParamsContext, can be used to update query params.
   */
  updateQueryParams: UpdateQueryParamsFn;
};

export type UrlFilterTextWrapperProps = Omit<UrlFilterTextProps, 'filters' | 'updateQueryParams' | 'text'>;

class UrlFilterText extends React.Component<UrlFilterTextProps, { text: string }> {
  static defaultProps = {
    ...commonFilterStyleProps,
  };

  state = {
    text: this.props.text || '',
  };

  componentDidUpdate(prevProps: UrlFilterTextProps) {
    if (prevProps.text !== this.props.text) {
      this.setState({ text: this.props.text });
    }
  }

  debounceQueryParamsUpdate = debounce((text: string, updateQueryParams: UpdateQueryParamsFn) => {
    const newFilters = {
      [this.props.filterName]: text || null,
    } as Filters;
    updateQueryParams(transformFiltersToUrlFormat(newFilters));
  }, 2000);

  render() {
    const {
      label,
      filterName,
      helpText,
      format,
      containerProps,
      updateQueryParams,
      'aria-label': ariaLabel,
      ...rest
    } = this.props;
    return (
      <>
        <FormFieldWrapper
          name={filterName}
          label={label}
          helpText={helpText}
          containerProps={containerProps}
          format={format}
        >
          <Input
            id={filterName}
            value={this.state.text}
            onChange={e => {
              this.setState({ text: e.target.value });
              this.debounceQueryParamsUpdate(e.target.value, updateQueryParams);
            }}
            {...getAriaInputProps(filterName, null, ariaLabel)}
            {...rest}
          />
        </FormFieldWrapper>
      </>
    );
  }
}

/**
 * A component that renders a text input, initially displays the value according to URL, and updates URL query params
 * when input value changes (with debounce).
 * Example of URL query params when using this filter: "filter_name=alex".
 * MUST have UrlQueryParamsManager in its parents tree, otherwise it can't get initial value from URL.
 */
class UrlFilterTextWrapper extends React.Component<UrlFilterTextWrapperProps> {
  render() {
    const { filterName, ...textInputProps } = this.props;
    return (
      <UrlQueryParamsContext.Consumer>
        {({ queryParams, updateQueryParams }) => {
          const text = getEnteredText(queryParams, filterName);
          return (
            <UrlFilterText
              {...textInputProps}
              text={text}
              filterName={filterName}
              updateQueryParams={updateQueryParams}
            />
          );
        }}
      </UrlQueryParamsContext.Consumer>
    );
  }
}

export default UrlFilterTextWrapper;
