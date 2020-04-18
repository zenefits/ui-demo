See Documentation section in [Component Best Practices](http://ui.zenefits.com/#!/Component%20Best%20Practices) for how to document a component.

### Troubleshooting

If your component is not showing up on ui.zenefits.com, here are some things to check:

1. Check that it is exported from the index.ts file
1. Check that its position in the index.ts file is not between `/** @styleguide-autodiscovery-ignore-start */` and `/** @styleguide-autodiscovery-ignore-end */`
1. In some cases (usually involving HOCs), a named export works best (see [Image example](https://github.com/zenefits/z-frontend/blob/master/components/zbase/src/web/image/Image.ts))
