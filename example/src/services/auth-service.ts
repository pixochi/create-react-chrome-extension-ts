import * as LocalStorageService from "./local-storage-service";

const ACCESS_TOKEN_KEY = "pixochi_github_pr_reviewers_access_token";

export const saveAccessToken = async (accessToken: string) => {
  await LocalStorageService.saveToLocalStorage({
    [ACCESS_TOKEN_KEY]: accessToken,
  });

  return;
};

export const getAccessToken = async () => {
  const localStorageItems = await LocalStorageService.getFromLocalStorage([
    ACCESS_TOKEN_KEY,
  ]);

  return localStorageItems[ACCESS_TOKEN_KEY];
};

export const logOut = async () => {
  await LocalStorageService.removeFromLocalStorage([ACCESS_TOKEN_KEY]);

  return;
};
