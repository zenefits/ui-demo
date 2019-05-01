A form component that lets user select an option from a static item list

If you are not sure whether this is the correct component for your use case, please consult the
[Select guide](#!/Select%20Components).

#### Examples

Typical usage:

```jsx noeditor
<StorybookExample selectedKind="forms|Form.OpenListSelect" selectedStory="default" height="300px" />
```

Grouped inputs:

```jsx noeditor
<StorybookExample selectedKind="forms|Form.OpenListSelect" selectedStory="grouped" height="300px" />
```

Sizes:

```jsx noeditor
<StorybookExample selectedKind="forms|Form.OpenListSelect" selectedStory="sizes" height="300px" />
```

#### Usage

- This field may be used in place of a standard select input when the advantage of being able to visually parse the list of options immediately (for example if the options are highly dynamic, eg. a file explorer) outweighs the disadvanges of no autocomplete and high screen space usage.

#### Content Guidelines

See general field label and error guidelines.

#### Implementation Notes

Always import this via `Form`, as in the example.

The render function in this case will provide two components as parameters: `SelectOption` and `SelectGroup`.
These components should be used to specify options and groups respectively.

#### Related

- [Form.Select](#!/Form.Select)
