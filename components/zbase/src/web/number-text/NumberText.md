Component for formatting numbers, currency and percentages.

#### Examples

```jsx
// loadExample('./exampleDefault')
```

#### Content Guidelines

Currency:

By default, NumberText will
match our [copy guidelines](https://confluence.inside-zen.com/pages/viewpage.action?spaceKey=PT&title=UI+Copy+Style+Guide) by showing whole dollar amounts without any trailing zeroes. Cents will only be shown when non-zero.

For tables, you may want to override this behavior to always show cents by providing `minimumFractionDigits={2}`.
