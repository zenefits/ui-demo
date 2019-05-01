Displays a set of tasks for a user to complete. Shows progress of the tasks and serves as a jumping off point to dive deeper into workflows.

#### Examples

Show a single list:

```jsx noeditor
<StorybookExample selectedKind="composites|TaskList" selectedStory="single list" />
```

Show multiple grouped lists:

```jsx noeditor
<StorybookExample selectedKind="composites|TaskList" selectedStory="Multiple lists" />
```

See [more examples](http://ui.zenefits.com/app/stories/?selectedKind=composites|TaskList).

#### Usage

- Use for long, complex processes such as onboarding or company setup
- _Don't use_ for a shorter process where a single [Wizard](#!/Wizard) would suffice
- Where possible divide tasks into smaller groups
- Works well in an OverviewLayout [Example](http://ui.zenefits.com/app/stories/?selectedKind=layout|OverviewLayout&selectedStory=task%20list%20pattern)

##### Format

- Task titles in Title Case
- Keep descriptions short

#### Related

- [Wizard](#!/Wizard) A better option for shorter, less complex tasks
- [OverviewLayout](#!/OverviewLayout) Task lists are commonly placed in an OverviewLayout
