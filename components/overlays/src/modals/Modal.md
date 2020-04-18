A `Modal` is a type of dialog. Dialogs are blocking or non-blocking (also called "modal" or "non-modal"). A modal dialog appears centered, on top of the main content and moves the system into a special mode requiring user interaction. This dialog disables the main content until the user explicitly interacts with it.

We have three types of Modals:

1.  Confirmation
2.  Action
3.  Custom

```jsx noeditor
<FigmaFile height={1020} url="https://www.figma.com/file/OKdw775cxzrwQhGNm1SYM8ZD/Figma-Embed?node-id=149%3A1" />
```

#### Confirmation Modals

Confirmation modals require users to confirm a choice before the dialog is dismissed. Usually the actions are "Confirm"
and "Cancel". Use the [ConfirmationModal](/#!/ConfirmationModal) component.

#### Action Modals

Action modals require users to provide the system with information. Typically, the body includes form inputs.
Use the [ActionModal](/#!/ActionModal) component.

#### Custom Modals

Normally you won't need to use this directly. This is required only when you need a [custom footer](/app/stories/?selectedKind=overlays|Modal&selectedStory=custom%20footer) or a body with sections:

```jsx noeditor
<StorybookExample selectedKind="overlays|Modal" selectedStory="body with sections" />
```

#### Examples

Simple custom modal:

```jsx
// loadExample('./exampleBasic')
```

`Modal` can be nested within a [Form](/#!/Form) and include form inputs in its body
([example](/app/stories/?selectedKind=forms|Form&selectedStory=modal%20form)).

See [more examples](/app/stories/?selectedKind=overlays|Modal).

#### Usage

- Use Modal for short user interactions, where it's important to focus on a single interaction and maintaining context is important. Avoid flows and tables.
- Avoid anything that relies on popovers, including help text, datepickers and selects.
- When focus isn't as important, but the interaction is small, use a Popover or Tooltip.

```jsx noeditor
<FigmaFile height={1650} url="https://www.figma.com/file/OKdw775cxzrwQhGNm1SYM8ZD/Figma-Embed?node-id=1176%3A4908" />
```

#### Content Guidelines

A Modal needs a Header.
It can optionally contain a footer with Primary and Secondary actions.
The `Modal` is quite flexible, use [ActionModal](/#!/ActionModal) when you need a standard
footer and [ConfirmationModal](/#!/ConfirmationModal) when the Primary Action is `Confirm` and secondary is `Cancel`.

##### Format

Header: Title Case. See Format guidelines for [Heading](/#!/Heading)
Body: any valid content. Normally a paragraph for `ConfirmationModal`.
Footer: see Format guidelines for [Button](/#!/Button)

#### Related

- [ActionModal](/#!/ActionModal)
- [ConfirmationModal](/#!/ConfirmationModal)
- [Tooltip](/#!/Tooltip) use this when blocking other context isn't important
  and the content is informational only
- [Popover](/#!/Popover) used when blocking other context isn't important
- [DetailPanel](/#!/detailpanel) TODO
