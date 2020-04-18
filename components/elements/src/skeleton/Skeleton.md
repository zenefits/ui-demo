Show visual placeholders (the "skeleton") of pages that are loading.
When used correctly, the Skeleton component gives users early feedback and makes pages seem to load faster.

#### Examples

```jsx noeditor
<StorybookExample selectedKind="elements|Skeleton" selectedStory="variants" />
```

#### Usage

- Used for initial page loads only when the content can be shown progressively.
- Show the skeleton as soon as possible.
- In some cases, loading must start with a LoadingSpinner to figure out which skeleton to show.
- Avoid showing LoadingSpinner and Skeleton on screen simultaneously. Use one or the other to avoid animation overload.
- Progressively replaced with loaded content as it becomes available
- If the page takes more than 10 seconds to load, use LoadingScreen instead.

More details: [Everything you need to know about skeleton screens](https://uxdesign.cc/what-you-should-know-about-skeleton-screens-a820c45a571a)

#### Content Guidelines

- Use only for dynamic content and layouts. Do NOT replace static content like section headings.
- The goal is for the page structure to be recognizable, but the skeleton does not need to exactly match final content.
- When possible, avoid page jumps when the final content loads.

#### Related

- [LoadingScreen](#!/LoadingScreen)
