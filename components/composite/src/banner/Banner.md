A component to communicate feedback to the user within the flow of a page. Stretches full width of container and will not close automatically.

For notifying about a successful user action, see [Notifications](#!/NotificationManager).

#### Examples

Banners with different states:

```jsx
// loadExample('./exampleTypes')
```

See [more examples](http://ui.zenefits.com/app/stories/?selectedKind=composites|Banner).

#### Usage

- Use to communicate system level or non-immediate feedback.
  - Ex: Notification of system maintenance.
  - Ex: Notification that an action was successful but processing may take a few seconds to complete.
- Use for content which is important enough to not disappear automatically but doesn't require user acknowledgment.
- _Do not_ use for user triggered feedback. Use a passive notification instead.
- _Do not_ use for critical messages requiring user interaction, use a modal instead.
- Icons should always be shown for success and error banners.
- Use this component sparingly.

#### Content guidelines

- Be short and succinct.
- Always use proper sentence punctuation.

#### Related

- [Notifications](#!/NotificationManager) for passive notifications
