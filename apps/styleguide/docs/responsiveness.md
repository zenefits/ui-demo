Zenefits products need to support a wide range of users and their devices. To achieve this, the UIs are designed to
respond to viewport size at certain thresholds or "breakpoints", which are defined as:

```jsx noeditor
<BreakpointGuide />
```

As you can see from our
[Browser Support](https://confluence.inside-zen.com/display/ENG/Browser+Support#BrowserSupport-Breakpoints) page, these
roughly correspond to phones, tablets etc. If you're new to responsive design and CSS media
queries, you may find [this guide from Google](https://developers.google.com/web/fundamentals/design-and-ux/responsive/)
to be helpful.

From an implementation perspective, there are three main ways to achieve responsiveness:

- Using responsive props such as `width`, `fontStyle`, `margin`, and `padding`
- Using [Render](#!/Render) to only render content at specified breakpoints
- Using [Hide](#!/Hide) to hide content at specified breakpoints

All three operate in basically the same way, using an array whose entries correspond to the breakpoints above.
For example, here's how you can use `width` responsively:

```jsx static
width={1} // always 100% (non-responsive)

width={[
  1,    // 100% below breakpoint 0
  1/2,  // 50% from breakpoint 0 to breakpoint 1
  1/4   // 25% from breakpoint 1 and up
]}

width={[
  1,    // 100% below breakpoint 0
  null, // skipped breakpoint (so still 100%)
  1/4   // 25% from breakpoint 1 and up
]}
```

Here's an illustrative (but not very representative) example using the `bg` prop responsively:

```jsx
<Box bg={['avatar.a', 'avatar.b', 'avatar.c', 'avatar.d', 'avatar.e']} color="grayscale.white" p={3} mb={3}>
  Responsive color at each breakpoint
</Box>
<Box bg={['avatar.a', null, null, null, 'avatar.e']} color="grayscale.white" p={3}>
  Responsive color skipping middle breakpoints
</Box>
```

Similarly, this is how `Render` and its `forBreakpoints` prop work (resize page to see changes):

```jsx
<Render forBreakpoints={[true]}>
  <Box mb={2}><Icon size="large" mr={1} iconName="smartphone" /> Phone  &lt; 512px</Box>
  <code>{`breakpoints={[true]}`}</code>
</Render>
<Render forBreakpoints={[false, true]}>
  <Box mb={2}><Icon size="xlarge" mr={1} iconName="tablet-mac" /> Tablet (portrait)  ≥ 512px &lt; 768px</Box>
  <code>{`breakpoints={[false, true]}`}</code>
</Render>
<Render forBreakpoints={[false, false, true]}>
  <Box mb={2}><Icon size="xlarge" mr={1} iconName="tablet" /> Tablet (landscape)  ≥ 768px &lt; 1024px</Box>
  <code>{`breakpoints={[false, false, true]}`}</code>
</Render>
<Render forBreakpoints={[false, false, false, true]}>
  <Box mb={2}><Icon size="xxlarge" mr={1} iconName="desktop-mac" /> Laptop  ≥ 1024px &lt; 1280px</Box>
  <code>{`breakpoints={[false, false, false, true]}`}</code>
</Render>
<Render forBreakpoints={[false, false, false, false, true]}>
  <Box mb={2}><Icon size="xxlarge" mr={1} iconName="desktop-mac" /> Laptop (Large)  ≥ 1280px</Box>
  <code>{`breakpoints={[false, false, false, false, true]}`}</code>
</Render>
```
