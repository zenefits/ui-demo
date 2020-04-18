import React, { Component } from 'react';
// @ts-ignore
import { action } from '@storybook/addon-actions';
// @ts-ignore
import { withViewport } from '@storybook/addon-viewport';

import { setViewports } from 'z-frontend-app-bootstrap';
import { Box, Flex, Image, TextBlock } from 'zbase';
import { images, Hide } from 'z-frontend-theme';
import { Button, Link } from 'z-frontend-elements';

import { storiesOf } from '../../.storybook/storyHelpers';
import Carousel, { CarouselRenderProps } from './Carousel';
import { Avatar } from '../..';

const emptyImages: any = [];
const fewImages = images.robots.slice(0, 2);

storiesOf('composites|Carousel', module)
  .addDecorator(withViewport())
  .addDecorator((getStory: Function) => (
    <Box mx={[0, 0, 6]} p={20}>
      {getStory()}
    </Box>
  ))
  .add('empty', () => <EmptyExample items={emptyImages} />)
  .add('images', () => <ImageExample items={images.robots} />)
  .add('images (mobile)', () => <ImageExample items={images.robots} />, setViewports([0]))
  .add('avatars', () => <AvatarExample items={avatars} />)
  .add('few items', () => <ImageExample items={fewImages} />)
  .add('fixed width', () => <FixedWidthExample items={avatars} />)
  .add('fluid width', () => <FluidExample items={blocks} />)
  .add('fluid width (mobile)', () => <FluidExample items={blocks} />, setViewports([0]))
  .add('custom items per page', () => <CustomItemsPerPageExample items={images.robots} />)
  .add('custom pagination buttons', () => <CustomButtonsExample items={images.robots} />);

type ExampleProps = {
  items: any[]; // image or avatar etc
  itemsPerPage?: number;
};

class EmptyExample extends Component<ExampleProps> {
  render() {
    const { items } = this.props;
    return (
      <Carousel itemsPerPage={3} isEmpty={items.length === 0}>
        {items.map(item => (
          <Image key={item} src={item} height={200} alt="todo" />
        ))}
      </Carousel>
    );
  }
}

class ImageExample extends Component<ExampleProps> {
  render() {
    const { items } = this.props;
    return (
      <Carousel itemsPerPage={3}>
        {items.map(item => (
          <Image key={item} src={item} height={200} alt="todo" />
        ))}
      </Carousel>
    );
  }
}

const avatars = [
  { firstName: 'A', lastName: 'W' },
  { firstName: 'B', lastName: 'X' },
  { firstName: 'C', lastName: 'Y' },
  { firstName: 'D', lastName: 'Z' },
];

class AvatarExample extends Component<ExampleProps> {
  render() {
    const { items } = this.props;
    return (
      <Carousel itemsPerPage={3}>
        {items.map(item => (
          <Avatar key={item.firstName} firstName={item.firstName} lastName={item.lastName} s="xxlarge" />
        ))}
      </Carousel>
    );
  }
}

class FixedWidthExample extends Component<ExampleProps> {
  render() {
    const { items } = this.props;
    return (
      <Carousel itemsPerPage={3}>
        {items.map(item => (
          <Box key={item.firstName} border width={100} height={150} bg="primary.a" />
        ))}
      </Carousel>
    );
  }
}

const blocks = [
  {
    id: 1,
    image: images.aspectRatio,
    text: 'Both fickle dwarves jinx my pig quiz. (Pangrams are fun.)',
  },
  {
    id: 2,
    image: images.aspectRatio,
    text: 'Pack my box with five dozen liquor jugs.',
  },
  { id: 3, image: images.aspectRatio, text: 'The quick brown fox jumped over the lazy dog.' },
  {
    id: 4,
    image: images.aspectRatio,
    text: 'How vexingly quick daft zebras jump!',
  },
];

class FluidExample extends Component<ExampleProps> {
  render() {
    const { items } = this.props;
    return (
      <Carousel itemsPerPage={3}>
        {items.map(item => (
          <Box key={item.id} p={2}>
            <Image src={item.image} mb={2} w={1} alt="todo" />
            <TextBlock>
              {item.text} <Link href="https://google.com">Read More</Link>
            </TextBlock>
          </Box>
        ))}
      </Carousel>
    );
  }
}

class CustomItemsPerPageExample extends Component<ExampleProps> {
  render() {
    const { items } = this.props;
    return (
      <Carousel itemsPerPage={2}>
        {items.map(item => (
          <Image key={item} src={item} height={200} alt="todo" />
        ))}
      </Carousel>
    );
  }
}

class CustomButtonsExample extends Component<ExampleProps> {
  render() {
    const { items } = this.props;
    return (
      <Carousel
        itemsPerPage={3}
        children={items.map(item => (
          <Image key={item} src={item} height={200} alt="todo" />
        ))}
        render={({ currentPage, totalPages, handleClickNext, handleClickPrevious, ...rest }: CarouselRenderProps) => (
          <>
            <Flex justify="space-between" align="center" mb={3} mr="40px">
              <TextBlock fontStyle="headings.s">Recommended for you</TextBlock>
              <Hide forBreakpoints={[true, true]}>
                <Flex wrap align="center">
                  <Button mr={2} s="small" disabled={currentPage <= 1} onClick={handleClickPrevious}>
                    Prev
                  </Button>
                  <Button s="small" disabled={currentPage >= totalPages} onClick={handleClickNext}>
                    Next
                  </Button>
                </Flex>
              </Hide>
            </Flex>
            <Carousel.View
              {...rest}
              currentPage={currentPage}
              onSwipeLeft={rest.handleSwipeLeft}
              onSwipeRight={rest.handleSwipeRight}
            />
          </>
        )}
      />
    );
  }
}
