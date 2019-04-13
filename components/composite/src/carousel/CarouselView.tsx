import React, { Component } from 'react';
import Swipeable from 'react-swipeable';

import { Box } from 'zbase';
import { styled } from 'z-frontend-theme';
import { EmptyState } from 'z-frontend-elements';

const mobileWidthPercent = 70; // save remaining space for the next item, acts as a visual cue to swipe

const CarouselViewWrapper = styled(Box)`
  width: 100%;
  position: relative;
  overflow: hidden;
  white-space: nowrap;
  font-size: 0;
`;

const BoxWithPage = Box.extendProps<{ currentPage: number }>();
const CarouselViewContainer = styled(BoxWithPage)`
  transition: transform 0.4s ease 0s;
  transform: ${props => `translateX(${(props.currentPage - 1) * -100}%)`};

  @media screen and (max-width: ${p => p.theme.breakpoints[1]}em) {
    transform: ${props => `translateX(${(props.currentPage - 1) * -mobileWidthPercent}%)`};
  }
`;

const CarouselItem = styled(Box)`
  display: inline-flex;
  justify-content: center;
  white-space: normal;
  user-select: none; /* for dragging */
`;

type CarouselViewProps = {
  currentPage: number;
  items: React.ReactElement<any>[];
  isEmpty?: boolean;
  emptyRender?: () => React.ReactNode;
  itemsPerPage: number;
  isSmallScreen?: boolean;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
};

class CarouselView extends Component<CarouselViewProps> {
  static defaultProps = {
    isSmallScreen: false,
  };

  render() {
    const {
      items,
      isEmpty,
      emptyRender,
      onSwipeLeft,
      onSwipeRight,
      currentPage,
      itemsPerPage,
      isSmallScreen,
    } = this.props;
    const itemWidth = isSmallScreen ? mobileWidthPercent : 100 / itemsPerPage;
    const emptyBlock =
      isEmpty && (emptyRender ? emptyRender() : <EmptyState message="No content available." iconName="info" />);
    return (
      <Swipeable trackMouse onSwipedLeft={onSwipeLeft} onSwipedRight={onSwipeRight} style={{ width: '100%' }}>
        <CarouselViewWrapper>
          <CarouselViewContainer currentPage={currentPage}>
            {(items || []).map((item, i) => (
              <CarouselItem key={i} width={`${itemWidth}%`}>
                {item}
              </CarouselItem>
            ))}
            {emptyBlock}
          </CarouselViewContainer>
        </CarouselViewWrapper>
      </Swipeable>
    );
  }
}

export default CarouselView;
