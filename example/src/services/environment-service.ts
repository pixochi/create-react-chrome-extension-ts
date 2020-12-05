export const checkIsExtension = () => {
  return process.env.REACT_APP_BUILD_TARGET === "extension";
};
