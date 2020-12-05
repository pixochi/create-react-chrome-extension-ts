import ReactDOM, { Renderer } from "react-dom";

import { checkIsExtension } from "./services/environment-service";

type RootElement = Parameters<Renderer>["0"][0];
type Selector = string;

interface AppSetupConfig {
  rootElement: RootElement;
  injectExtensionTo: Selector;
  injectWebAppTo: Selector;
}

const findElementInDOM = (selector: Selector) => {
  return document.querySelector(selector);
};

const renderAppToDOM = (element: RootElement, selector: Selector) => {
  ReactDOM.render(element, document.querySelector(selector));
};

const injectExtensionToDOM = (element: RootElement, selector: Selector) => {
  const rootElementId = "root";

  const appContainer = document.createElement("div");
  appContainer.id = rootElementId;

  const elementInDOM = findElementInDOM(selector);

  if (elementInDOM) {
    elementInDOM.append(appContainer);
    renderAppToDOM(element, `#${rootElementId}`);
  }
};

const initExtension = (element: RootElement, selector: Selector) => {
  const interval = setInterval(() => {
    // Can't inject the extension to DOM.
    if (!findElementInDOM(selector)) {
      return;
    }

    clearInterval(interval);
    injectExtensionToDOM(element, selector);
  }, 100);
}; // check every 100ms

const setupProject = (config: AppSetupConfig) => {
  if (checkIsExtension()) {
    initExtension(config.rootElement, config.injectExtensionTo);
  } else {
    renderAppToDOM(config.rootElement, config.injectWebAppTo);
  }
};

export default setupProject;
