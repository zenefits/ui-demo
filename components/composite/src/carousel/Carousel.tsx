import React, { Component, ReactNode } from 'react';

import { Flex } from 'zbase';
import { getBreakpointMatches, styled } from 'z-frontend-theme';
import { ButtonBasicProps } from 'z-frontend-elements';

import CarouselView from './CarouselView';
import CarouselSideButton from './CarouselSideButton';

const PREV_PAGE_DELTA = -1;
const NEXT_PAGE_DELTA = 1;

export type CarouselProps = {
  children: React.ReactElement<any>[];
  /** Max items to show on a single page. Will be fewer on small screens. */
  itemsPerPage: number;
  /** Callback when carousel page state updates. */
  onPageChange?: (currentPage: number, totalPages: number) => void;
  /** Custom render prop for taking full control of carousel presentation. */
  render?: (renderProps: CarouselRenderProps) => ReactNode;
  buttonProps?: ButtonBasicProps;
  /** Is the carousel empty? Affects whether a message is shown. */
  isEmpty?: boolean;
  /** Override default empty state component. */
  emptyRender?: () => React.ReactNode;
};

export type CarouselRenderProps = {
  items: React.ReactElement<any>[];
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  isSmallScreen: boolean;
  isEmpty?: boolean;
  emptyRender?: () => React.ReactNode;
  handleClickNext: () => void;
  handleClickPrevious: () => void;
  handleSwipeLeft: () => void;
  handleSwipeRight: () => void;
};

interface CarouselState {
  currentPage: number;
  breakpointMatches: boolean[];
}

const CarouselContainer = styled(Flex)`
  position: relative;

  img {
    -webkit-user-drag: none;
  }

  @media screen and (max-width: ${p => p.theme.breakpoints[1]}em) {
    max-width: 100%;
  }
`;

class Carousel extends Component<CarouselProps, CarouselState> {
  static View = CarouselView;

  static defaultProps = {
    showButtons: true,
  };

  state: CarouselState = {
    currentPage: 1,
    breakpointMatches: getBreakpointMatches(),
  };

  resizeEventHandler = () => {
    this.setState({ breakpointMatches: getBreakpointMatches() });
  };

  componentDidMount() {
    window.addEventListener('resize', this.resizeEventHandler);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeEventHandler);
  }

  changePage = (delta: number) => {
    const { onPageChange } = this.props;
    this.setState(
      prevState => ({ currentPage: prevState.currentPage + delta }),
      () => {
        onPageChange && onPageChange(this.state.currentPage, this.getTotalPages());
      },
    );
  };

  getItemsPerPage = () => {
    const matches = this.state.breakpointMatches;
    if (matches[0]) {
      return 1;
    } else if (matches[1]) {
      return 2;
    }
    return this.props.itemsPerPage;
  };

  getTotalPages = () => {
    const totalItems = React.Children.count(this.props.children);
    return Math.max(Math.ceil(totalItems / this.getItemsPerPage()), 1);
  };

  handleSwipeLeft = () => {
    this.handleSwipe(true);
  };

  handleSwipeRight = () => {
    this.handleSwipe(false);
  };

  handleSwipe = (isNext: boolean) => {
    const { currentPage } = this.state;
    const totalPages = this.getTotalPages();
    if (isNext && currentPage !== totalPages) {
      this.changePage(NEXT_PAGE_DELTA);
    } else if (!isNext && currentPage !== 1) {
      this.changePage(PREV_PAGE_DELTA);
    }
  };

  goNext = () => {
    this.changePage(NEXT_PAGE_DELTA);
  };

  goPrevious = () => {
    this.changePage(PREV_PAGE_DELTA);
  };

  isNextDisabled() {
    return this.state.currentPage >= this.getTotalPages();
  }

  isPreviousDisabled() {
    return this.state.currentPage <= 1;
  }

  render() {
    const { children, render, buttonProps, isEmpty, emptyRender } = this.props;
    const { currentPage, breakpointMatches } = this.state;

    const itemsPerPage = this.getItemsPerPage();
    const isSmallScreen = breakpointMatches[0] || breakpointMatches[1];

    const sharedProps = {
      isEmpty,
      emptyRender,
      currentPage,
      isSmallScreen,
      itemsPerPage,
      items: children,
    };

    if (render) {
      // let client customize carousel (eg custom buttons)
      const renderProps: CarouselRenderProps = {
        ...sharedProps,
        totalPages: this.getTotalPages(),
        handleClickNext: this.goNext,
        handleClickPrevious: this.goPrevious,
        handleSwipeLeft: this.handleSwipeLeft,
        handleSwipeRight: this.handleSwipeRight,
      };
      return render(renderProps);
    }

    return (
      <CarouselContainer justify="center" align="center">
        {!isSmallScreen && (
          <CarouselSideButton
            {...buttonProps}
            side="left"
            onClick={this.goPrevious}
            disabled={this.isPreviousDisabled()}
          />
        )}
        <CarouselView {...sharedProps} onSwipeLeft={this.handleSwipeLeft} onSwipeRight={this.handleSwipeRight} />
        {!isSmallScreen && (
          <CarouselSideButton {...buttonProps} side="right" onClick={this.goNext} disabled={this.isNextDisabled()} />
        )}
      </CarouselContainer>
    );
  }
}

export default Carousel;
