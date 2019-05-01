Each component has examples demonstrating how to use them, often including various options they support.

From a component page, they can be reached by clicking on the <img src="./images/storybook-icon.png" width="24px" style="vertical-align: text-bottom" />
icon in the header. You can also browse all of them:

```jsx noeditor
<Button.Link href="http://ui.zenefits.com/app/stories" s="large" target="_blank">
  View All Examples
</Button.Link>
```

We use a tool called [Storybook](https://github.com/storybooks/storybook) to write and host our examples (each called a "story").
This has several benefits:

- Each example is "live" and interactive, not based on a screenshot.
- The various states or behaviors of a component are available.
- Code can be inspected using the bottom panel ("Story" tab).
- Each example is visually regression tested (via Chromatic).
- Examples can be embedded on this website (via `<StorybookExample />`).
- Storybook provides an isolated environment that makes interactive development and testing nice for engineers.

You can also quickly experiment with components by clicking "View Code" below and doing some edits:

```jsx
<Box>
  Here is an icon: <Icon iconName="edit" ml={2} />
</Box>
```
