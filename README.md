# Create React Chrome Extension - TS

A lightweight boilerplate for building a **Chrome extension** and a standard **web app** with React, TypeScript and Webpack **at the same time**.

## How to use the boilerplate

If you already know React, you can start coding your Chrome extension straight away with no build configuration.

Watch a short demo on YouTube: [How to Build a Chrome Extension with React and TypeScript in 3 Minutes](https://youtu.be/qIuaHkXU0zM)

### Setup options

You can change the options used in the `setupProject` function in  [src/index.tsx](https://github.com/pixochi/create-react-chrome-extension-ts/blob/main/src/index.tsx) to specify your React root component, and where the React root component will be rendered.

`rootElement` - your React root component that will be either rendered as a standard web app or injected to a web page by your Chrome extension

`injectExtensionTo` - a CSS selector for an element on a web page to which the extension will be injected to

`injectWebAppTo` - a CSS selector for an element to which the web app will be rendered if the app runs in development mode with `yarn start` or is built as a standard web app with `yarn build:web-app`

**Default options:**
```javascript
setupProject({
  rootElement: (
    <React.StrictMode>
      <App />
    </React.StrictMode>
  ),
  injectExtensionTo: "body",
  injectWebAppTo: "#root",
});
```

### Manifest files

The boilerplate contains 2 manifest files: an extension manifest for Google Chrome and a web app manifest if you want to make a PWA build.

`extension manifest` - [extension-manifest.json](https://github.com/pixochi/create-react-chrome-extension-ts/blob/main/public/extension-manifest.json)

`web app manifest` - [web-app-manifest.json](https://github.com/pixochi/create-react-chrome-extension-ts/blob/main/public/web-app-manifest.json)

The `build` folder will contain either of them depending on which build script you run - `yarn build:extension` or `yarn build:web-app`

### Background scripts

If your Chrome extension needs to use background scripts, add them to `src/background/index.ts`.

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

The build is minified and your extension is ready to be used in Developer mode or published to the Google Web Store!.

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

You can read more in the Medium article: [How to Build a Chrome Extension with React, TypeScript and Webpack: From creating a boilerplate to publishing a complete extension to Chrome Web Store](https://jakub-kozak.medium.com/how-to-build-a-chrome-extension-with-react-typescript-and-webpack-92e806ce2e16).

