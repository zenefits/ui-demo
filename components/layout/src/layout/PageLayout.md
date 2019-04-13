Component handling the responsive, top-level layout for generic pages.

When a more specific component exists for the type of page being built, the corresponding component should be
used instead (eg [OverviewLayout](#!/OverviewLayout)).

#### Examples

2-8-2 columns:

```jsx noeditor
<StorybookExample selectedKind="layout|PageLayout" selectedStory="fixed 2-8-2 (responsive)" />
```

8-4 columns:

```jsx noeditor
<StorybookExample selectedKind="layout|PageLayout" selectedStory="fixed 8-4 (responsive)" />
```

#### Related

- [OverviewLayout](#!/OverviewLayout)
- [ProfileLayout](#!/ProfileLayout)
