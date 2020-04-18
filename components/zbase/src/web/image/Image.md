A component for rendering an `<img>` tag

#### Examples

```jsx
// loadExample('./exampleDefault')
```

#### Usage

You must always provide alternative text via the `alt` prop. This allows screen readers
to describe the image to users who cannot see it. If not provided at all, many screen readers
will announce the URL of the image, which isn't very helpful. If you're not sure what
alt text to provide, try following the [alt decision tree](https://www.w3.org/WAI/tutorials/images/decision-tree/).

#### Implementation Notes

Images particular to your app can be included locally as follows:

```jsx static
const image = require('./images/image.png');
const image2 = require('./images/image2.png');

<Image src={image} alt="..." />
<Image src={image2} alt="..." />
```

#### Related

- [Icon](#!/Icon)
- [Carousel](#!/Carousel)
