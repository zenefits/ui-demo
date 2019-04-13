Component to notify the user of a successful operation based on an action they performed.

For system-generated notifications, which appear more prominently at the top of the screen, use [Banner](#!/Banner).

#### Examples

Passive notifications appear on the bottom of the viewport and disappear on their own after a short delay.
They also include a close button to allow the user to dismiss it early should they desire.

```jsx
// loadExample('./exampleDefault')
```

Passive notifications appear one at a time. If the user takes multiple consecutive actions that each
require notifications, the most recent one replaces the older one.

If the text is too long, the message will wrap.

```jsx
// loadExample('./exampleLongMessage')
```

#### Usage

- Use sparingly. Excessive notifications can overwhelm the user.
- Always trigger based on user action.
- Never use for failed actions. Failures should display within the context of the page.
- Avoid using in situations where the user initiated a change that is immediately visible.
  - For example: changing the task status from “Closed” to “Open”.
- Avoid overlapping fixed footers, like on native mobile.

#### Content Guidelines

- Always be succinct. Messages should be no longer than 75 characters.
  - Remember: passive notifications disappear after a short delay.
  - On mobile devices, short messages are important to avoid excessive wrapping.
- Always a factual statement without opinion or morality.
  - Do: "Terminated Jane Doe."
  - Avoid: "Jane Doe has been fired. See ya!"
- Always use proper sentence punctuation.
- Should be specific (where possible).
  - Do: "Task assigned to Jane Doe."
  - Avoid: "Task assigned."
  - Do: "Task assigned to 10 people."
- Passive notifications have no interactive elements (example: Undo, Learn More).

#### Implementation Notes

Do not use the `Notification` component directly. Use `NotificationManager` instead.

`<NotificationProvider>` must be specified somewhere at the app level for this to work correctly.

#### Related

- [NotificationProvider](#!/NotificationProvider)
- [Banner](#!/Banner)
