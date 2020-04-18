#### Summary

The design system includes shared patterns _and_ processes. One key process is how components and patterns get
added or updated. At Zenefits, this revolves around Figma. Designers create a [proposal in Figma](https://www.figma.com/...)
using the provided template. This proposal facilitates review and discussion, and later serves as a reference for UI
engineers when updating the UI platform.

#### New designs

When existing components do not cover a new use case, the first step is to verify a new component (or components) will
be required by asking in the `#ux-design-system` slack channel. It’s possible that an existing component has options you
were not aware of.

The next step is to prepare a design system proposal (possibly collaborating with or receiving feedback from a small group of other designers or UIEs) and it to the [Figma project](https://www.figma.com/...). When that’s ready, let everyone know via `#ux-design-system` that there’s a new proposal and you’re looking for feedback. This can happen in an asynchronous way directly in Figma via comments.

#### Design Review Workshop

If the component is self-contained and there are no concerns from others, the team may opt to skip this step entirely.

During the weekly Design System Workshop, we go through the Design System Proposals project, discuss which designs are ready to be implemented and create relevant JIRA tickets if they haven't been created. The JIRA tickets should:

- Belong to UIINFRA project
- Link to Figma designs
- Add the relevant designer as a watcher

Additionally, the Design System Project should be updated to include the newly-created JIRA ticket in its name, and a symbol with the approved design should be added to the [Figma Library](https://www.figma.com/...).

#### Component engineering

JIRA tickets will be assigned to UIEs during biweekly sprint planning. During development, UIEs will @mention the designer in the PR and include screenshots and GIFs as necessary to demonstrate implementation. All component PRs should update documentation for [ui.zenefits.com](http://ui.zenefits.com) before being merged to master. Once a PR is merged, the JIRA ticket will be closed, and the new/updated component will be included in the next changelog.
