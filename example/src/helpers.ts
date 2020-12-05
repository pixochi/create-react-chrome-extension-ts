export const getRepoOwner = () => {
  const [, repoOwner] = window.location.pathname.split("/");
  return repoOwner;
};

export const getRepoName = () => {
  const [, , repoName] = window.location.pathname.split("/");
  return repoName;
};

export const getRepoIdentifier = () => {
  return `${getRepoOwner()}/${getRepoName()}`;
};
