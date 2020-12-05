import { checkIsExtension } from "./environment-service";

/**
 * Converts a relative path to a resource to a path depending on the context,
 * in which the resource is loaded.
 * @param {string} path A relative path to a resource
 * @example
 * import logo from "./logo.svg";
 *
 * function ImageComponent() {
 *   return (
 *     <img
 *       src={AssetsService.getResourceURL(logo)}
 *       alt="logo"
 *     />
 *   );
 * }
 *
 */
export const getResourceURL = (path: string) => {
  if (checkIsExtension()) {
    return window.chrome.runtime.getURL(path);
  }

  return path;
};
