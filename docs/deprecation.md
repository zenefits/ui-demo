This is a guide to deprecating old components in z-frontend. We deprecate a component when we want to discourage its use,
either because there is a new component that replaces it or because there is a better way to accomplish the same task.

#### Rename deprecated components

Append 'Deprecated' to the component name. For example, `RenderFor` becomes `RenderForDeprecated`. Make sure to rename all the files, including the documentation (`RenderForDeprecated.md`), the stories (`RenderForDeprecated.stories.tsx`), and the tests (`RenderForDeprecated.test.tsx`).

Add the following snippet to the component class:

```jsx static
/**
 * @deprecated Please use <other component> instead
 */
```

This will indicate that it is deprecated in our docs on `ui.zenefits.com`.

#### Fix references

VSCode may ask you to automatically update some references, accept these changes. However, usually it does not catch all the references, so you will need to manually search through the code to update references. The linter should catch any you missed.

Also remember to update the documentation links (other docs may point to your now-deprecated component's docs).

#### Check

Run the tests for the deprecated component to make sure they still pass, and check the stories as a sanity check.

#### Coordinate with design

Speak with the design team to update Figma components to indicate that they are deprecated.

#### Follow up

You may want to create a ticket to follow up on to change all the deprecated references to use the new component.
