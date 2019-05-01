A paginated component that allows a user to browse a list of items and possibly select one. Unlike many carousels,
this one does not auto-play due to usability concerns.

On small screens, the explicit pagination disappears in favor of swiping.

#### Examples

```jsx noeditor
<StorybookExample selectedKind="composites|Carousel" selectedStory="fluid width" />
```

With custom pagination buttons:

```jsx noeditor
<StorybookExample selectedKind="composites|Carousel" selectedStory="custom pagination buttons" />
```

#### Content Guidelines

- Items should include a thumbnail or other image (eg Avatar).
- Items should provide their own padding.

#### Usage

- Use when there are many items to show and the user only needs to focus on a few at once.
- Do not use for unrelated items. Items should have a common theme.
- Do not use for non-visual items such as links or paragraphs.
- Be aware that user testing suggests [few users interact with carousels](http://shouldiuseacarousel.com).

#### Implementation Notes

- This component does not currently support loading on demand — items must be preloaded.
- By design, the carousel does not "wrap around" to the beginning after the last page.
- By design, the carousel does not advance on its own.

#### Related

- [Pager](#!/Pager)
