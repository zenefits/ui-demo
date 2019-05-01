The Wizard component

#### Usage

**Currently this component works only with server state (flow model)**

To use this component need to:

- pass `flowId` prop, the ID of the Flow model instance
- pass `withServerState` prop (clientside mode is not supported yet)
- provide `sectionsConfig` - configuration of sections and steps for your wizard, with titles and step components (should be of type `WizardSection[]`)
- pass `sequenceEnforced` if the wizard needs to enforce the sequence of steps completion (e.g. step 1 should be completed before moving to step 2)
- pass `transitionToOnComplete` as the final destination route after the last step is complete

Step components receive props to control the wizard (`WizardStepComponentProps`).

#### Implementation Notes

By default the main content will be 10 columns wide on desktop. When using with a form the content should be made to be 8 columns wide.

#### Examples

```jsx noeditor
<StorybookExample
  selectedKind="layout|Wizard"
  selectedStory="client side state (sequenceEnforced = false)"
  height="400px"
/>
```
