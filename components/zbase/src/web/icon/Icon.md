Component to visually signify navigation or available actions. The icon alone is not interactive but is used in many interactive components
(eg [Pager](#!/Pager) or [Form.DateInput](#!/Form.DateInput)).

Zenefits currently uses the following font to display icons: [Material Design Iconic Font](http://zavoloklom.github.io/material-design-iconic-font/icons.html). All
available icons are listed there.

#### Examples

```jsx
// loadExample('./exampleDefault');
```

See [more examples](http://ui.zenefits.com/app/stories/?selectedKind=zbase|Icon).

#### Usage

- _Do not_ use Icon to build clickable buttons: use [IconButton](#!/IconButton) instead.
- _Do not_ overuse icons: excessive use can be visually overwhelming for users.
- _Do_ use icons consistently (see common cases below).

```jsx noeditor
<IconGuide />
```

#### Related

- [IconButton](#!/IconButton)
