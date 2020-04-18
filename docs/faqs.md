**Q: Do we have good coding practices in Zenefits React development?**
<br/>A: Yes. See our [Component Guide](#!/Component%20Best%20Practices) and [Airbnb's StyleGuide](https://github.com/airbnb/javascript)

**Q: Do we have guidelines for how to request a new platform component?**
<br/>A: You can ping the _#dev-ui-react_ channel. Please also include in your request:

1.  What functionality you need, and how it is unsupported currently
2.  Where you are planning to use it
3.  The timeline

**Q: I want add external packages to my components. Is there a review process I need to go through?**
<br/>A: While there is no formal review process, please ping the _#dev-ui-react_ channel to start a conversation.

**Q: I am getting some errors after running `yarn start` such as
"Module not found: Error: Can't resolve 'graphql'". How do I fix this?**
<br/>A: Try running `rm -rf node_modules && yarn cache clean && lerna clean --yes && lerna bootstrap` in the root directory.

**Q: How do I run z-frontend on a spoof?**
<br/>A: You can either:

- run your z-frontend locally and proxy graphql and yp to point to the spoof documented [here](https://github.com/zenefits/z-frontend/#development). See `YP_BASEURL`
- deploy your YP3 code to the spoof and use your z-frontend commit SHA to match this pattern of URL: `https:/<spoofdomanin>/app/<appname>/index.html:<SHA>`

**Q: As we have existing local code setup with yarn 0.24 and z-frontend uses yarn 1.3.2 , Can we have two versions of yarn in same machine?**
<br/>A: Having only version 1.3.2 seems to be fine for both React and Ember code.

**Q: As we are integrating React in Ember, what is the start script in package.json?**
<br/>A: For now, let’s ignore the integration and just use `yarn start` from your new app under z-frontend.

**Q: Is the secure.zenefits.com UI code base deployed in the server all from z-frontend GitHub repo ?**
<br/>A: No. That’s just one of the hosts we use for production, the other one is console.zenefits.com (for internal use). We have nginx proxies on top of both, mostly that’s Django (yourPeople3), but most paths under `/app/*` are coming from `z-frontend` (with only an exception for an old Ember App).
All the apps that you see under `z-frontend/apps` will be available from `secure.zenefits.com/app/{appname}`.

**Q: While we are setting up the z-frontend we are facing issues with lerna:<br>"Error: Command failed: yarn install --mutex network:42424 --non-interactive lerna ERR! warning z-frontend@0.1.0: The engine “lerna” appears to be invalid."<br> How do I fix this?**
<br/>A: Try running `rm -rf node_modules/lerna` then run `yarn` again. If that doesn't work try `rm -rf node_modules && yarn cache clean && lerna clean --yes && lerna bootstrap`.

**Q: Do you need to run the backend YP server locally to use graphql?**
<br/>A: Yes. You need to start uwsgi and graphql. We could also use mocks during development to be able to make progress in parallel between with the frontend and backend.
At the beginning of each project, it’s a good idea to agree on the schema for graphql so we can parallelize the work.
