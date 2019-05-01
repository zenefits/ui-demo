A component that embeds an html document into a page using an iframe.

#### Examples

Typical usage:

```jsx
// loadExample('./exampleDefault')
```

Loading

```jsx
// loadExample('./exampleLoading')
```

#### Usage

- Use to render external html (eg. html coming from YP3 backend) onto a page
- Do not use when html is generated on client-side, instead just use react library components to render document

#### Content Guidelines

Html will be sanitized before being written to iframe. If a particular tag is not needed but not included by default, you may extend the allowed tags and attributes by editing the allowedTags and
allowedAttributes props. If you are unsure about whether a tag is safe, please ask a UIE.

The default allowedTags and allowedAttributes are the same as the defaults used by
[html-sanitize](https://www.npmjs.com/package/sanitize-html#what-are-the-default-options)
with the following differences:

- style, h1, and h2 tags are allowed
- iframe tags are not allowed

Z-frontend typography styles will be added to all documents by default.
Additional styles may be provided directly in provided html.
