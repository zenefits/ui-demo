# Frontend testing

We have lots of tools at our disposal. Each has its place.

## Typescript

Static typing helps prevent errors at compile time. You might not think of this as testing, but [Typescript](https://www.typescriptlang.org/)
is estimated to catch [about 15% of bugs](http://ttendency.cs.ucl.ac.uk/projects/type_study/documents/type_study.pdf).

## Linters

Linting also helps by preventing common typos etc. We use a variety of linters:

* [tslint](https://palantir.github.io/tslint)
* [eslint](https://eslint.org)
* [stylelint](https://github.com/stylelint/stylelint)

## Storybook

[Storybook](https://storybook.js.org) helps to document your component and also produces visual test cases.
If you have a storybook per component, and a story for each state, you can quickly scan through all the various states.
It's also helpful to include some stories that cover multiple states, eg various sizes or colors together.

Stories also automatically generate snapshots via [storyshots](https://storybook.js.org/testing/structural-testing/).

## Snapshots

Snapshots provide a serialized, diffable dump of your component ([example](https://github.com/zenefits/z-frontend/pull/389/files#diff-4f3bf4b73fe3b5251fa343024b939b49)).
They're useful to make sure unexpected changes don't happen. Unfortunately, they render everything, even sub-components,
so they tend to change frequently and be relatively brittle.

Snapshots tell you something changed, not whether something actually broke. To decide if something broke,
you usually need to actually understand the component. This is where unit tests help.

## Unit tests

Unit tests give you precise control to protect against bugs in critical parts of your component.
They are also useful to document what the intended behavior is.

### Just do it!

A quick "smoke test" that mounts your component provides enormous value for a small time investment. At the very
least, this tests that nothing throws during rendering.

```js
it('should mount without throwing an error', () => {
  const wrapper = mount(<InitialsAvatar firstName={'Ronald'} lastName={'McDonald'} />);
  expect(wrapper.find('InitialsAvatar')).toHaveLength(1);
});
```

### What to test?

You don't need to test everything: there are diminishing returns as test coverage increases. Tests need to be
maintained, after all. Keep in mind the following guidelines when deciding what to test:

1. Always test the public interface

   * What is rendered?
   * What do you do with received props?
   * What events do you care about?

1. Only test concerns of your specific component

   * Hence the _unit_ in _unit testing_. Leave other matters up to sub-components and/or the libraries in use.
   * You may want to verify you're passing the right props to sub-components.

1. Avoid duplicating the code under test

   * Leads to brittle tests that need a lot of maintenance and may fall out of sync
   * For example, testing styles often requires duplicating them (but dynamic styles are probably still worth it)

### Testing CSS

Most of the time, testing css is overkill. But when styles vary based on props, it's worth testing.
Styled-components make this somewhat difficult (the styles are not inlined) but you can use
[`toHaveStyleRule()`](https://www.styled-components.com/docs/tooling#tohavestylerule) as follows:

```js
import 'jest-styled-components';

it('should respect rebass props', () => {
  const mounted = mount(<InitialsAvatar mt={123} />);
  expect(mounted).toHaveStyleRule('margin-top', '123px');
});
```

### How to test

We use [Enzyme](https://github.com/airbnb/enzyme) for testing React components.
It provides 3 distinct APIs: `shallow`, `mount` and `render`. Some guidelines when choosing which to use:

1. Use `render` if you only care about the final HTML elements, attributes etc (note it does not support `toHaveStyleRule`)
1. Write at least one `mount` test to test the full lifecycle
1. If you want to test input, events, or styles, use `mount`

See this [overview](https://gist.github.com/richardscarrott/d89b37aff55ccc504193335198e676d1) of the different
React lifecycle methods covered by each.

More details below.

#### shallow

* Only renders until a React component is reached, but goes no deeper
* eg `shallow(<DatePicker>)` will not render whatever is in `<DayPickerInput>`
* Does not require a DOM
* Not that useful with our Rebass-based components, which are rather deep:

```html
<Textarea s="medium" rows={2}>
  <Textarea__StyledTextarea s="medium" rows={2}>
    <Styled(Styled(Base)) className="Textarea__StyledTextarea-JGGMm iMPjOm" s="medium" rows={2}>
      <Styled(Base) className="Textarea__StyledTextarea-JGGMm" s="medium" rows={2}>
        <Base className="Textarea__StyledTextarea-JGGMm" color="inherit" bg="transparent" s="medium" rows={2}>
          <textarea className="Textarea__StyledTextarea-JGGMm" s="medium" rows={2} />
        </Base>
      </Styled(Base)>
    </Styled(Styled(Base))>
  </Textarea__StyledTextarea>
</Textarea>
```

#### mount

* More like an integration test
* Renders full lifecycle with a full DOM
* Useful for testing input, events, etc
* Slower as a result (jsDOM)

```js
it('handles onChange', () => {
  const handleChange = jest.fn();
  const mounted = mount(<Textarea onChange={handleChange} />);
  mounted.find('textarea').simulate('change');
  expect(handleChange).toHaveBeenCalledTimes(1);
});
```

#### render

* Renders as static HTML
* Faster than mount
* Use jquery-like API (Cheerio) to analyze the resulting HTML

```js
it('should render standard <textarea> attributes', () => {
  const rendered = render(<Textarea autoComplete="off" />);
  expect(rendered.attr('autocomplete')).toBe('off');
});
```

## Reading

* [The right way to test react components](https://medium.freecodecamp.org/the-right-way-to-test-react-components-548a4736ab22)
* [Write tests. Not too many. Mostly integration.](https://blog.kentcdodds.com/write-tests-not-too-many-mostly-integration-5e8c7fff591c)
