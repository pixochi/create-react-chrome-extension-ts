import ReactDOM, { Renderer } from "react-dom";

import { checkIsExtension } from "./services/environment-service";

type RootElement = Parameters<Renderer>["0"][0];
type ContainerSelector = string;

interface AppSetupConfig {
  rootElement: RootElement;
  injectExtensionTo: ContainerSelector;
  injectWebAppTo: ContainerSelector;
}

const findElementInDOM = (selector: ContainerSelector) => {
  return document.querySelector(selector);
};

const renderAppToDOM = (element: RootElement, selector: ContainerSelector) => {
  ReactDOM.render(element, document.querySelector(selector));
};

const injectExtensionToDOM = (
  element: RootElement,
  selector: ContainerSelector
) => {
  const rootElementId = "root";

  const appContainer = document.createElement("div");
  appContainer.id = rootElementId;

  const elementInDOM = findElementInDOM(selector);

  if (elementInDOM) {
    elementInDOM.append(appContainer);
    renderAppToDOM(element, `#${rootElementId}`);
  }
};

const initExtension = (element: RootElement, selector: ContainerSelector) => {
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

export { setupProject };
