export const SET_IS_ENABLED_FRIENDSHIP_NOTIFICATION =
  "setIsEnabledFriendshipNotification";

export const setIsEnabledFriendshipNotification = (payload) => {
  localStorage.setItem("isEnabledFriendshipNotification", payload);
  return (dispatch) =>
    dispatch({ type: SET_IS_ENABLED_FRIENDSHIP_NOTIFICATION, payload });
};

//-----

export const SHOW_NOTIFICATION = "showNotification";

export const showNotification = (payload) => {
  return (dispatch) => dispatch({ type: SHOW_NOTIFICATION, payload });
};
