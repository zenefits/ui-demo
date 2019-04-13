This component is an unordered list of textual tabs that reference pages or states. NavBars display either inline (horizontally) or block (vertically).

#### Examples

```jsx
// loadExample('./exampleList')
```

See [more examples](http://ui.zenefits.com/app/stories/?selectedKind=layout|NavBar).

#### Usage

- _Do:_ Use this to load new content while this component persists from one page/state to the next.
- _Don't:_ Use this to navigate to pages/states that don't include the referent.
- _Don't:_ Include actions as menu options, eg "Run Payroll". Use a [Button](#!/Button) on the referent page instead.
- _States/Variants_ Tabs have normal, hover, selected, and unselected states.

#### Content Guidelines

Use nouns or adjectives, not verbs.

##### Format

Title Case

#### Implementation Notes

[Sketch symbol](https://sketch.cloud/s/8yRwY/all/symbols/nav-tab-list-horizontal)

#### Related

- [Link](#!/Link)
