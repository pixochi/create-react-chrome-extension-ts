import { checkIsExtension } from "./environment-service";

export const saveToLocalStorage = (items: Object) => {
  return new Promise<void>((resolve) => {
    // Chrome local storage has to be used when in the extension.
    if (checkIsExtension()) {
      window.chrome.storage.local.set(items, resolve);
      return;
    }

    // Standard local storage is used when outside of the extension.
    Object.entries(items).forEach(([key, value]) => {
      localStorage.setItem(key, value);
    });
    resolve();
  });
};

export const getFromLocalStorage = (keys: string[]) => {
  return new Promise<{ [key: string]: any }>((resolve) => {
    // Chrome local storage has to be used when in the extension.
    if (checkIsExtension()) {
      window.chrome.storage.local.get(keys, resolve);
      return;
    }

    // Standard local storage is used when outside of the extension.
    const keyValueItems = keys.map((key) => [key, localStorage.getItem(key)]);
    const items = Object.fromEntries(keyValueItems);
    resolve(items);
  });
};

export const removeFromLocalStorage = (keys: string[]) => {
  return new Promise<void>((resolve) => {
    // Chrome local storage has to be used when in the extension.
    if (checkIsExtension()) {
      window.chrome.storage.local.remove(keys, resolve);
      return;
    }

    // Standard local storage is used when outside of the extension.
    keys.forEach((key) => localStorage.removeItem(key));
    resolve();
  });
};
