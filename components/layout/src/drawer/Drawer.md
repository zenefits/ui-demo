A drawer that slides from the left on top of everything and has a navigation menu in it (used with TopNavBar)

#### Usage

- the TopNavBar component uses Drawer when `useClientHamburgerContent` is set to `true` or drawer content passed in `renderHamburgerContent` prop ([see TopNavBar stories](http://ui.zenefits.com/app/stories/?selectedKind=layout|TopNavBar&selectedStory=with%20hamburger)).

#### Examples

```jsx noeditor
<StorybookExample selectedKind="layout|Drawer" selectedStory="default" height="400px" />
```

```jsx static
<Drawer title={'Dashboard'}>
  <Drawer.Section title="Section 1">
    <Drawer.Link target="_blank" href="https://google.com" active>
      Link 1 (active)
    </Drawer.Link>
    <Drawer.Link target="_blank" href="https://google.com">
      Link 2
    </Drawer.Link>
  </Drawer.Section>
  <Drawer.Section title="Section 2">
    <Drawer.NavLink to="/sdfsd1">NavLink 1</Drawer.NavLink>
    <Drawer.NavLink to="/sdfsd2">NavLink 2</Drawer.NavLink>
    <Drawer.NavLink to="/sdfsd3">NavLink 3</Drawer.NavLink>
    <Drawer.NavLink to="/sdfsd4">NavLink 4</Drawer.NavLink>
    <Drawer.NavLink to="/sdfsd5">NavLink 5</Drawer.NavLink>
    <Drawer.NavLink to="/sdfsd6">NavLink 6</Drawer.NavLink>
  </Drawer.Section>
</Drawer>
```

#### Related

- [TopNavBar](#!/TopNavBar) The top fixed menu
