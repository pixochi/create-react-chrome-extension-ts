# Extension built with the Create React Chrome Extension boilerplate

The extension is also published in the Google Web Store:
[GitHub PR reviewers](https://chrome.google.com/webstore/detail/github-pr-reviewers/lfhipcniiclmedbnbmkgdpoamecaheii)

## About
The extension was bootstraped with [Create React Chrome Extension](https://github.com/pixochi/create-react-chrome-extension-ts) and adds :
- local storage to keep users logged in
- [Apollo Client](https://www.apollographql.com/docs/react/) for using the [GitHub GraphQL API](https://docs.github.com/en/free-pro-team@latest/graphql)
- [Semantic UI React](https://react.semantic-ui.com/) for styling

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn build:extension`

**Builds the extension** for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and your extension is ready to be used in Developer mode or published to the Google Web Store!.\

#### Open the extension in Developer mode

1. Open the Extension Management page by navigating to [chrome://extensions](chrome://extensions).
2. Enable Developer Mode by clicking the toggle switch next to **Developer mode**.
3. Click the **LOAD UNPACKED** button and select the extension directory.

### `yarn build:web-app`

**Builds the web app** for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

## Learn More

You can learn more in the [Create React Chrome Extension documentation](https://github.com/pixochi/create-react-chrome-extension-ts).
