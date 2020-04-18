Component to render a form footer with a primary button (required) and optional cancel and tertiary buttons.
`Form.Footer` handles typical button states by tapping into the form context. It also handles responsive layout.

#### Examples

```jsx noeditor
<StorybookExample selectedKind="forms|Form.Footer" selectedStory="default" />
```

#### Usage

- Use in most forms.
- Often contained within a `Card.Footer` (see [Card](#!/Card)).
- Forms within a [Modal](#!/Modal) should instead use `Modal.Footer`
  ([example](http://ui.zenefits.com/app/stories/?selectedKind=forms|Form&selectedStory=modal%20form)).

#### Content Guidelines

- Button text should never be 'Submit' (too generic). Otherwise, follow [Button](#!/Button) guidelines.

#### Related

- [Form](#!/Form)
- [Button](#!/Button)
