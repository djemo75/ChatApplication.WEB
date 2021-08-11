export const getLocalStorageBooleanItem = (key) => {
  if (!localStorage.getItem(key)) {
    return undefined;
  }

  return JSON.parse(localStorage.getItem(key));
};
