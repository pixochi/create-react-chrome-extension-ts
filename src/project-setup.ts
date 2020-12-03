import ReactDOM, { Renderer } from "react-dom";

import { checkIsExtension } from "./services/environment-service";

const APP_ROOT_ELEMENT_ID = "root";

type RootElement = Parameters<Renderer>["0"][0];
type Selector = string;

interface AppSetupConfig {
  injectExtensionTo: Selector;
  rootElement: RootElement;
}

const findElementInDOM = (selector: Selector) => {
  return document.querySelector(selector);
};

const renderAppToDOM = (element: RootElement) => {
  ReactDOM.render(element, document.getElementById(APP_ROOT_ELEMENT_ID));
};

const injectExtensionToDOM = (config: AppSetupConfig) => {
  const appContainer = document.createElement("div");
  appContainer.id = APP_ROOT_ELEMENT_ID;

  const elementInDOM = findElementInDOM(config.injectExtensionTo);

  if (elementInDOM) {
    elementInDOM.append(appContainer);
    renderAppToDOM(config.rootElement);
  }
};

const initExtension = (config: AppSetupConfig) => {
  const interval = setInterval(() => {
    // Can't inject the extension to DOM.
    if (!findElementInDOM(config.injectExtensionTo)) {
      return;
    }

    clearInterval(interval);
    injectExtensionToDOM(config);
  }, 100);
}; // check every 100ms

const setupProject = (config: AppSetupConfig) => {
  if (checkIsExtension()) {
    initExtension(config);
  } else {
    renderAppToDOM(config.rootElement);
  }
};

export default setupProject;
